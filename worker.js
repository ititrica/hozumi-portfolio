const CACHEABLE_PATHS = ["/images/", "/assets/", "/media/"];
const R2_MEDIA_PREFIX = "/media/";

function isHostedOriginalImage(pathname) {
  return pathname.startsWith("/images/") &&
    pathname.endsWith(".webp") &&
    !/(?:[-.]thumb|[-.]card|[-.]display)\.webp$/.test(pathname);
}

async function serveMedia(request, env, pathname) {
  if (!env.MEDIA_BUCKET) {
    return new Response("R2 media binding is not configured.", { status: 500 });
  }

  const key = decodeURIComponent(pathname.slice(R2_MEDIA_PREFIX.length));
  if (!key) return new Response("Media key is required.", { status: 400 });

  const object = await env.MEDIA_BUCKET.get(key, {
    range: request.headers,
  });
  if (!object) return new Response("Media object not found.", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("Accept-Ranges", "bytes");

  const isPartial = object.range !== undefined;
  if (isPartial) {
    const offset = object.range.offset;
    const length = object.range.length ?? object.size - offset;
    headers.set("Content-Length", String(length));
    headers.set("Content-Range", `bytes ${offset}-${offset + length - 1}/${object.size}`);
  } else {
    headers.set("Content-Length", String(object.size));
  }

  return new Response(request.method === "HEAD" ? null : object.body, {
    status: isPartial ? 206 : 200,
    headers,
  });
}

function getStaticRoutePath(pathname) {
  const normalizedPath = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (normalizedPath === "/about" || normalizedPath === "/playground") {
    return `${normalizedPath}/index.html`;
  }

  if (/^\/series\/[^/]+$/.test(normalizedPath)) {
    return `${normalizedPath}/index.html`;
  }

  return null;
}

export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;

    if ((request.method === "GET" || request.method === "HEAD") && pathname.startsWith(R2_MEDIA_PREFIX)) {
      return serveMedia(request, env, pathname);
    }

    if ((request.method === "GET" || request.method === "HEAD") && isHostedOriginalImage(pathname)) {
      return new Response("Not Found", { status: 404 });
    }

    const staticRoutePath = request.method === "GET" || request.method === "HEAD"
      ? getStaticRoutePath(pathname)
      : null;

    let response;
    if (staticRoutePath) {
      const routeUrl = new URL(request.url);
      routeUrl.pathname = staticRoutePath;
      const routeResponse = await env.ASSETS.fetch(new Request(routeUrl, request));
      response = routeResponse.status === 404
        ? await env.ASSETS.fetch(request)
        : routeResponse;
    } else {
      response = await env.ASSETS.fetch(request);
    }

    if (!CACHEABLE_PATHS.some((prefix) => pathname.startsWith(prefix))) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
