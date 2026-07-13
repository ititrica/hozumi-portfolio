/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographySeries, Photo } from "./types";
import { PHOTOGRAPHY_DATA } from "./data";

export type Language = "en" | "zh" | "ja";

export const UI_TRANSLATIONS = {
  en: {
    selectedWork: "SELECTED WORK",
    biography: "BIOGRAPHY",
    playground: "PLAYGROUND",
    backToCollections: "Back to collections",
    location: "Location",
    coordinates: "Coordinates",
    timeline: "Timeline",
    medium: "Medium",
    techSpecs: "TECHNICAL SPECIFICATIONS",
    exifOriginal: "EXIF ORIGINAL",
    cameraBody: "Camera Body",
    lensOptics: "Lens Optics",
    focalAperture: "Focal / Aperture",
    shutterIso: "Shutter / ISO",
    returnToCatalogue: "Return to Catalogue",
    seriesIndex: "Series Index",
    works: "works",
    plates: "PLATES",
    viewFullSeries: "View full series",
    portraitBy: "PORTRAIT BY LÉON SIMON",
    parisStudio: "VARIOUS LOCATIONS — JULY 2025",
    bioPhilosophyTitle: "Biography & Philosophy",
    creativeBioTitle: "CREATIVE BIO & PHILOSOPHY",
    bioLead: "Hozumi is a Chinese digital visual artist & photographer, creating at the intersection of structure and void.",
    bioParagraph1: "With a background in both front-end creative development and architecture, his photographic works bridge the gap between digital precision and tactile film mediumism. He handles high-resolution Sony ILCE-7CM2 systems, framing raw structural monoliths and human profiles like mathematical planes of silence during his travels in various locations.",
    bioParagraph2: "His design language favors extreme minimalism, precise typography pairings, and structured spatial grids. This portfolio exists as a quiet, interactive digital canvas designed to let photographs breathe, warp, and tell their nocturnal or coastal stories.",
    philosophyPoints: [
      {
        title: "Architectural Gravity",
        desc: "Planes, shadows, and raw concrete hold histories. We document monuments as living forms balancing light."
      },
      {
        title: "The Silent Narrative",
        desc: "Removing noise to reveal essence. Stutter speeds and grain settings are configured to echo emotional voids."
      }
    ],
    timeZone: "BEIJING",
    footerSlogan: "Documenting architectural concrete gravity, fine art portrait geometries, and nocturnal regional street aesthetics through analog and high-resolution digital systems.",
    sections: "SECTIONS",
    resourcesConnect: "RESOURCES & CONNECT",
    copyright: "© 2026 HOZUMI. ALL RIGHTS RESERVED."
  },
  zh: {
    selectedWork: "精选作品",
    biography: "个人简介",
    playground: "操场",
    backToCollections: "返回画廊目录",
    location: "地点",
    coordinates: "经纬度",
    timeline: "时间",
    medium: "媒介",
    techSpecs: "技术参数",
    exifOriginal: "原始 EXIF",
    cameraBody: "相机机身",
    lensOptics: "镜头",
    focalAperture: "焦距/光圈",
    shutterIso: "快门/感光度",
    returnToCatalogue: "返回画廊目录",
    seriesIndex: "系列索引",
    works: "幅作品",
    plates: "图版",
    viewFullSeries: "查看完整系列",
    portraitBy: "摄影：LÉON SIMON",
    parisStudio: "各地取景 — 2025年7月",
    bioPhilosophyTitle: "简介与创作理念",
    creativeBioTitle: "艺术简历与哲学",
    bioLead: "Hozumi 是一位中国数字视觉艺术家与摄影师，致力于在“结构”与“虚无”的交界处进行创作。",
    bioParagraph1: "凭借创意前端开发与建筑学的双重背景，他的摄影作品跨越了数字精准与胶片质感介质之间的界限。他使用高分辨率的索尼 ILCE-7CM2 系统，在各地取景，将粗粝的建筑巨石与人物轮廓框定为如同数学平面般的静默空间。",
    bioParagraph2: "他的设计语言倾向于极致的极简主义、精准的排版搭配以及网格化的空间布局。这个作品集是一个安静的、交互式的数字画布，旨在让照片自由呼吸、扭转，并诉说属于它们的夜间或海岸故事。",
    philosophyPoints: [
      {
        title: "建筑重力",
        desc: "平面、阴影和粗粝的混凝土承载着历史。我们将纪念碑记录为平衡光线的生命形式。"
      },
      {
        title: "静默叙事",
        desc: "摒弃杂噪以显现本质。通过快门速度与颗粒感的配置，与内心的情感留白达成共鸣。"
      }
    ],
    timeZone: "北京时间",
    footerSlogan: "记录建筑混凝土重力、纯艺人像几何，以及通过胶片与高分辨率数字系统捕捉的地域街头美学。",
    sections: "板块",
    resourcesConnect: "资源与联系",
    copyright: "© 2026 HOZUMI. 保留所有权利。"
  },
  ja: {
    selectedWork: "作品選",
    biography: "プロフィール",
    playground: "プレイグラウンド",
    backToCollections: "カタログに戻る",
    location: "ロケーション",
    coordinates: "座標",
    timeline: "期間",
    medium: "メディア",
    techSpecs: "技術仕様",
    exifOriginal: "オリジナル EXIF",
    cameraBody: "カメラ機材",
    lensOptics: "使用レンズ",
    focalAperture: "焦点距離/絞り値",
    shutterIso: "シャッタースピード/ISO",
    returnToCatalogue: "カタログに戻る",
    seriesIndex: "シリーズ目次",
    works: "作品",
    plates: "図版",
    viewFullSeries: "シリーズを見る",
    portraitBy: "撮影：LÉON SIMON",
    parisStudio: "各地での撮影 — 2025年7月",
    bioPhilosophyTitle: "プロフィールとコンセプト",
    creativeBioTitle: "芸術経歴＆哲学",
    bioLead: "Hozumiは、中国のヴィジュアルアーティスト兼写真家であり、デジタルの精密さと構造的な空虚の境界線を探求しています。",
    bioParagraph1: "フロントエンド開発と建築学の双方のバックグラウンドを持ち、彼の写真作品はデジタルの精密さとアナログフィルムの触覚的な質感との架け橋となっています。高解像度のソニー ILCE-7CM2 システムを扱い、各地で撮影を行い、コンクリートの巨大な記念碑や人々の輪郭を、静寂の数学的な平面のように切り取ります。",
    bioParagraph2: "そのデザイン言語は、極限のミニマリズム、精密なタイポグラフィの組み合わせ、そして整然とした空間グリッドを好みます。このポートフォリオは、写真が呼吸し、変容し、その夜や海岸の物語を語るために設計された、静かでインタラクティブなデジタルのキャンバスです。",
    philosophyPoints: [
      {
        title: "建築的重力",
        desc: "平面、影、そして粗いコンクリートは歴史を保持します。私たちは光のバランスを保ちながら、生きた形としてモニュメントを記録します。"
      },
      {
        title: "静かなる叙事",
        desc: "本質を明らかにするためにノイズを取り除きます。感情の余白に響くよう、シャッタースピードや粒子感のノイズが調整されています。"
      }
    ],
    timeZone: "北京時間",
    footerSlogan: "コンクリートの建築的重力、美術的なポートレートの幾何学、そしてアナログと高解像度のデジタル系统を通じて、地域的な街路の美学を記録します。",
    sections: "セクション",
    resourcesConnect: "リソース＆連絡",
    copyright: "© 2026 HOZUMI. ALL RIGHTS RESERVED."
  }
};

interface SeriesTranslation {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  category?: string;
  images?: Record<string, {
    title?: string;
    caption?: string;
    location?: string;
  }>;
}

export const SERIES_TRANSLATIONS: Record<Exclude<Language, "en">, Record<string, SeriesTranslation>> = {
  zh: {
    "solitary-drift": {
      title: "孤独飘流",
      subtitle: "电影感肖像",
      description: "一部捕捉北海道各地宁静沉思瞬间、孤独漫步和城市几何结构的视觉随笔。",
      location: "日本北海道",
      category: "人像",
      images: {
        "sm-1": { title: "温光", caption: "路灯柔和光芒下的宁静时刻。", location: "日本札幌" },
        "sm-2": { title: "台阶之上", caption: "蓝色冬空下从楼梯上望去的景色。", location: "日本小樽" },
        "sm-3": { title: "通道", caption: "在阴影中斜靠着冰冷的混凝土墙面。", location: "日本旭川" },
        "sm-4": { title: "夜流", caption: "在模糊的城市灯光和穿梭车辆中独自前行。", location: "日本札幌" }
      }
    },
    "monochrome-studies": {
      title: "黑白习作",
      subtitle: "黑白叙事",
      description: "一组高反差黑白摄影作品，探索结构线条、人类存在以及宁静的海岸。",
      location: "日本冲绳",
      category: "黑白",
      images: {
        "ps-1": { title: "那霸前厅", caption: "混凝土酒店入口处的几何阴影。", location: "日本那霸" },
        "ps-2": { title: "街头乐手", caption: "夜间在人行道上表演的街头艺人。", location: "日本那霸" },
        "ps-3": { title: "独鸦", caption: "一只栖息在海边白色金属栏杆上的鸟。", location: "日本冲绳海岸" },
        "ps-4": { title: "海洋结构", caption: "伫立在海浪中的旧混凝土平台。", location: "日本冲绳" }
      }
    },
    "expressions": {
      title: "表情",
      subtitle: "角色研究",
      description: "一组探寻面部表情、衣物纹理和纯粹人类情感的亲密肖像系列。",
      location: "日本东京",
      category: "人像",
      images: {
        "es-1": { title: "中立", caption: "身着深色悬垂衣物的纯净棚拍肖像。", location: "日本东京" },
        "es-2": { title: "细节", caption: "双手握着金属登山扣的特写。", location: "日本东京" },
        "es-3": { title: "螺旋台阶", caption: "坐在混凝土螺旋楼梯上仰望。", location: "日本东京" },
        "es-4": { title: "真情", caption: "展现真实情感的生动特写快照。", location: "日本东京" }
      }
    },
    "urban-connection": {
      title: "城市连接",
      subtitle: "互动与肖像",
      description: "捕捉城市公共公园和街道上陪伴、笑声与反思的坦率瞬间。",
      location: "日本东京",
      category: "人像",
      images: {
        "hl-1": { title: "长椅", caption: "在被绿叶环绕的宁静城市花园中坐在一起。", location: "日本东京" },
        "hl-2": { title: "瞬间", caption: "一个温柔亲吻的坦率特写。", location: "日本东京" },
        "hl-3": { title: "仰望", caption: "双手交叉站在现代摩天大楼下的小路上。", location: "日本东京" },
        "hl-4": { title: "凝视", caption: "双手在运动中的直接近距离肖像。", location: "日本东京" }
      }
    },
    "winter-illusion": {
      title: "冬与幻影",
      subtitle: "创意人像",
      description: "对创意双重曝光肖像 and 日本北部宁静雪景的探索。",
      location: "日本北海道",
      category: "人像",
      images: {
        "ic-1": { title: "圆点墙", caption: "在红色圆点背景前的宁静肖像。", location: "日本东京" },
        "ic-2": { title: "双重视觉", caption: "展示两个视角的创意双重曝光肖像。", location: "日本东京" },
        "ic-3": { title: "冬日寂静", caption: "在白雪皑皑的田野中斜靠在光秃的树干上。", location: "日本美瑛" },
        "ic-4": { title: "烟与寒冷", caption: "雪地里手缠绷带的特写肖像。", location: "日本美瑛" },
        "ic-5": { title: "积雪", caption: "平躺在辽阔的积雪山丘上。", location: "日本旭川" }
      }
    },
    "northern-fragments": {
      title: "北方断章",
      subtitle: "北海道小记",
      description: "一组记录北海道静谧角落与瞬间邂逅的纪实摄影。从临海公路上显眼的蓝色牛奶咖啡车、海边饱经风霜的木屋，到雪夜商街中意外出现的巨型毛绒熊，以及尘土飞扬的北地赛马，展现了日本最北端岛屿特有的质朴与诗意。",
      location: "日本北海道",
      category: "街头",
      images: {
        "th-1": { title: "海滨小憩", caption: "一座伫立在海边的灰蓝色房屋，旁边停放着一辆红色微型车，北海道海岸。" },
        "th-2": { title: "饱经风霜", caption: "一座逐渐坍塌回归泥土的木制废墟，与后方现代化的住宅形成对比。" },
        "th-3": { title: "商街玩伴", caption: "小樽落雪的商街中，一只巨型毛绒熊静静坐在室外桌旁。" },
        "th-4": { title: "泥地赛道", caption: "在北方苍白温和的阳光下，马匹在泥地比赛中扬起沙尘。" }
      }
    },
    "tracks-and-tides": {
      title: "铁道与潮汐",
      subtitle: "地方铁道与海岸日记",
      description: "摄影日记的形式，追踪记录了日本地方铁道、海岸边缘与人文地标的静谧律动。从乡村小站值守的铁路员，到拍击着太平洋礁石的汹涌海浪，画面勾勒出地方省份日常交通与自然风物的怀旧气息。",
      location: "日本铫子",
      category: "街头",
      images: {
        "ep-1": { title: "外川发车", caption: "铫子电铁小站上，手持信号旗的铁路员在站房旁值守等待。" },
        "ep-2": { title: "海滩阳伞", caption: "一位打着阳伞的女性在礁石海滩上眺望，旁边有一名女孩在岩石间漫步。" },
        "ep-3": { title: "太平洋海浪", caption: "在晴空下，海浪猛烈撞击火山岩喷涌出白色浪花。" },
        "ep-4": { title: "铁马探讨", caption: "在经典橙色 DE10 柴油机车旁，工作人员正在商讨工作。" },
        "ep-5": { title: "原野暮光", caption: "壮丽的暮色天空中，粉紫晚霞延伸在太阳能电池板和民居之上。" },
        "ep-6": { title: "红砖与天空", caption: "历史悠久的红砖教堂白色钟楼直插云霄。" }
      }
    },
    "xiao-yuanhang": {
      title: "肖远航",
      subtitle: "小樽的冬日",
      description: "这是一组在小樽不同光影与场景下为模特“肖远航”拍摄的亲密肖像写生。通过粗颗粒的黑白双重曝光、霓虹街灯下的局部特写，以及质朴的自然光影，探索单一拍摄对象内敛、沉静而深邃的内心世界。",
      location: "日本小樽",
      category: "人像",
      images: {
        "in-1": { title: "雨衣与玻璃", caption: "肖远航身穿透明雨衣的高反差黑白侧面特写。" },
        "in-2": { title: "温暖霓虹", caption: "夜晚温暖的街灯照亮了霓虹灯下拍摄对象的侧面轮廓。" },
        "in-3": { title: "混凝土阴影", caption: "黄昏时分金色的阳光掠过靠在风化柱子旁的脸庞。" },
        "in-4": { title: "折射凝视", caption: "隔着带有些许反光的玻璃窗，直接凝视着镜头。" },
        "in-5": { title: "餐馆里", caption: "在当地餐馆里手持勺子时随性而专注的神情。" },
        "in-6": { title: "交叠的双手", caption: "黑色高领衫，双手交叠坐在桌前，呈现安静肃穆的黑白肖像状态。" }
      }
    },
    "okinawa-breeze": {
      title: "冲绳微风",
      subtitle: "冲绳街头纪事",
      description: "冲绳独特文化景观的街头观察。在这里，当地的海岛日常生活、游客的好奇探寻，与历史遗留的美军驻地印记交织共存。镜头捕捉下了午间休憩、孩童玩耍以及日本最南端县份特有的建筑图景。",
      location: "日本冲绳",
      category: "街头",
      images: {
        "ou-1": { title: "列车长", caption: "戴着“Yui Rail”冲绳单轨电车折纸乘务员帽子的少年，在站台旁等待时玩手机。" },
        "ou-2": { title: "游客们", caption: "拉着行李箱的游客在停放的摩托车旁抬头拍照。" },
        "ou-3": { title: "莱斯特营大门", caption: "一名守卫站在莱斯特营（Camp Lester）大门口，折射出冲绳土地的双重属性。" }
      }
    },
    "transient-states": {
      title: "流动状态",
      subtitle: "灵魂的旅途",
      description: "一份追踪年轻旅行者穿梭于截然不同环境中的视觉日志。从曼谷寺庙色彩斑斓的瓷砖墙壁、热带岛屿清澈漂浮的浅海，到静密居所中的斜射日光、手指紧握提手的手感特写，以及东京天桥夜间飞驰的汽车光轨，展现了青春与运动中那流动的生命状态。",
      location: "日本东京",
      category: "街头",
      images: {
        "vi-1": { title: "寺庙之墙", caption: "站在曼谷郑王庙（Wat Arun）精美多彩的陶瓷细节前。" },
        "vi-2": { title: "无重状态", caption: "安静地漂浮在热带海岛清澈见底的浅绿海水中。" },
        "vi-3": { title: "沉睡的引擎", caption: "东京后街霓虹灯下，一辆用雨蓬塑料布盖着的摩托车静立着。" },
        "vi-4": { title: "紧握", caption: "以城市霓虹光晕为背景，一只手攥紧包带的局部特写。" },
        "vi-5": { title: "光之流", caption: "靠在天桥栏杆上，俯瞰黑夜下长曝光的汽车尾灯光轨。" }
      }
    },
    "diptych-of-her": {
      title: "关于她的双联画",
      subtitle: "两个瞬间",
      description: "双联画的形式，捕捉了同一位身着细条纹连衣裙年轻女子的两个对比瞬间。第一幅画面展现了她在日照充足的日式木质庭院中，坐在铺着红布的木长椅上静静小憩；第二幅画面则是深夜在道路标线上，回眸面对闪光灯展现出的随性肖像。静谧传统与即兴都市之夜在此展开了有趣的对话。",
      location: "日本东京",
      category: "人像",
      images: {
        "pa-1": { title: "即兴之夜", caption: "闪光灯下，被摄对象在深夜人行横道线上蹲着的回眸生动肖像。" }
      }
    },
    "analog-hokkaido": {
      title: "模拟北海道",
      subtitle: "颗粒与纹理",
      description: "胶片摄影捕捉北海道最北端、札幌夜市中热气腾腾的拉面，以及冬日小樽静谧的雪景。",
      location: "日本北海道",
      category: "风景",
      images: {
        "ah001": { title: "札幌手工拉面", caption: "札幌一家温馨的小饭馆里，一碗热气腾腾的新鲜拉面。" },
        "ah002": { title: "小樽雪街", caption: "冬日小樽街道上飘落的细雪。" },
        "ah003": { title: "北方铁道线", caption: "延伸至北海道北部辽阔雪原的铁轨。" },
        "ah004": { title: "冬日静谧", caption: "冬日小樽，路灯柔和地照亮着高高的雪墙。" },
        "ah005": { title: "札幌深夜热气", caption: "深夜的札幌拉面店里，升腾着融融的暖气。" },
        "ah006": { title: "最北端纪念碑", caption: "设立在日本最北端宗谷岬的标志性纪念碑。" }
      }
    },
    "transient-geographies": {
      title: "流变地理",
      subtitle: "亚洲转角",
      description: "记录泰国街头的错综网络、千叶赛马场上的动态飞扬，以及台湾传统店铺门前怀旧的布质门帘。",
      location: "泰国、千叶与台湾",
      category: "街头",
      images: {
        "tg001": { title: "曼谷街头色彩", caption: "曼谷繁华市中心交织的电线与色彩斑斓的突突车。" },
        "tg002": { title: "千叶赛马场赛道", caption: "在千叶赛马场的泥地赛道上，扬起尘土与泥沙的奔马特写。" },
        "tg003": { title: "台湾暖帘纹理", caption: "台湾传统商铺门前，一幅充满怀旧气息的蓝色布质门帘。" },
        "tg004": { title: "台湾门廊细节", caption: "台湾小巷深处，斑驳陆离的墙面与挂在门框上的布帘。" }
      }
    }
  },
  ja: {
    "solitary-drift": {
      title: "孤独な漂流",
      subtitle: "シネマティック・ポートレート",
      description: "北海道各地での静かな思索の瞬間、孤独な歩み、と都市の幾何学を捉えたビジュアル・エッセイ。",
      location: "日本、北海道",
      category: "ポートレート",
      images: {
        "sm-1": { title: "温かい光", caption: "街灯の柔らかな光の下での静かな瞬間。", location: "日本、札幌" },
        "sm-2": { title: "階段の上から", caption: "青い冬空の下、階段からの眺め。", location: "日本、小樽" },
        "sm-3": { title: "通路", caption: "影の中、冷たいコンクリートの壁に寄りかかる。", location: "日本、旭川" },
        "sm-4": { title: "夜の流れ", caption: "にじむ街の光と行き交う車の中での孤独な歩み。", location: "日本、札幌" }
      }
    },
    "monochrome-studies": {
      title: "モノクローム研究",
      subtitle: "白と黒の物語",
      description: "構造的なライン、人間の存在、装置、そして静かな海岸線を探索する、コントラストの高い白黒写真シリーズ。",
      location: "日本、沖縄",
      category: "モノクロ",
      images: {
        "ps-1": { title: "那覇の前室", caption: "コンクリートホテルの入り口における幾何学的な影。", location: "日本、那覇" },
        "ps-2": { title: "ストリート・ミュージシャン", caption: "夜、歩道でパフォーマンスをするストリートミュージシャン。", location: "日本、那覇" },
        "ps-3": { title: "孤独なカラス", caption: "海辺の白い金属の手すりに止まる鳥。", location: "日本、沖縄海岸" },
        "ps-4": { title: "海の構造物", caption: "波の中に立つ古いコンクリートのプラットフォーム。", location: "日本、沖縄" }
      }
    },
    "expressions": {
      title: "表情",
      subtitle: "キャラクター研究",
      description: "表情、衣服の質感、そしてありのままの人間の感情を探求する親密なポートレート集。",
      location: "日本、東京",
      category: "ポートレート",
      images: {
        "es-1": { title: "ニュートラル", caption: "暗いドレープの衣服をまとったクリーンなスタジオ・ポートレート。", location: "日本、東京" },
        "es-2": { title: "ディテール", caption: "金属製のカラビナを握る手のクローズアップ。", location: "日本、東京" },
        "es-3": { title: "螺旋階段", caption: "コンクリートの螺旋階段に座り、上を見上げる。", location: "日本、東京" },
        "es-4": { title: "ありのままの感情", caption: "生の感情を捉えた表情豊かなクローズアップ・スナップショット。", location: "日本、東京" }
      }
    },
    "urban-connection": {
      title: "都市の繋がり",
      subtitle: "インタラクション＆ポートレート",
      description: "都市の公共公園や路上での連帯感、笑い、そして内省の率直な瞬間を捉える。",
      location: "日本、東京",
      category: "ポートレート",
      images: {
        "hl-1": { title: "ベンチ", caption: "緑の葉に囲まれた静かな都市の庭園で共に座る。", location: "日本、東京" },
        "hl-2": { title: "瞬間", caption: "交わされる遊び心のあるキスのスナップショット。", location: "日本、東京" },
        "hl-3": { title: "見上げる", caption: "現代の超高層ビルの下、腕を組んで小道に立つ。", location: "日本、東京" },
        "hl-4": { title: "まなざし", caption: "動く手が写る、直接的でクローズアップされたポートレート。", location: "日本、東京" }
      }
    },
    "winter-illusion": {
      title: "冬と幻想",
      subtitle: "クリエイティブ・ポートレート",
      description: "北日本各地でのクリエイティブな二重露光ポートレートと静かな雪景色の探求。",
      location: "日本、北海道",
      category: "ポートレート",
      images: {
        "ic-1": { title: "ドットの壁", caption: "赤いドットのパターンの前での静かなポートレート。", location: "日本、東京" },
        "ic-2": { title: "ダブル・ビジョン", caption: "2つの視点を示すクリエイティブな二重露光ポートレート。", location: "日本、東京" },
        "ic-3": { title: "冬の静寂", caption: "白い雪原の中、葉のない樹木に寄りかかる。", location: "日本、美瑛" },
        "ic-4": { title: "煙草と寒さ", caption: "雪の中、包帯を巻いた手のクローズアップ・ポートレート。", location: "日本、美瑛" },
        "ic-5": { title: "吹き溜まり", caption: "広大な雪に覆われた丘の上に横たわる。", location: "日本、旭川" }
      }
    },
    "northern-fragments": {
      title: "北の断章",
      subtitle: "北海道小記",
      description: "北海道の静かな街角や束の間の出会いを捉えたドキュメンタリー・コレクション。海を見下ろす青いカフェトラック、風化した海辺の家々から、雪の商店街に佇む巨大なクマのぬいぐるみ、そして砂塵を巻き上げる地方競馬のエネルギーまで、日本最北の島の素朴な詩情を記録する。",
      location: "日本、北海道",
      category: "ストリート",
      images: {
        "th-1": { title: "海辺の休息", caption: "北海道の海岸線、水辺に佇むグレーブルーの家とポツンと置かれた赤い軽自動車。" },
        "th-2": { title: "風化した骨組み", caption: "崩壊しつつある古い木造の小屋が、後方の現代的な住宅と対比を成しながら土に還っていく。" },
        "th-3": { title: "サンモール一番街の相棒", caption: "雪の降る小樽の商店街で、屋外のテーブルに静かに座る巨大なクマのぬいぐるみ。" },
        "th-4": { title: "ダートコース", caption: "北の淡い太陽の下、地元のレースで馬たちが砂塵を巻き上げる。" }
      }
    },
    "tracks-and-tides": {
      title: "鉄路と潮汐",
      subtitle: "ローカル線と海岸の日記",
      description: "日本のローカル鉄道、海岸線、そして地方のランドマークの静かなリズムを追った写真日記。田舎駅の孤独な駅員から、太平洋の荒波まで、地方の何気ない日常のノスタルジックな移り変わりを捉える。",
      location: "日本、銚子",
      category: "ストリート",
      images: {
        "ep-1": { title: "外川発車", caption: "銚子電鉄の静かな駅で、信号旗を持った駅員が出発を待つ。" },
        "ep-2": { title: "浜辺の日傘", caption: "日傘を差した女性が岩だらけの海岸を見つめ、近くを少女が歩く。" },
        "ep-3": { title: "太平洋のうねり", caption: "青空の下、火山岩に激しく打ち付け砕け散る波。" },
        "ep-4": { title: "鉄馬の打ち合わせ", caption: "クラシックなオレンジ色のDE10形ディーゼル機関車の横で、鉄道員たちが作業の打ち合わせをする。" },
        "ep-5": { title: "野原の夕暮れ", caption: "ソーラーパネルと民家の上に広がる、ドラマチックな紫色の夕焼け空。" },
        "ep-6": { title: "赤煉瓦と空", caption: "流れる雲に向かってそびえ立つ、歴史的な赤煉瓦教会の白い鐘楼。" }
      }
    },
    "xiao-yuanhang": {
      title: "肖遠航",
      subtitle: "小樽の冬",
      description: "小樽の様々なロケーションと光の中で捉えられた、肖遠航の親密なポートレート研究。粒子感のある白黒の二重露光、ネオンに照らされたクローズアップ、そして直接的な自然光を通じて、一人の被写体の静かな質感、強度、内省的な性格を探求する。",
      location: "日本、小樽",
      category: "ポートレート",
      images: {
        "in-1": { title: "レインコートとガラス", caption: "透明なプラスチックのジャケットを着た肖遠航の、ハイコントラストな白黒のプロフィール。" },
        "in-2": { title: "温かいネオン", caption: "街の明かりの下、被写体の横顔を照らす温かい街灯。" },
        "in-3": { title: "コンクリートの影", caption: "風化した柱の横で、被写体の顔に差し込むゴールデンアワーの光。" },
        "in-4": { title: "反射する眼差し", caption: "柔らかな反射がある窓ガラス越しに見る、肖遠航のストレートなポートレート。" },
        "in-5": { title: "食堂にて", caption: "地元の食堂でスプーンを持つ被写体の、強烈で飾らない表情。" },
        "in-6": { title: "組んだ手", caption: "被写体の静かな佇まいと組まれた手を捉えた、フォーマルな白黒ポートレート。" }
      }
    },
    "okinawa-breeze": {
      title: "沖縄の風",
      subtitle: "沖縄ストリートジャーナル",
      description: "地元の島民生活、観光客の好奇心、そして歴史的な軍の存在が共存する、沖縄のユニークな文化的景観のストリートレベルの研究。静かな休息の瞬間、若者の遊び、そしてこの南の県特有の建築をスナップで捉える。",
      location: "日本、沖縄",
      category: "ストリート",
      images: {
        "ou-1": { title: "車掌さん", caption: "ペーパーのゆいレール（沖縄モノレール）の帽子をかぶった少年が、ホームで待ちながら携帯をチェックしている。" },
        "ou-2": { title: "観光客たち", caption: "駐車されたスクーターの横の静かな通りで、スーツケースを持った観光客たちが上を見上げて写真を撮っている。" },
        "ou-3": { title: "キャンプ・レスター・ゲート", caption: "キャンプ・レスターの入り口に立つ衛兵。沖縄の土地の持つ二面性を映し出している。" }
      }
    },
    "transient-states": {
      title: "流動する状態",
      subtitle: "魂の旅",
      description: "対照的な環境を巡る若い旅人の旅路を追ったビジュアル・ジャーナル。バンコクの寺院の鮮やかなタイルの壁面やトロピカルな海の透明な漂いから、静かな家の中の影、手の感触のクローズアップ、そして夜の東京の橋の上の光跡まで、若さと動きの流動的な状態を探求する。",
      location: "日本、東京",
      category: "ストリート",
      images: {
        "vi-1": { title: "寺院の壁", caption: "バンコクのワット・アルンの華やかでカラフルな陶器の装飾の前に立つ。" },
        "vi-2": { title: "無重力", caption: "トロピカルな島の浅く澄んだエメラルドグリーンの海に穏やかに浮かぶ。" },
        "vi-3": { title: "眠るエンジン", caption: "東京の路地のネオンの下、シートに覆われて静かに佇むバイク。" },
        "vi-4": { title: "グリップ", caption: "街の光の柔らかなボケを背景に、バッグのストラップを握る手のクローズアップ。" },
        "vi-5": { title: "光の川", caption: "夜空の下、車の光跡を見下ろす橋に寄りかかる。" }
      }
    },
    "diptych-of-her": {
      title: "彼女の二連画",
      subtitle: "2つの瞬間",
      description: "ストライプのワンピースを着た若い女性の、対照的な2つの瞬間を捉えた二連画。最初のフレームは日差しの差し込む静かな日本庭園の赤いベンチに座る彼女。2番目のフレームは、夜の交差点の横断歩道上でしゃがみ込む彼女のフラッシュによるスナップ。静かな伝統と自発的な都会の夜との対話。",
      location: "日本、東京",
      category: "ポートレート",
      images: {
        "pa-1": { title: "スポンテニアスな夜", caption: "夜の交差点の横断歩道上でしゃがみ込み、こちらを振り返る彼女のフラッシュ・ポートレート。" }
      }
    },
    "analog-hokkaido": {
      title: "アナログ北海道",
      subtitle: "粒子と質感",
      description: "フィルム写真で捉えた北海道最北端、札幌の夜市で湯気を立てるラーメン、そして冬の小樽の静かな雪景色。",
      location: "日本、北海道",
      category: "風景",
      images: {
        "ah001": { title: "札幌手打ちラーメン", caption: "札幌の温かい小さな食堂で湯気を立てる一杯のラーメン。" },
        "ah002": { title: "小樽の雪道", caption: "冬の小樽の通りに舞い落ちる細雪。" },
        "ah003": { title: "北の鉄路", caption: "北海道北部の広大な雪原へと延びる線路。" },
        "ah004": { title: "冬の静寂", caption: "冬の小樽、街灯が高い雪壁を柔らかく照らす。" },
        "ah005": { title: "札幌深夜の湯気", caption: "深夜の札幌ラーメン店から立ち上る温かな湯気。" },
        "ah006": { title: "最北端の碑", caption: "日本最北端、宗谷岬に建つ象徴的な記念碑。" }
      }
    },
    "transient-geographies": {
      title: "流変する地理",
      subtitle: "アジアの街角",
      description: "タイの路上に交錯する電線の網、千葉競馬場の躍動、そして台湾の伝統的な店先に揺れるノスタルジックな布暖簾を記録する。",
      location: "タイ、千葉、台湾",
      category: "ストリート",
      images: {
        "tg001": { title: "バンコクの街の色", caption: "バンコクの繁華街に交差する電線とカラフルなトゥクトゥク。" },
        "tg002": { title: "千葉競馬場", caption: "千葉競馬場のダートコースで砂塵を巻き上げる競走馬のクローズアップ。" },
        "tg003": { title: "台湾の暖簾の質感", caption: "台湾の伝統的な商店の前に掛かるノスタルジックな青い布暖簾。" },
        "tg004": { title: "台湾の軒先", caption: "台湾の路地奥、色褪せた壁と門枠に掛かる布暖簾。" }
      }
    }
  }
};

/**
 * Returns localized photography data array based on active language.
 */
export function getLocalizedData(lang: Language): PhotographySeries[] {
  if (lang === "en") return PHOTOGRAPHY_DATA;
  const trans = SERIES_TRANSLATIONS[lang as Exclude<Language, "en">];
  return PHOTOGRAPHY_DATA.map((item) => {
    const itemTrans = trans[item.id];
    if (!itemTrans) return item;

    // Localize images array inside the series
    const localizedImages = item.images.map((img) => {
      const imgTrans = itemTrans.images?.[img.id];
      if (!imgTrans) return img;
      return {
        ...img,
        title: imgTrans.title ?? img.title,
        caption: imgTrans.caption ?? img.caption,
        location: imgTrans.location ?? img.location,
      };
    });

    return {
      ...item,
      title: itemTrans.title ?? item.title,
      subtitle: itemTrans.subtitle ?? item.subtitle,
      description: itemTrans.description ?? item.description,
      location: itemTrans.location ?? item.location,
      category: itemTrans.category ?? item.category,
      images: localizedImages,
    };
  });
}
