// ====================================================================
//  青柠起始页 - 逻辑脚本 (app.js)
//  模块顺序：CONFIG → STATE → HELPERS → ICONS → WALLPAPER
//           → TIME → HITOKOTO → WEATHER → SEARCH → ENGINE
//           → SHORTCUTS → NOTES → THEME → PANELS → CONTEXT → INIT → EVENTS
// ====================================================================
'use strict';

// ====================================================================
//  CONFIG
// ====================================================================
const STORAGE_KEY = 'qingning_startpage_v5';

// ---- Simple Icons CDN (彩色品牌SVG) ----
const SI = 'logos';   // 本地图标目录，避免 CDN 404

// ---- 搜索引擎（全部彩色图标，slug 对应 simple-icons）----
const searchEngines = {
  google:      { name: 'Google',     url: 'https://www.google.com/search?q={query}',       slug: 'google',         color: '#4285F4' },
  bing:        { name: '必应',       url: 'https://www.bing.com/search?q={query}',       slug: 'bing', color: '#00897B' },
  baidu:       { name: '百度',       url: 'https://www.baidu.com/s?wd={query}',         slug: 'baidu',         color: '#2932E1' },
  duckduckgo:  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q={query}',          slug: 'duckduckgo',    color: '#DE5833' },
  zhihu:       { name: '知乎',       url: 'https://www.zhihu.com/search?q={query}',     slug: 'zhihu',         color: '#056DE8' },
  github:      { name: 'GitHub',     url: 'https://github.com/search?q={query}',        slug: 'github',        color: '#181717' },
  brave:       { name: 'Brave',      url: 'https://search.brave.com/search?q={query}', slug: 'brave',         color: '#FB542B' },
  yahoo:       { name: 'Yahoo',      url: 'https://search.yahoo.com/search?p={query}', slug: 'yahoo',         color: '#6001D2' },
  yandex:      { name: 'Yandex',     url: 'https://yandex.com/search/?text={query}',   slug: 'yandex',        color: '#FF0000' },
  ask:         { name: 'Ask.com',    url: 'https://www.ask.com/web?q={query}',         slug: 'ask',          icon: 'logos/ask.svg', color: '#1A6CF0' },
  aol:         { name: 'AOL',        url: 'https://search.aol.com/aol/search?q={query}', slug: 'aol',         color: '#009999' },
  naver:       { name: 'Naver',      url: 'https://search.naver.com/search.naver?query={query}', slug: 'naver', color: '#03C75A' },
  ecosia:      { name: 'Ecosia',     url: 'https://www.ecosia.org/search/?q={query}',  slug: 'ecosia',        color: '#003B1E' },
};

// ---- 默认快捷方式 ----
const defaultShortcuts = [
  { name: 'GitHub',    url: 'https://github.com',           slug: 'github' },
  { name: 'YouTube',   url: 'https://youtube.com',         slug: 'youtube' },
  { name: '知乎',      url: 'https://zhihu.com',           slug: 'zhihu' },
  { name: 'B站',       url: 'https://bilibili.com',        slug: 'bilibili' },
  { name: '微博',      url: 'https://weibo.com',           slug: 'sinaweibo' },
  { name: '豆瓣',      url: 'https://douban.com',          slug: 'douban' },
  { name: '淘宝',      url: 'https://taobao.com',          slug: 'taobao' },
  { name: '百度',      url: 'https://baidu.com',           slug: 'baidu' },
  { name: 'MDN',       url: 'https://developer.mozilla.org', slug: 'mdnwebdocs' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com', slug: 'stackoverflow' },
  { name: 'Gmail',     url: 'https://mail.google.com',     slug: 'gmail' },
  { name: 'OpenAI',    url: 'https://chat.openai.com',     slug: 'openai' },
  { name: 'Notion',    url: 'https://notion.so',           slug: 'notion' },
  { name: 'Figma',     url: 'https://figma.com',           slug: 'figma' },
  { name: 'Discord',   url: 'https://discord.com',         slug: 'discord' },
  { name: 'Spotify',   url: 'https://spotify.com',         slug: 'spotify' },
  { name: 'Netflix',   url: 'https://netflix.com',         slug: 'netflix' },
  { name: 'Amazon',    url: 'https://amazon.com',          slug: 'amazon' },
  { name: 'Apple',     url: 'https://apple.com',           slug: 'apple' },
  { name: 'GitLab',    url: 'https://gitlab.com',          slug: 'gitlab' },
  { name: 'Docker',    url: 'https://docker.com',          slug: 'docker' },
  { name: 'npm',       url: 'https://npmjs.com',           slug: 'npm' },
  { name: 'Reddit',    url: 'https://reddit.com',          slug: 'reddit' },
];

// ---- 风景壁纸池（联网尝试）----
const landscapeWallpapers = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470240731273-7821a35ce239?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80&auto=format&fit=crop',
];

// ---- 内置壁纸（离线可用，SVG 渐变风景，data URI）----
//  不依赖任何网络请求，保证“永远有壁纸”
const LOCAL_WALLPAPERS = [
  // 1. 青柠晨曦
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1026"/><stop offset="0.55" stop-color="#1b2a4a"/><stop offset="1" stop-color="#3b2f63"/></linearGradient><radialGradient id="sun" cx="0.78" cy="0.32" r="0.5"><stop offset="0" stop-color="#a3e635" stop-opacity="0.55"/><stop offset="0.4" stop-color="#84cc16" stop-opacity="0.18"/><stop offset="1" stop-color="#84cc16" stop-opacity="0"/></radialGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><rect width="1920" height="1080" fill="url(#sun)"/><path d="M0 820 Q480 720 960 800 T1920 780 V1080 H0 Z" fill="#0a0f22" opacity="0.75"/><path d="M0 900 Q520 840 1040 900 T1920 880 V1080 H0 Z" fill="#060a18" opacity="0.9"/></svg>`)}`,
  // 2. 黄昏紫
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1055"/><stop offset="0.5" stop-color="#7597de"/><stop offset="1" stop-color="#f6a6c1"/></linearGradient><radialGradient id="m" cx="0.5" cy="0.4" r="0.35"><stop offset="0" stop-color="#ffd6e8" stop-opacity="0.8"/><stop offset="1" stop-color="#ffd6e8" stop-opacity="0"/></radialGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><circle cx="960" cy="430" r="120" fill="url(#m)"/><path d="M0 800 Q480 760 960 800 T1920 790 V1080 H0 Z" fill="#2a1b4d" opacity="0.7"/></svg>`)}`,
  // 3. 静谧蓝
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f2027"/><stop offset="0.5" stop-color="#203a43"/><stop offset="1" stop-color="#2c5364"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><circle cx="1500" cy="260" r="90" fill="#cfe8ff" opacity="0.7"/><path d="M0 840 Q600 780 1200 840 T1920 820 V1080 H0 Z" fill="#0b161b" opacity="0.8"/></svg>`)}`,
  // 4. 森林绿
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#134e2b"/><stop offset="0.6" stop-color="#1f7a44"/><stop offset="1" stop-color="#0b3d22"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><circle cx="500" cy="240" r="80" fill="#eafff0" opacity="0.5"/><path d="M0 780 Q480 700 960 780 T1920 760 V1080 H0 Z" fill="#07291a" opacity="0.85"/></svg>`)}`,
  // 5. 暖夜橙
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1035"/><stop offset="0.55" stop-color="#5b2a86"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><circle cx="1480" cy="300" r="70" fill="#ffd9a0" opacity="0.7"/><path d="M0 860 Q520 800 1040 860 T1920 840 V1080 H0 Z" fill="#1a0f2e" opacity="0.8"/></svg>`)}`,
  // 6. 极光青
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04111f"/><stop offset="0.6" stop-color="#0a2a3a"/><stop offset="1" stop-color="#0f3b3a"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a3e635" stop-opacity="0"/><stop offset="0.5" stop-color="#5eead4" stop-opacity="0.55"/><stop offset="1" stop-color="#a3e635" stop-opacity="0"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><path d="M0 300 Q480 140 960 300 T1920 280 V560 Q1440 420 960 560 T0 540 Z" fill="url(#a)"/><path d="M0 880 Q600 820 1200 880 T1920 860 V1080 H0 Z" fill="#04131a" opacity="0.85"/></svg>`)}`,
];

// ---- 默认状态 ----
const defaultState = {
  shortcuts: JSON.parse(JSON.stringify(defaultShortcuts)),
  notes: [],
  settings: {
    theme: 'light',
    accentColor: '#4ade80',
    showWeather: true,
    showHitokoto: true,
    dailyWallpaper: false,
  },
  currentEngine: 'baidu',
};

// ====================================================================
//  STATE
// ====================================================================
let state = loadState();
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        settings: { ...defaultState.settings, ...(parsed.settings || {}) },
        shortcuts: parsed.shortcuts || JSON.parse(JSON.stringify(defaultShortcuts)),
      };
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(defaultState));
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

// ====================================================================
//  HELPERS
// ====================================================================
function siUrl(slug) { return slug ? `${SI}/${slug}.svg` : ''; }   // 指向本地 logos/ 下文件

const slugMap = {
  'github.com':'github','youtube.com':'youtube','youtu.be':'youtube',
  'zhihu.com':'zhihu','bilibili.com':'bilibili','weibo.com':'sinaweibo',
  'douban.com':'douban','taobao.com':'taobao','baidu.com':'baidu',
  'developer.mozilla.org':'mdnwebdocs','stackoverflow.com':'stackoverflow',
  'mail.google.com':'gmail','chat.openai.com':'openai','openai.com':'openai',
  'notion.so':'notion','notion.site':'notion','figma.com':'figma',
  'discord.com':'discord','spotify.com':'spotify','netflix.com':'netflix',
  'amazon.com':'amazon','apple.com':'apple','gitlab.com':'gitlab',
  'docker.com':'docker','npmjs.com':'npm','reddit.com':'reddit',
  'google.com':'google','bing.com':'bing','duckduckgo.com':'duckduckgo',
};
function autoSlug(url) {
  const host = url.replace(/^https?:\/\//,'').split('/')[0].toLowerCase();
  return slugMap[host] || '';
}

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return h;
}

function getLocalWallpaper() {
  // 优先使用本地真实风景照（离线/联网失败时的兜底壁纸），SVG 渐变作为最末兜底
  return 'wallpaper.jpg';
}

// ====================================================================
//  GOOGLE 四色 G 图标（内嵌SVG，粗体版）
// ====================================================================
const GOOGLE_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
</svg>`;

// ====================================================================
//  WALLPAPER
// ====================================================================
function tryLoadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

async function getNetworkWallpaper() {
  // 统一用 <img> 试加载网络图（img 不受 CORS 限制，可正常显示，且不会报 CORS 错误）。

  // 策略1: Bing 每日壁纸（使用支持 CORS 的第三方接口，随机取近 8 天之一）
  try {
    const idx = Math.floor(Math.random() * 8);
    const res = await fetch('https://bing.biturl.top/?resolution=1920&format=json&index=' + idx + '&mkt=zh-CN');
    if (res.ok) {
      const data = await res.json();
      if (data && data.url) {
        const ok = await tryLoadImage(data.url);
        if (ok) return data.url;
      }
    }
  } catch (e) { console.warn('Bing壁纸获取失败', e); }

  // 策略2: 风景池随机选5张逐个尝试
  const pool = [...landscapeWallpapers].sort(() => Math.random() - 0.5).slice(0, 5);
  for (const url of pool) {
    const ok = await tryLoadImage(url);
    if (ok) return ok;
  }

  // 策略3: Picsum 随机
  const picsumUrl = 'https://picsum.photos/1920/1080?random=' + Math.floor(Math.random()*1000);
  const ok = await tryLoadImage(picsumUrl);
  if (ok) return picsumUrl;

  return null;
}

async function setWallpaper() {
  const bgImg = document.getElementById('bgImg');
  const local = getLocalWallpaper();
  // 始终使用本地壁纸，绝不依赖网络图，保证任何网络下都稳定显示、不空白、不闪烁、不叠层
  bgImg.style.opacity = '1';
  bgImg.onerror = () => { bgImg.style.opacity = '1'; };
  bgImg.src = local;
}

// ====================================================================
//  TIME
// ====================================================================
function updateTime() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2,'0');
  let greeting = '晚上好';
  if (h < 6) greeting = '凌晨好';
  else if (h < 12) greeting = '上午好';
  else if (h < 14) greeting = '中午好';
  else if (h < 18) greeting = '下午好';
  document.getElementById('greeting').textContent = greeting;
  document.getElementById('timeDisplay').textContent = `${String(h).padStart(2,'0')}:${m}`;
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('zh-CN', { year:'numeric', month:'long', day:'numeric', weekday:'long' });
}

// ====================================================================
//  HITOKOTO
// ====================================================================
const hitokotoPool = [
  { text:'人生若只如初见，何事秋风悲画扇。', source:'纳兰性德' },
  { text:'山重水复疑无路，柳暗花明又一村。', source:'陆游' },
  { text:'世界以痛吻我，要我报之以歌。', source:'泰戈尔' },
  { text:'Stay hungry, stay foolish.', source:'Steve Jobs' },
  { text:'千里之行，始于足下。', source:'老子' },
  { text:'海内存知己，天涯若比邻。', source:'王勃' },
  { text:'落霞与孤鹜齐飞，秋水共长天一色。', source:'王勃' },
  { text:'简单是终极的复杂。', source:'达·芬奇' },
  { text:'路漫漫其修远兮，吾将上下而求索。', source:'屈原' },
  { text:'明月松间照，清泉石上流。', source:'王维' },
  { text:'每一个不曾起舞的日子，都是对生命的辜负。', source:'尼采' },
  { text:'长风破浪会有时，直挂云帆济沧海。', source:'李白' },
  { text:'竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。', source:'苏轼' },
  { text:'It does not matter how slowly you go as long as you do not stop.', source:'Confucius' },
  { text:'天行健，君子以自强不息。', source:'周易' },
  { text:'不畏浮云遮望眼，自缘身在最高层。', source:'王安石' },
  { text:'会当凌绝顶，一览众山小。', source:'杜甫' },
  { text:'问渠那得清如许？为有源头活水来。', source:'朱熹' },
];
function updateHitokoto() {
  if (!state.settings.showHitokoto) { document.getElementById('hitokotoSection').style.display = 'none'; return; }
  document.getElementById('hitokotoSection').style.display = 'block';
  const item = hitokotoPool[Math.floor(Math.random() * hitokotoPool.length)];
  document.getElementById('hitokotoText').textContent = item.text;
  document.getElementById('hitokotoSource').textContent = `—— ${item.source}`;
}

// ====================================================================
//  WEATHER
// ====================================================================
const CITY_COORDS = {
  '北京':[39.9042,116.4074],'上海':[31.2304,121.4737],'广州':[23.1291,113.2644],
  '深圳':[22.5431,114.0579],'成都':[30.5728,104.0668],'杭州':[30.2741,120.1551],
  '南京':[32.0603,118.7969],'武汉':[30.5928,114.3055],'西安':[34.3416,108.9398],
  '重庆':[29.4316,106.9123],'天津':[39.3434,117.3616],'苏州':[31.2989,120.5853],
  '长沙':[28.2278,112.9388],'郑州':[34.7466,113.6254],'青岛':[36.0671,120.3826],
  '大连':[38.9140,121.6147],'宁波':[29.8683,121.5440],'厦门':[24.4798,118.0894],
  '福州':[26.0743,119.2965],'昆明':[25.0389,102.7183],'南昌':[28.6820,115.8579],
  '合肥':[31.2304,117.2830],'太原':[37.8706,112.5489],'济南':[36.6512,117.1201],
  '沈阳':[41.8057,123.4315],'长春':[43.8171,125.3235],'哈尔滨':[45.8038,126.5350],
  '贵阳':[26.6470,106.6302],'乌鲁木齐':[43.7930,87.6277],'兰州':[36.0611,103.8343],
  '海口':[20.0440,110.1999],'三亚':[18.2528,109.5120],'南宁':[22.8170,108.3665],
  '石家庄':[38.0428,114.5149],'呼和浩特':[40.8427,111.7490],'拉萨':[29.6500,91.1000],
};

const WMO_CODES = {
  0:'晴',1:'晴间多云',2:'多云',3:'阴',
  45:'雾',48:'雾凇',
  51:'小毛毛雨',53:'中毛毛雨',55:'大毛毛雨',
  61:'小雨',63:'中雨',65:'大雨',
  71:'小雪',73:'中雪',75:'大雪',
  77:'雪粒',80:'阵雨',81:'中阵雨',82:'大阵雨',
  85:'小阵雪',86:'大阵雪',
  95:'雷阵雨',96:'雷阵雨伴冰雹',99:'雷阵雨伴大冰雹',
};

// 彩色天气 SVG 图标（内嵌，不依赖CDN）
const WEATHER_SVG = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="12" cy="12" r="4" fill="#fbbf24" fill-opacity="0.2"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#94a3b8" fill-opacity="0.15"/></svg>',
  'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#60a5fa" fill-opacity="0.12"/><line x1="16" y1="13" x2="16" y2="21" stroke="#3b82f6"/><line x1="8" y1="13" x2="8" y2="21" stroke="#3b82f6"/><line x1="12" y1="15" x2="12" y2="23" stroke="#3b82f6"/></svg>',
  'cloud-snow': '<svg viewBox="0 0 24 24" fill="none" stroke="#bae6fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#bae6fd" fill-opacity="0.15"/><line x1="8" y1="16" x2="8" y2="16" stroke-width="3"/><line x1="12" y1="18" x2="12" y2="18" stroke-width="3"/><line x1="16" y1="16" x2="16" y2="16" stroke-width="3"/></svg>',
  'cloud-lightning': '<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" fill="#fbbf24" fill-opacity="0.12"/><polyline points="13 11 9 17 15 17 11 23" fill="#fbbf24" fill-opacity="0.3"/></svg>',
  'cloud-fog': '<svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M9 18h6" stroke="#cbd5e1"/><path d="M10 22h4" stroke="#cbd5e1"/><path d="M12 2v1" stroke="#cbd5e1"/><path d="M16 5l-.88.88" stroke="#cbd5e1"/><path d="M8 5l.88.88" stroke="#cbd5e1"/><path d="M3 12h1" stroke="#cbd5e1"/><path d="M20 12h1" stroke="#cbd5e1"/><path d="M5.6 5.6l.7.7" stroke="#cbd5e1"/><path d="M18.4 5.6l-.7.7" stroke="#cbd5e1"/><path d="M12 20a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4z" fill="#cbd5e1" fill-opacity="0.1"/></svg>',
};

const WEATHER_ICON_MAP = {
  '晴':'sun', '晴间多云':'cloud', '多云':'cloud', '阴':'cloud',
  '小雨':'cloud-rain', '中雨':'cloud-rain', '大雨':'cloud-rain', '阵雨':'cloud-rain',
  '小雪':'cloud-snow', '中雪':'cloud-snow', '大雪':'cloud-snow', '阵雪':'cloud-snow',
  '雷阵雨':'cloud-lightning', '雾':'cloud-fog', '雾凇':'cloud-fog',
};

let weatherCity = '成都';
let currentGlassAlpha = 0.4;
let lastWeather = null;   // 缓存完整天气数据用于详情界面

function setWeatherIcon(type) {
  const wrap = document.getElementById('weatherIconWrap');
  const iconName = WEATHER_ICON_MAP[type] || 'cloud';
  wrap.innerHTML = WEATHER_SVG[iconName] || WEATHER_SVG['cloud'];
}

async function fetchWeather() {
  if (!state.settings.showWeather) { document.getElementById('weatherWidget').style.display = 'none'; return; }
  document.getElementById('weatherWidget').style.display = 'flex';
  const textEl = document.getElementById('weatherText');
  textEl.textContent = '定位中...';

  // 尝试定位
  if (weatherCity === '成都' && !sessionStorage.getItem('w_located')) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 3500);
      const r = await fetch('https://geolocation-db.com/json/', { signal: ctrl.signal });
      clearTimeout(t);
      const d = await r.json();
      if (d && d.city) { weatherCity = d.city; sessionStorage.setItem('w_located','1'); }
    } catch(e) {}
  }

  // 获取坐标
  let coords = CITY_COORDS[weatherCity];
  if (!coords) {
    try {
      const gr = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(weatherCity)}&count=1&language=zh`);
      const gd = await gr.json();
      if (gd.results && gd.results[0]) {
        coords = [gd.results[0].latitude, gd.results[0].longitude];
      }
    } catch(e) {}
  }
  if (!coords) { coords = CITY_COORDS['成都']; weatherCity = '成都'; }

  // 尝试 Open-Meteo
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current=temperature_2m,weathercode,wind_speed_10m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.current) {
      const c = data.current;
      const code = c.weathercode || 0;
      const type = WMO_CODES[code] || '多云';
      const temp = Math.round(c.temperature_2m);
      const hum = c.relativehumidity_2m || '';
      const wind = c.wind_speed_10m || '';
      textEl.textContent = `${weatherCity} · ${type} ${temp}°${hum ? ' | 湿度'+hum+'%' : ''}`;
      setWeatherIcon(type);
      document.getElementById('weatherWidget').title = `${weatherCity} ${type} ${temp}°C${hum?' 湿度'+hum+'%':''}`;
      lastWeather = { city: weatherCity, type, temp, hum, wind, daily: data.daily || null };
      updateWeatherBadge();
      return;
    }
  } catch(e) { console.warn('Open-Meteo失败', e); }

  // 备选：和风天气
  try {
    const url = `https://wthrcdn.etouch.cn/weather_mini?city=${encodeURIComponent(weatherCity)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.data && data.data.wendu) {
      const w = data.data;
      const type = w.forecast && w.forecast[0] ? w.forecast[0].type : '多云';
      textEl.textContent = `${weatherCity} · ${type} ${w.wendu}°`;
      setWeatherIcon(type);
      document.getElementById('weatherWidget').title = `${weatherCity} ${type} ${w.wendu}°C`;
      lastWeather = { city: weatherCity, type, temp: parseInt(w.wendu)||0, hum:'', wind:'', daily:null };
      updateWeatherBadge();
      return;
    }
  } catch(e2) { console.warn('备选天气失败', e2); }

  // 兜底
  const now = new Date();
  const month = now.getMonth()+1, hour = now.getHours();
  let fb = '多云', fbTemp = 20;
  if (month>=6&&month<=8) { fb = (hour>12&&hour<18)?'晴':'多云'; fbTemp = hour>12?32:28; }
  else if (month>=3&&month<=5) { fb = '晴间多云'; fbTemp = 22; }
  else if (month>=9&&month<=11) { fb = '多云'; fbTemp = 18; }
  else { fb = '阴'; fbTemp = 5; }
  textEl.textContent = `${weatherCity} · ${fb} ≈${fbTemp}°`;
  setWeatherIcon(fb);
  document.getElementById('weatherWidget').title = `${weatherCity} ${fb} 约${fbTemp}°C（离线估算）`;
  lastWeather = { city: weatherCity, type: fb, temp: fbTemp, hum:'', wind:'', daily:null };
  updateWeatherBadge();
}

function setWeatherIconHtml(type) {  const iconName = WEATHER_ICON_MAP[type] || 'cloud';  return WEATHER_SVG[iconName] || WEATHER_SVG['cloud'] || '';}function updateWeatherBadge() {  const w = document.getElementById('weatherWidget');  if (!w) return;  w.classList.add('clickable');  w.onclick = openWeatherDetail;  w.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openWeatherDetail(); } };}function openWeatherDetail() {  if (!lastWeather) return;  const p = document.getElementById('weatherDetailPanel');  if (!p) return;  const d = lastWeather;  document.getElementById('wdCity').textContent = d.city;  document.getElementById('wdIcon').innerHTML = setWeatherIconHtml(d.type);  document.getElementById('wdTemp').textContent = d.temp + '°';  document.getElementById('wdDesc').textContent = d.type;  const meta = [];  if (d.hum) meta.push('<div class="wd-meta-item"><span>湿度</span><b>' + d.hum + '%</b></div>');  if (d.wind) meta.push('<div class="wd-meta-item"><span>风速</span><b>' + d.wind + ' km/h</b></div>');  meta.push('<div class="wd-meta-item"><span>气温</span><b>' + d.temp + '°</b></div>');  document.getElementById('wdMeta').innerHTML = meta.join('');  const fc = document.getElementById('wdForecast');  if (d.daily && d.daily.time && d.daily.time.length) {    const rows = d.daily.time.slice(0,5).map((t,i) => {      const dt = new Date(t);      const label = i===0 ? '今天' : (i===1 ? '明天' : ['周日','周一','周二','周三','周四','周五','周六'][dt.getDay()]);      const code = d.daily.weathercode[i];      const ty = WMO_CODES[code] || '多云';      return '<div class="wd-fc-item"><span>' + label + '</span><span class="wd-fc-ico">' + setWeatherIconHtml(ty) + '</span><b>' + Math.round(d.daily.temperature_2m_min[i]) + '° / ' + Math.round(d.daily.temperature_2m_max[i]) + '°</b></div>';    }).join('');    fc.innerHTML = rows;  } else { fc.innerHTML = '<div class="wd-fc-empty">暂无多日预报</div>'; }  p.classList.add('open');  document.body.classList.add('panel-open');}function closeWeatherDetail() {  const p = document.getElementById('weatherDetailPanel');  if (p) p.classList.remove('open');  document.body.classList.remove('panel-open');}document.getElementById('wdClose').onclick = closeWeatherDetail;document.getElementById('weatherDetailPanel').addEventListener('click', e => { if (e.target === e.currentTarget || e.target.classList.contains('bg-dimmer')) closeWeatherDetail(); });// ====================================================================
//  SEARCH
// ====================================================================
function performSearch(query) {
  if (!query) return;
  query = query.trim();
  const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?%&=.\w-]*$/i;
  if (urlPattern.test(query) && !query.includes(' ')) {
    let url = query;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    window.location.href = url;
    return;
  }
  if (calcMode && /^[\d\s+\-*/().]+$/.test(query)) {
    try { document.getElementById('searchInput').value = `${query} = ${eval(query.replace(/[^0-9+\-*/().]/g,''))}`; return; } catch(e) {}
  }
  const eng = searchEngines[state.currentEngine] || searchEngines.baidu;
  window.location.href = eng.url.replace('{query}', encodeURIComponent(query));
}

// 计算器模式：点击“计算”进入，再次点击或切换其它功能退出，搜索框恢复为正常搜索
let calcMode = false;
const SEARCH_PLACEHOLDER = '搜索或输入网址';
function setCalcMode(on) {
  calcMode = on;
  const inp = document.getElementById('searchInput');
  const btn = document.getElementById('calcBtn');
  if (on) {
    inp.placeholder = '输入算式，如 (12+8)*3/2（再点“计算”退出）';
    inp.focus();
    if (btn) btn.classList.add('active');
  } else {
    inp.placeholder = SEARCH_PLACEHOLDER;
    if (btn) btn.classList.remove('active');
  }
}
function toggleCalcMode() { setCalcMode(!calcMode); }
function exitCalcMode() { if (calcMode) setCalcMode(false); }

// ====================================================================
//  ENGINE DROPDOWN
// ====================================================================
function getEngineIconHtml(eng) {
  if (eng.slug === 'google') return GOOGLE_SVG.replace('width="24" height="24"','width="24" height="24"');
  const src = eng.icon || siUrl(eng.slug);
  return `<img src="${src}" alt="${eng.name}" style="width:24px;height:24px;object-fit:contain;" onerror="this.style.display='none'">`;
}

function renderEngineDropdown() {
  const dd = document.getElementById('engineDropdown');
  dd.innerHTML = Object.entries(searchEngines).map(([key, eng]) => `
    <div class="engine-item ${key===state.currentEngine?'active':''}" data-engine="${key}">
      <div class="engine-icon">${getEngineIconHtml(eng)}</div>
      <span>${eng.name}</span>
    </div>`).join('');
  dd.querySelectorAll('.engine-item').forEach(item => {
    item.onclick = () => {
      state.currentEngine = item.dataset.engine;
      saveState();
      toggleEngineDropdown(false);
      renderEngineDropdown();
      updateCurrentEngineDisplay();
    };
  });
}

function updateCurrentEngineDisplay() {
  const eng = searchEngines[state.currentEngine];
  document.getElementById('currentEngineName').textContent = eng.name;
  const wrap = document.getElementById('currentEngineIconWrap');
  wrap.innerHTML = '';
  if (eng.slug === 'google') {
    wrap.innerHTML = GOOGLE_SVG.replace('width="24" height="24"','width="20" height="20"');
  } else {
    const img = document.createElement('img');
    img.src = eng.icon || siUrl(eng.slug);
    img.alt = eng.name;
    img.style.cssText = 'width:20px;height:20px;object-fit:contain;display:inline-block;vertical-align:middle;';
    img.onerror = function(){ this.style.display='none'; };
    wrap.appendChild(img);
  }
}

function toggleEngineDropdown(force) {
  const dd = document.getElementById('engineDropdown');
  const sel = document.getElementById('engineSelector');
  const isOpen = dd.classList.contains('open');
  const next = force !== undefined ? force : !isOpen;
  dd.classList.toggle('open', next);
  sel.classList.toggle('open', next);
  // 智能判断下拉方向：默认显示在上方，空间不足则显示在下方
  if (next) {
    dd.classList.remove('below', 'above');
    const rect = sel.getBoundingClientRect();
    const ddH = dd.offsetHeight || 320;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    if (spaceBelow >= ddH + 12 || spaceBelow >= spaceAbove) {
      dd.classList.add('below');
    } else {
      dd.classList.add('above');
    }
  }
}

// ====================================================================
//  SHORTCUTS
// ====================================================================
function shortcutIconHtml(sc) {
  const slug = sc.slug || autoSlug(sc.url);
  if (!slug) {
    const initial = sc.name.charAt(0).toUpperCase();
    const colors = ['#3b82f6','#06b6d4','#8b5cf6','#ec4899','#f59e0b','#ef4444','#10b981','#6366f1'];
    const bg = colors[Math.abs(hashCode(sc.name)) % colors.length];
    return `<div style="width:30px;height:30px;border-radius:8px;background:${bg};display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:700;">${initial}</div>`;
  }
  return `<img src="${siUrl(slug)}" alt="${sc.name}" style="width:30px;height:30px;object-fit:contain;" onerror="this.outerHTML='<div style=&quot;width:30px;height:30px;border-radius:8px;background:#4ade80;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:700;&quot;>${sc.name.charAt(0).toUpperCase()}</div>'">`;
}

function renderShortcuts() {
  const grid = document.getElementById('shortcutsGrid');
  const html = state.shortcuts.map((s,i) => `
    <a class="shortcut-item" href="${s.url}" target="_blank" rel="noopener" style="animation-delay:${i*0.03}s">
      <button class="shortcut-delete" data-idx="${i}" title="删除">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="shortcut-icon">${shortcutIconHtml(s)}</div>
      <div class="shortcut-name">${s.name}</div>
    </a>`).join('') + `
    <div class="shortcut-add" id="addShortcutBtn">
      <div class="add-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
      <div class="shortcut-name">添加</div>
    </div>`;
  grid.innerHTML = html;
  grid.querySelectorAll('.shortcut-delete').forEach(btn => {
    btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); state.shortcuts.splice(parseInt(btn.dataset.idx),1); saveState(); renderShortcuts(); };
  });
  const addBtn = grid.querySelector('#addShortcutBtn');
  if (addBtn) addBtn.onclick = () => openShortcutModal();
}

function openShortcutModal(editIdx) {
  const modal = document.getElementById('shortcutModal');
  const title = document.getElementById('modalTitle');
  const nameInput = document.getElementById('shortcutName');
  const urlInput = document.getElementById('shortcutUrl');
  const iconInput = document.getElementById('shortcutIcon');
  if (editIdx !== undefined) {
    const s = state.shortcuts[editIdx];
    title.textContent = '编辑快捷方式';
    nameInput.value = s.name; urlInput.value = s.url; iconInput.value = s.slug || autoSlug(s.url) || '';
  } else {
    title.textContent = '添加快捷方式';
    nameInput.value = ''; urlInput.value = ''; iconInput.value = '';
  }
  modal.classList.add('open'); nameInput.focus();
  document.getElementById('modalConfirm').onclick = () => {
    const name = nameInput.value.trim();
    let url = urlInput.value.trim();
    const slug = iconInput.value.trim().toLowerCase();
    if (!name || !url) { nameInput.style.borderColor='rgba(255,80,80,0.5)'; urlInput.style.borderColor='rgba(255,80,80,0.5)'; return; }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    const data = { name, url, slug: slug || autoSlug(url) || '' };
    if (editIdx !== undefined) state.shortcuts[editIdx] = data; else state.shortcuts.push(data);
    saveState(); renderShortcuts(); modal.classList.remove('open');
  };
}

// ====================================================================
//  NOTES
// ====================================================================
function renderNotes() {
  const list = document.getElementById('noteList');
  list.innerHTML = state.notes.map((n,i) => `
    <div class="note-item" style="animation-delay:${i*0.05}s">
      <button class="note-delete" data-idx="${i}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
      ${n.replace(/\n/g,'<br>')}
    </div>`).join('');
  list.querySelectorAll('.note-delete').forEach(btn => {
    btn.onclick = () => { state.notes.splice(parseInt(btn.dataset.idx),1); saveState(); renderNotes(); };
  });
}

// ====================================================================
//  THEME
// ====================================================================
function applyTheme() {
  const isDark = state.settings.theme === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('darkModeToggle').classList.toggle('active', isDark);
  const icon = document.getElementById('themeIcon');
  if (isDark) {
    // 月亮 - 橙黄色
    icon.innerHTML = '<circle cx="12" cy="12" r="4" fill="#f59e0b" fill-opacity="0.2"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>';
  } else {
    // 太阳 - 金黄色
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#fbbf24" fill-opacity="0.2"/>';
  }
  // 主题变化后重算玻璃变量，避免初始用错主题导致卡片/遮罩颜色突变
  applyGlassAlpha(currentGlassAlpha);
}

function renderDefaultEngineSelect() {
  const sel = document.getElementById('defaultEngineSelect');
  if (!sel) return;
  sel.innerHTML = Object.entries(searchEngines).map(([key, eng]) => `<option value="${key}" ${key===state.currentEngine?'selected':''}>${eng.name}</option>`).join('');
}
function applyAccentColor() {
  document.documentElement.style.setProperty('--accent', state.settings.accentColor);
  const hex = state.settings.accentColor;
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  document.documentElement.style.setProperty('--accent-dark', `rgb(${Math.max(0,r-30)},${Math.max(0,g-30)},${Math.max(0,b-30)})`);
}

// ====================================================================
//  PANELS
// ====================================================================
function toggleShortcuts(force) {
  const panel = document.getElementById('shortcutsPanel');
  const next = force !== undefined ? force : !panel.classList.contains('open');
  panel.classList.toggle('open', next);
  document.body.classList.toggle('panel-open', next);
  if (next) { renderShortcuts(); panel.scrollTop = 0; }
}
function toggleNotes(force) {
  const panel = document.getElementById('notesPanel');
  const next = force !== undefined ? force : !panel.classList.contains('open');
  panel.classList.toggle('open', next);
  document.body.classList.toggle('panel-open', next);
  if (next) renderNotes();
}

function toggleAbout(force) {
  const panel = document.getElementById('aboutPanel');
  const backdrop = document.getElementById('aboutBackdrop');
  const next = force !== undefined ? force : !panel.classList.contains('open');
  panel.classList.toggle('open', next);
  backdrop.classList.toggle('open', next);
  document.body.classList.toggle('panel-open', next);
  if (next) { const d = document.getElementById('aboutDate'); if (d) d.textContent = new Date().toLocaleDateString(); }
}

// ====================================================================
//  TOOL PANEL（换算 / 二维码 / 时钟）
// ====================================================================
function applyGlassAlpha(a) {
  // a: 0~1，控制玻璃卡片通透度（液态玻璃质感）
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  // 透明度越高(滑块右)，玻璃越实(不透明度越大)；越低则越通透
  const alpha = isDark
    ? 0.12 + a * 0.55          // 暗色: 0.12 ~ 0.67
    : 0.06 + a * 0.34;         // 亮色: 0.06 ~ 0.40
  document.documentElement.style.setProperty('--card-bg', isDark ? `rgba(20,20,26,${alpha})` : `rgba(255,255,255,${alpha})`);
  const hover = Math.min(0.95, alpha + (isDark ? 0.14 : 0.1));
  document.documentElement.style.setProperty('--card-bg-hover', isDark ? `rgba(40,40,48,${hover})` : `rgba(255,255,255,${hover})`);
  // 边框随透明度变化，更通透时边框更淡
  const borderA = isDark ? (0.06 + a * 0.1) : (0.08 + a * 0.16);
  document.documentElement.style.setProperty('--card-border', isDark ? `rgba(255,255,255,${borderA})` : `rgba(255,255,255,${borderA})`);
  // 背景遮罩随透明度：通透时露出更多壁纸
  const ov = isDark ? (0.5 - a * 0.34) : (0.34 - a * 0.22);
  document.documentElement.style.setProperty('--bg-overlay-a', ov.toFixed(3));
  // 同步滑动条视觉进度
  const slider = document.getElementById('glassSlider');
  if (slider) slider.style.setProperty('--glass-progress', (a * 100) + '%');
}
const glassSlider = document.getElementById('glassSlider');
glassSlider.addEventListener('input', () => {
  const a = glassSlider.value / 100;
  document.getElementById('glassVal').textContent = glassSlider.value + '%';
  applyGlassAlpha(a);
  try { localStorage.setItem('glassAlpha', glassSlider.value); } catch (e) {}
});
// 初始化保存的透明度
(function initGlass() {
  let saved = 40;
  try { saved = parseInt(localStorage.getItem('glassAlpha')) || 40; } catch (e) {}
  glassSlider.value = saved;
  document.getElementById('glassVal').textContent = saved + '%';
  applyGlassAlpha(saved / 100);
})();

function toggleSettings(force) {
  const overlay = document.getElementById('settingsOverlay');
  const next = force !== undefined ? force : !overlay.classList.contains('open');
  overlay.classList.toggle('open', next);
  document.body.classList.toggle('panel-open', next);
}

// ====================================================================
//  CONTEXT MENU
// ====================================================================
function showContextMenu(x,y) {
  const menu = document.getElementById('contextMenu');
  menu.style.left = Math.min(x, window.innerWidth-200)+'px';
  menu.style.top = Math.min(y, window.innerHeight-150)+'px';
  menu.classList.add('open');
}
function hideContextMenu() { document.getElementById('contextMenu').classList.remove('open'); }

// ====================================================================
//  INIT
// ====================================================================
function init() {
  applyTheme();
  applyAccentColor();
  setWallpaper();
  updateTime();
  updateHitokoto();
  fetchWeather();
  renderEngineDropdown();
  updateCurrentEngineDisplay();
  renderDefaultEngineSelect();

  setTimeout(() => { document.getElementById('topBar').classList.add('visible'); }, 800);
  setInterval(updateTime, 30000);
  setInterval(fetchWeather, 1800000);

  document.getElementById('weatherToggle').classList.toggle('active', state.settings.showWeather);
  document.getElementById('hitokotoToggle').classList.toggle('active', state.settings.showHitokoto);
  document.getElementById('dailyWallpaperToggle').classList.toggle('active', state.settings.dailyWallpaper);

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === state.settings.accentColor);
    dot.onclick = () => {
      state.settings.accentColor = dot.dataset.color;
      saveState(); applyAccentColor();
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    };
  });
}

// ====================================================================
//  EVENTS
// ====================================================================
document.addEventListener('DOMContentLoaded', init);

document.getElementById('searchInput').addEventListener('keydown', e => { if(e.key==='Enter') performSearch(e.target.value); });

document.querySelectorAll('.quick-action-btn').forEach(btn => {
  btn.onclick = () => {
    const a = btn.dataset.action, inp = document.getElementById('searchInput');
    if (a==='translate') { exitCalcMode(); const t = inp.value || prompt('翻译内容：'); if(t) window.open(`https://translate.google.com/?text=${encodeURIComponent(t)}`,'_blank'); }
    else if (a==='calc') { toggleCalcMode(); }
    else if (a==='sites') { exitCalcMode(); toggleShortcuts(true); }
  };
});

document.getElementById('engineSelector').addEventListener('click', e => { e.stopPropagation(); toggleEngineDropdown(); });

document.getElementById('themeBtn').onclick = () => { state.settings.theme = state.settings.theme==='dark'?'light':'dark'; saveState(); applyTheme(); };
document.getElementById('notesBtn').onclick = () => toggleNotes();
document.getElementById('closeNotes').onclick = () => toggleNotes(false);
document.getElementById('aboutBtn').onclick = () => toggleAbout();
document.getElementById('aboutCloseBtn').onclick = () => toggleAbout(false);
document.getElementById('aboutBackdrop').onclick = () => toggleAbout(false);
document.getElementById('aboutResetBtn').onclick = () => { if(confirm('确定重置所有数据？')){ localStorage.removeItem('startpage_state'); location.reload(); } };
document.getElementById('noteAddBtn').onclick = () => { const v=document.getElementById('noteInput').value.trim(); if(v){state.notes.unshift(v);document.getElementById('noteInput').value='';saveState();renderNotes();} };

document.getElementById('settingsBtn').onclick = () => toggleSettings(true);
document.getElementById('closeSettings').onclick = () => toggleSettings(false);

document.getElementById('darkModeToggle').onclick = function(){ this.classList.toggle('active'); state.settings.theme=this.classList.contains('active')?'dark':'light'; saveState(); applyTheme(); };
document.getElementById('weatherToggle').onclick = function(){ this.classList.toggle('active'); state.settings.showWeather=this.classList.contains('active'); saveState(); if(state.settings.showWeather) fetchWeather(); else document.getElementById('weatherWidget').style.display='none'; };
document.getElementById('hitokotoToggle').onclick = function(){ this.classList.toggle('active'); state.settings.showHitokoto=this.classList.contains('active'); saveState(); updateHitokoto(); };
document.getElementById('dailyWallpaperToggle').onclick = async function(){ this.classList.toggle('active'); state.settings.dailyWallpaper=this.classList.contains('active'); saveState(); setWallpaper(); };
document.getElementById('defaultEngineSelect').onchange = function(){ state.currentEngine = this.value; saveState(); renderEngineDropdown(); updateCurrentEngineDisplay(); };

document.getElementById('exportBtn').onclick = () => { const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download='startpage-config.json'; a.click(); URL.revokeObjectURL(u); };
document.getElementById('importBtn').onclick = () => document.getElementById('importFile').click();
document.getElementById('importFile').addEventListener('change', e => {
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ev => { try { const d=JSON.parse(ev.target.result); state={...defaultState,...d,settings:{...defaultState.settings,...(d.settings||{})},shortcuts:d.shortcuts||JSON.parse(JSON.stringify(defaultShortcuts))}; saveState(); location.reload(); } catch(err){ alert('配置文件格式错误'); } };
  r.readAsText(f);
});
document.getElementById('clearDataBtn').onclick = () => { if(confirm('确定清空所有数据？不可恢复。')){ localStorage.removeItem(STORAGE_KEY); location.reload(); } };

document.getElementById('closeShortcuts').onclick = () => toggleShortcuts(false);

// 工具浮层事件
document.getElementById('modalCancel').onclick = () => document.getElementById('shortcutModal').classList.remove('open');

document.getElementById('shortcutsPanel').addEventListener('click', e => { if(e.target===e.currentTarget||e.target.classList.contains('bg-dimmer')) toggleShortcuts(false); });
document.getElementById('settingsOverlay').addEventListener('click', e => { if(e.target===e.currentTarget) toggleSettings(false); });
document.getElementById('shortcutModal').addEventListener('click', e => { if(e.target===e.currentTarget) e.currentTarget.classList.remove('open'); });

document.addEventListener('contextmenu', e => { e.preventDefault(); showContextMenu(e.clientX,e.clientY); });
document.addEventListener('click', e => {
  if(!e.target.closest('.context-menu')) hideContextMenu();
  if(!e.target.closest('.search-engine-selector')&&!e.target.closest('.engine-dropdown')) toggleEngineDropdown(false);
});

document.getElementById('ctxShortcuts').onclick = () => { hideContextMenu(); toggleShortcuts(true); };
document.getElementById('ctxNotes').onclick = () => { hideContextMenu(); toggleNotes(true); };
document.getElementById('ctxSettings').onclick = () => { hideContextMenu(); toggleSettings(true); };

document.addEventListener('keydown', e => {
  if(e.key==='Escape'){ exitCalcMode(); toggleShortcuts(false); toggleNotes(false); toggleSettings(false); hideContextMenu(); document.getElementById('shortcutModal').classList.remove('open'); }
  if(e.key==='/'&&!e.target.matches('input,textarea')){ e.preventDefault(); document.getElementById('searchInput').focus(); }
});

document.getElementById('timeDisplay').onclick = () => toggleShortcuts(true);
document.getElementById('greeting').onclick = () => toggleShortcuts(true);
document.getElementById('mainContent').addEventListener('dblclick', () => toggleShortcuts(true));
