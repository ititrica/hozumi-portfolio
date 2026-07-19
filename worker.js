const CACHEABLE_PATHS = ["/images/", "/assets/"];

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
