const STORAGE_KEYS = {
  annotations: "drug-board-annotations",
  publishSelectedIds: "drug-board-publish-selected-ids",
  archivedIds: "drug-board-archived-ids",
  customSources: "drug-board-custom-sources"
};

const rankingRules = [
  { key: "sourceTrust", label: "Source trust", weight: 0.28 },
  { key: "drugDiscoveryRelevance", label: "Drug discovery relevance", weight: 0.24 },
  { key: "clinicalImpact", label: "Clinical or platform impact", weight: 0.2 },
  { key: "novelty", label: "Novelty", weight: 0.16 },
  { key: "freshness", label: "Freshness", weight: 0.12 }
];

const termDictionary = {
  ai: {
    ipa: "/ˌeɪˈaɪ/",
    pronunciation: "ay-eye",
    simple: "Artificial intelligence, meaning computer systems that can assist with pattern finding, prediction, or decision support.",
    simpleZh: "人工智能，指可以帮助进行模式识别、预测或决策支持的计算机系统。"
  },
  "glp-1": {
    ipa: "/ˌdʒiː ˌel ˈpiː wʌn/",
    pronunciation: "jee el pee one",
    simple: "A hormone pathway involved in blood sugar control and appetite, often targeted in obesity and diabetes drugs.",
    simpleZh: "一种与血糖控制和食欲调节相关的激素通路，常被用于肥胖和糖尿病药物开发。"
  },
  "small-molecule": {
    ipa: "/ˌsmɔːl ˈmɒlɪkjuːl/",
    pronunciation: "small MOL-uh-kyool",
    simple: "A low-molecular-weight drug type that can usually enter cells more easily than large biologic therapies.",
    simpleZh: "一种低分子量药物类型，通常比大型生物药更容易进入细胞。"
  },
  crispr: {
    ipa: "/ˈkrɪspər/",
    pronunciation: "KRIS-per",
    simple: "A gene-editing technology that can cut or modify DNA with high precision.",
    simpleZh: "一种可以高精度切割或修改 DNA 的基因编辑技术。"
  },
  delivery: {
    ipa: "/dɪˈlɪvəri/",
    pronunciation: "dih-LIV-uh-ree",
    simple: "The method used to get a therapy or genetic tool into the right cells or tissues.",
    simpleZh: "指把治疗药物或基因工具送达到正确细胞或组织中的方法。"
  },
  "precision oncology": {
    ipa: "/prɪˈsɪʒən ɒnˈkɒlədʒi/",
    pronunciation: "prih-SIZH-uhn on-KOL-uh-jee",
    simple: "A cancer treatment approach that matches therapies to specific mutations, biomarkers, or tumor features.",
    simpleZh: "一种根据特定突变、生物标志物或肿瘤特征来匹配治疗方案的癌症治疗方法。"
  },
  kras: {
    ipa: "/keɪ ræs/",
    pronunciation: "kay-rass",
    simple: "A cancer-related gene that has long been difficult to drug and remains an important oncology target.",
    simpleZh: "一个与癌症相关的基因，长期以来较难成药，但仍然是重要的肿瘤学靶点。"
  },
  approval: {
    ipa: "/əˈpruːvəl/",
    pronunciation: "uh-PROO-vuhl",
    simple: "Official regulatory permission for a therapy to be marketed for a defined medical use.",
    simpleZh: "指某种疗法获得监管机构正式许可，可用于特定医疗用途并上市。"
  },
  "regulatory workflows": {
    ipa: "/ˈreɡjələˌtɔːri ˈwɜːrkfloʊz/",
    pronunciation: "REG-yuh-luh-tor-ee WURK-flohz",
    simple: "The formal review and operational steps used by agencies when assessing drugs or related submissions.",
    simpleZh: "指监管机构在评估药物或相关申报材料时所采用的正式审查和操作流程。"
  },
  antipsychotic: {
    ipa: "/ˌæn.ti.saɪˈkɒt.ɪk/",
    pronunciation: "an-tee-sy-KOT-ik",
    simple: "A medicine used to treat symptoms such as delusions, hallucinations, or severe disturbance in thought and behavior.",
    simpleZh: "一种用于治疗妄想、幻觉或严重思维与行为障碍等症状的药物。"
  },
  dementia: {
    ipa: "/dɪˈmen.ʃə/",
    pronunciation: "dih-MEN-shuh",
    simple: "A condition that affects memory, thinking, and everyday functioning, usually becoming worse over time.",
    simpleZh: "一种影响记忆、思维和日常功能的疾病状态，通常会随着时间逐渐加重。"
  },
  aggregators: {
    ipa: "/ˈæɡrɪˌɡeɪtərz/",
    pronunciation: "AG-rih-gay-terz",
    simple: "Services or platforms that collect information from many sources into one place.",
    simpleZh: "指把多个来源的信息汇集到一个地方的服务或平台。"
  },
  item: {
    ipa: "/ˈaɪtəm/",
    pronunciation: "EYE-tuhm",
    simple: "A single piece of information or one distinct entry in a list or collection.",
    simpleZh: "指一条单独的信息，或列表、集合中的一个独立条目。"
  },
  expectations: {
    ipa: "/ˌek.spekˈteɪ.ʃənz/",
    pronunciation: "ek-spek-TAY-shunz",
    simple: "Ideas or beliefs about what is likely to happen or what should happen.",
    simpleZh: "指人们对于将会发生什么、或者应该发生什么所持有的想法或预期。"
  },
  drug: {
    ipa: "/drʌɡ/",
    pronunciation: "drug",
    simple: "A substance used to treat an illness, relieve a symptom, or modify a chemical process in the body for a specific purpose.",
    simpleZh: "指用于治疗疾病、缓解症状，或为了特定目的而改变人体化学过程的物质。"
  },
  board: {
    ipa: "/bɔːrd/",
    pronunciation: "board",
    simple: "A relatively long, wide and thin piece of any material, usually wood or similar, often for use in construction or furniture-making.",
    simpleZh: "指一种较长、较宽且较薄的材料片，通常是木板或类似材料，常用于建筑或家具制作。"
  },
  suppress: {
    ipa: "/səˈpres/",
    pronunciation: "suh-PRESS",
    simple: "To put an end to, especially with force, to crush, do away with; to prohibit, subdue.",
    simpleZh: "指压制、抑制或制止某事，尤其是通过强力阻止、消除或禁止。"
  },
  obesity: {
    ipa: "/oʊˈbiːsəti/",
    pronunciation: "oh-BEE-suh-tee",
    simple: "The state of being obese due to an excess of body fat.",
    simpleZh: "指由于体脂过多而处于肥胖状态。"
  }
};

const chineseDefinitionFallbacks = {
  "The act or state of expecting or looking forward to an event as about to happen.": "指对某件即将发生的事情抱有期待、预想或心理预期的状态。",
  "Ability to produce a desired effect under ideal testing conditions.": "指在理想测试条件下产生预期效果的能力，常用来描述药物或治疗方案的疗效。",
  "A strong desire; yearning.": "指一种强烈的想要得到某物或实现某事的欲望。",
  "Someone or something which aggregates": "指把多个来源的信息、内容或数据汇集到一起的人、服务或平台。",
  "A distinct physical object.": "指一个单独而明确的对象；在信息语境中也可指一个独立条目。",
  "To put an end to, especially with force, to crush, do away with; to prohibit, subdue.": "指压制、抑制或制止某事，尤其是通过强力阻止、消除或禁止。",
  "The state of being obese due to an excess of body fat.": "指由于体脂过多而处于肥胖状态。",
  "A substance used to treat an illness, relieve a symptom, or modify a chemical process in the body for a specific purpose.": "指用于治疗疾病、缓解症状，或为了特定目的而改变人体化学过程的物质。",
  "A relatively long, wide and thin piece of any material, usually wood or similar, often for use in construction or furniture-making.": "指一种较长、较宽且较薄的材料片，通常是木板或类似材料，常用于建筑或家具制作。"
};

const termCache = new Map();

const defaultSources = [
  { id: "fda", name: "FDA Newsroom", type: "Regulator", trustScore: 10, url: "https://www.fda.gov/news-events/fda-newsroom", notes: "Best for approvals, regulatory actions, safety updates, and official product milestones." },
  { id: "nih", name: "NIH News Releases", type: "Research", trustScore: 9, url: "https://www.nih.gov/news-events/news-releases", notes: "Strong upstream signal for translational science, funded breakthroughs, and trial readouts." },
  { id: "clinicaltrials", name: "ClinicalTrials.gov", type: "Clinical trials", trustScore: 9, url: "https://clinicaltrials.gov/", notes: "Primary source for trial status changes, endpoints, and study design details." },
  { id: "pubmed", name: "PubMed", type: "Journals", trustScore: 8, url: "https://pubmed.ncbi.nlm.nih.gov/", notes: "Primary literature layer for discovery papers and preclinical or clinical publications." },
  { id: "nature-biotech", name: "Nature Biotechnology", type: "Journals", trustScore: 8, url: "https://www.nature.com/nbt/", notes: "High-value journal source for platform innovation, modalities, and translational work." },
  { id: "nature-medicine", name: "Nature Medicine", type: "Journals", trustScore: 8, url: "https://www.nature.com/nm/", notes: "Useful for translational and clinical medicine developments with strong scientific signal." },
  { id: "nejm", name: "NEJM", type: "Journals", trustScore: 8, url: "https://www.nejm.org/", notes: "Strong source for clinical practice-changing studies and trial publications." },
  { id: "ema", name: "EMA News", type: "Regulator", trustScore: 9, url: "https://www.ema.europa.eu/en/news", notes: "European regulatory updates, approvals, safety reviews, and committee decisions." },
  { id: "nci", name: "NCI News & Events", type: "Research", trustScore: 9, url: "https://www.cancer.gov/news-events", notes: "National Cancer Institute updates with a strong signal for cancer research, clinical developments, and official press releases." },
  { id: "stat", name: "STAT Biotech", type: "Industry media", trustScore: 7, url: "https://www.statnews.com/topic/biotech/", notes: "Useful for context on biotech strategy, financing, leadership, and sector reactions." },
  { id: "astrazeneca", name: "AstraZeneca Press Releases", type: "Company", trustScore: 7, url: "https://www.astrazeneca.com/media-centre/press-releases.html", notes: "Company press releases covering approvals, trial results, pipeline milestones, and corporate updates." },
  { id: "roche", name: "Roche Media Releases", type: "Company", trustScore: 7, url: "https://www.roche.com/media/releases", notes: "Company media releases covering approvals, trial results, pipeline milestones, and corporate updates." },
  { id: "fierce-biotech", name: "Fierce Biotech", type: "Industry media", trustScore: 7, url: "https://www.fiercebiotech.com/", notes: "Sector news for pipelines, partnerships, trial outcomes, and company updates." },
  { id: "biopharma-dive", name: "BioPharma Dive", type: "Industry media", trustScore: 7, url: "https://www.biopharmadive.com/", notes: "Industry reporting with useful summaries of biotech and pharma developments." },
  { id: "drugs", name: "Drugs.com News Feeds", type: "Aggregator", trustScore: 6, url: "https://www.drugs.com/rss.html", notes: "Convenient aggregation layer for approvals, applications, alerts, and trial result headlines." }
];

const fallbackNews = [
  {
    id: "story-001",
    sourceId: "fda",
    date: "2026-05-06",
    headline: "FDA expands AI capabilities and completes a data platform consolidation that could speed regulatory workflows.",
    summary: "An official FDA update signaled more AI-assisted internal operations, making it a notable marker for how review infrastructure may evolve around drug oversight.",
    headlineZh: "FDA 扩展 AI 能力并完成数据平台整合，可能加快监管流程。",
    summaryZh: "美国 FDA 的一项官方更新显示，其内部正在扩大 AI 辅助能力，这说明未来药品审评基础设施可能会加快演进。",
    url: "https://www.fda.gov/news-events/fda-newsroom/press-announcements",
    tags: ["AI", "Regulation", "Platform"],
    signals: { drugDiscoveryRelevance: 8, clinicalImpact: 7, novelty: 7, freshness: 10 }
  },
  {
    id: "story-002",
    sourceId: "nih",
    date: "2026-05-06",
    headline: "NIH-backed work suggests oral small-molecule GLP-1 drugs may suppress cravings through deeper brain penetration.",
    summary: "This is the kind of mechanistic finding that can influence next-generation obesity pipeline design because it points to a differentiated biology story beyond weight loss efficacy alone.",
    headlineZh: "NIH 支持的研究提示，口服小分子 GLP-1 药物可能通过更深入的大脑穿透来抑制食欲。",
    summaryZh: "这类机制性发现可能影响下一代肥胖药物管线设计，因为它暗示了除减重效果之外更具差异化的生物学逻辑。",
    url: "https://www.nih.gov/news-events/news-releases",
    tags: ["Metabolic disease", "Small molecule", "Mechanism"],
    signals: { drugDiscoveryRelevance: 9, clinicalImpact: 8, novelty: 8, freshness: 10 }
  },
  {
    id: "story-003",
    sourceId: "fda",
    date: "2026-04-30",
    headline: "FDA approved the first non-antipsychotic drug for agitation associated with dementia, marking a meaningful CNS milestone.",
    summary: "A first-in-class or first-in-category approval deserves a high board position because it resets competitive expectations and validates a development path others may follow.",
    headlineZh: "FDA 批准首个用于痴呆相关激越的非抗精神病药物，成为中枢神经领域的重要里程碑。",
    summaryZh: "首创或首类批准值得高位展示，因为它会重设竞争预期，并验证其他公司可能跟进的开发路径。",
    url: "https://www.fda.gov/news-events/fda-newsroom",
    tags: ["CNS", "Approval", "Commercial"],
    signals: { drugDiscoveryRelevance: 10, clinicalImpact: 10, novelty: 8, freshness: 8 }
  },
  {
    id: "story-004",
    sourceId: "nih",
    date: "2026-04-13",
    headline: "NIH-funded researchers reported a smaller CRISPR system that may improve in-body delivery for cancer and neurodegeneration programs.",
    summary: "Delivery remains one of the hardest bottlenecks in gene editing, so compact editing systems can be highly educational for anyone tracking platform progress.",
    headlineZh: "NIH 资助研究人员报告了一种更小型的 CRISPR 系统，可能改善癌症和神经退行性疾病项目的体内递送。",
    summaryZh: "递送仍然是基因编辑最难的瓶颈之一，因此更紧凑的编辑系统对关注平台进展的人具有很强的学习价值。",
    url: "https://www.nih.gov/news-events/news-releases",
    tags: ["Gene editing", "Delivery", "Platform"],
    signals: { drugDiscoveryRelevance: 9, clinicalImpact: 8, novelty: 9, freshness: 7 }
  },
  {
    id: "story-005",
    sourceId: "stat",
    date: "2026-05-01",
    headline: "STAT highlighted continued investor and clinical attention around precision oncology pipelines targeting KRAS-driven tumors.",
    summary: "Industry reporting becomes valuable on the board when it explains why capital, clinical momentum, and competitive strategy are converging around a modality or target class.",
    headlineZh: "STAT 强调，围绕针对 KRAS 驱动肿瘤的精准肿瘤学管线，投资者和临床关注仍在持续升温。",
    summaryZh: "当行业报道解释资本、临床进展和竞争策略为何集中到某一技术路径或靶点类别时，它对这个看板就具有明显价值。",
    url: "https://www.statnews.com/topic/biotech/",
    tags: ["Oncology", "KRAS", "Industry"],
    signals: { drugDiscoveryRelevance: 8, clinicalImpact: 7, novelty: 6, freshness: 9 }
  },
  {
    id: "story-006",
    sourceId: "drugs",
    date: "2026-05-02",
    headline: "Drugs.com continued to surface new drug approval and trial-result headlines that can act as a broad monitoring layer.",
    summary: "Aggregators should score below primary sources, but they are still useful for catch-all scanning before the board resolves each item back to the underlying source.",
    headlineZh: "Drugs.com 持续提供新的药物批准和试验结果标题，可作为广泛监测的一层入口。",
    summaryZh: "聚合类来源的评分应低于一手来源，但在看板将每条信息追溯到原始来源之前，它们仍适合作为全面扫描的入口。",
    url: "https://www.drugs.com/rss.html",
    tags: ["Monitoring", "Approvals", "Trials"],
    signals: { drugDiscoveryRelevance: 7, clinicalImpact: 6, novelty: 5, freshness: 9 }
  }
];

const state = {
  sources: [],
  news: [],
  rawNews: [],
  topic: "all",
  sourceType: "all",
  sort: "date",
  updateWindowDays: "all",
  annotations: {},
  publishSelectedIds: new Set(),
  archivedIds: new Set(),
  customSources: [],
  updateMeta: null,
  isUpdatingNow: false
};

const pageMode = document.body.dataset.page || "workspace";
const sourceBoardConfig = {
  fda: { days: 30, limit: 50 },
  nih: { days: 21, limit: 14 },
  "fierce-biotech": { days: 7, limit: 12 },
  "biopharma-dive": { days: 7, limit: 12 },
  stat: { days: 10, limit: 10 },
  drugs: { days: 14, limit: 10 },
  clinicaltrials: { days: 30, limit: 10 },
  pubmed: { days: 30, limit: 10 },
  "nature-biotech": { days: 21, limit: 10 },
  "nature-medicine": { days: 21, limit: 10 },
  nejm: { days: 21, limit: 10 },
  ema: { days: 30, limit: 10 },
  nci: { days: 400, limit: 12 },
  astrazeneca: { days: 21, limit: 12 },
  roche: { days: 30, limit: 12 },
  "merck-co": { days: 30, limit: 12 },
  pfizer: { days: 30, limit: 12 },
  abbvie: { days: 30, limit: 12 },
  novartis: { days: 30, limit: 12 },
  amgen: { days: 30, limit: 12 },
  gilead: { days: 30, limit: 12 },
  moderna: { days: 30, limit: 12 }
};

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveState() {
  writeStoredJson(STORAGE_KEYS.annotations, state.annotations);
  writeStoredJson(STORAGE_KEYS.publishSelectedIds, [...state.publishSelectedIds]);
  writeStoredJson(STORAGE_KEYS.archivedIds, [...state.archivedIds]);
  writeStoredJson(STORAGE_KEYS.customSources, state.customSources);
}

function normalizeTerm(term) {
  return term.replace(/\s+/g, " ").trim();
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "").toLowerCase();
  } catch {
    return url.trim().toLowerCase();
  }
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function inferSourceSupport(url) {
  const host = hostnameOf(url);
  let path = "";

  try {
    path = new URL(url).pathname.toLowerCase();
  } catch {}

  if (host.endsWith("fda.gov") && path.includes("fda-newsroom")) {
    return { updaterReady: true, updaterMode: "fda-html" };
  }

  if (host.endsWith("nih.gov") && (path.includes("news-releases") || path.includes("feed") || path.endsWith(".xml"))) {
    return { updaterReady: true, updaterMode: "nih-rss" };
  }

  if (host.endsWith("cancer.gov") && path.includes("news-events")) {
    return { updaterReady: true, updaterMode: "nci-html" };
  }

  if (host.endsWith("astrazeneca.com") && path.includes("press-releases")) {
    return { updaterReady: true, updaterMode: "astrazeneca-json" };
  }

  if (host.endsWith("merck.com") && (path.includes("/media/news") || path === "/news" || path.startsWith("/news/"))) {
    return { updaterReady: true, updaterMode: "merck-wp-json" };
  }

  if (host.endsWith("pfizer.com") && path.includes("newsroom/press-releases")) {
    return { updaterReady: true, updaterMode: "pfizer-html" };
  }

  if (host.endsWith("abbvie.com") || host === "news.abbvie.com") {
    return { updaterReady: true, updaterMode: "abbvie-html" };
  }

  if (host.endsWith("roche.com") && path.includes("media/releases")) {
    return { updaterReady: true, updaterMode: "roche-storyblok" };
  }

  if (host.endsWith("novartis.com") && (path.includes("newsroom") || path.includes("media-releases"))) {
    return { updaterReady: true, updaterMode: "novartis-html" };
  }

  if (host.endsWith("amgen.com") && path.includes("newsroom/press-releases")) {
    return { updaterReady: true, updaterMode: "amgen-json" };
  }

  if (host.endsWith("gilead.com") && (path.includes("press-releases") || path === "/news")) {
    return { updaterReady: true, updaterMode: "gilead-search" };
  }

  if (host.endsWith("modernatx.com")) {
    return { updaterReady: true, updaterMode: "moderna-rss" };
  }

  if (host.endsWith("fiercebiotech.com") || host.endsWith("biopharmadive.com")) {
    return { updaterReady: true, updaterMode: "rss" };
  }

  if (path.includes("rss") || path.includes("feed") || path.endsWith(".xml")) {
    return { updaterReady: true, updaterMode: "rss" };
  }

  return { updaterReady: false, updaterMode: "manual" };
}

function titleFromHostname(hostname) {
  return hostname
    .split(".")[0]
    .split("-")
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json();
}

async function loadJsonFresh(path) {
  const separator = path.includes("?") ? "&" : "?";
  return loadJson(`${path}${separator}t=${Date.now()}`);
}

function rescoreNews() {
  const sourceMap = new Map(state.sources.map(source => [source.id, source]));
  state.news = state.rawNews.map(item => scoreStory(item, sourceMap));
}

function formatUpdateTimestamp(isoString) {
  if (!isoString) {
    return "Last live update: not available yet";
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "Last live update: not available yet";
  }

  return `Last live update: ${date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  })}`;
}

function scoreStory(story, sourceMap) {
  const source = sourceMap.get(story.sourceId);
  const inputs = {
    sourceTrust: source?.trustScore ?? 0,
    drugDiscoveryRelevance: story.signals.drugDiscoveryRelevance,
    clinicalImpact: story.signals.clinicalImpact,
    novelty: story.signals.novelty,
    freshness: story.signals.freshness
  };

  const score = rankingRules.reduce((total, rule) => total + inputs[rule.key] * rule.weight, 0);
  return {
    ...story,
    source,
    headlineZh: story.headlineZh ?? "Chinese translation pending.",
    summaryZh: story.summaryZh ?? "Chinese translation pending.",
    score: Math.round(score * 10)
  };
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function daysAgo(value) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const date = new Date(value);
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((today - day) / 86400000);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getStoryAnnotations(storyId) {
  return state.annotations[storyId] ?? [];
}

function decorateHighlights(text, storyId) {
  const terms = getStoryAnnotations(storyId);
  let html = escapeHtml(text);

  terms.forEach(term => {
    const safeTerm = escapeRegex(term.term);
    html = html.replace(new RegExp(`(${safeTerm})`, "gi"), "<mark>$1</mark>");
  });

  return html;
}

async function lookupDictionaryEntry(term) {
  const normalized = normalizeTerm(term);
  const cacheKey = normalized.toLowerCase();

  if (!normalized || normalized.includes(" ")) {
    return null;
  }

  if (termCache.has(cacheKey)) {
    return termCache.get(cacheKey);
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`);
    if (!response.ok) {
      termCache.set(cacheKey, null);
      return null;
    }

    const data = await response.json();
    const firstEntry = data?.[0];
    const phonetic = firstEntry?.phonetic || firstEntry?.phonetics?.find(item => item.text)?.text || "/not available/";
    const audio = firstEntry?.phonetics?.find(item => item.audio)?.audio || "";
    const definition = firstEntry?.meanings?.flatMap(item => item.definitions ?? [])?.[0]?.definition || "";
    const result = definition ? { ipa: phonetic, pronunciation: normalized, simple: definition, audio } : null;
    termCache.set(cacheKey, result);
    return result;
  } catch {
    termCache.set(cacheKey, null);
    return null;
  }
}

async function buildTermEntry(term) {
  const normalized = normalizeTerm(term);
  const local = termDictionary[normalized.toLowerCase()];

  if (local) {
    return {
      term: normalized,
      ipa: local.ipa,
      pronunciation: local.pronunciation,
      simple: local.simple,
      simpleZh: local.simpleZh ?? "中文解释待补充。",
      audio: local.audio ?? ""
    };
  }

  const remote = await lookupDictionaryEntry(normalized);
  if (remote) {
    return {
      term: normalized,
      ipa: remote.ipa,
      pronunciation: remote.pronunciation,
      simple: remote.simple,
      simpleZh: chineseDefinitionFallbacks[remote.simple] ?? "中文解释待补充。",
      audio: remote.audio ?? ""
    };
  }

  return {
    term: normalized,
    ipa: "/custom term/",
    pronunciation: normalized,
    simple: "No dictionary result was found automatically for this term yet. You can keep it highlighted and refine the explanation later.",
    simpleZh: "暂时没有自动查到这个词的词典解释，你可以之后再手动补充更准确的中文解释。",
    audio: ""
  };
}

function rebuildFilterOptions(news, sources) {
  const topicFilter = document.getElementById("topic-filter");
  const sourceFilter = document.getElementById("source-filter");
  const topicValue = state.topic;
  const sourceValue = state.sourceType;

  if (topicFilter) {
    topicFilter.innerHTML = '<option value="all">All topics</option>';
  }
  if (sourceFilter) {
    sourceFilter.innerHTML = '<option value="all">All source types</option>';
  }

  if (topicFilter) {
    [...new Set(news.flatMap(item => item.tags))].sort().forEach(topic => {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic;
      topicFilter.appendChild(option);
    });
  }

  if (sourceFilter) {
    [...new Set(sources.map(item => item.type))].sort().forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      sourceFilter.appendChild(option);
    });
  }

  if (topicFilter) {
    topicFilter.value = [...topicFilter.options].some(option => option.value === topicValue) ? topicValue : "all";
  }
  if (sourceFilter) {
    sourceFilter.value = [...sourceFilter.options].some(option => option.value === sourceValue) ? sourceValue : "all";
  }
}

function wireFilters() {
  document.getElementById("topic-filter")?.addEventListener("change", event => {
    state.topic = event.target.value;
    render();
  });

  document.getElementById("source-filter")?.addEventListener("change", event => {
    state.sourceType = event.target.value;
    render();
  });

  document.getElementById("sort-order")?.addEventListener("change", event => {
    state.sort = event.target.value;
    render();
  });

  document.getElementById("update-window")?.addEventListener("change", event => {
    state.updateWindowDays = event.target.value;
    render();
  });
}

function renderMetrics(items) {
  const trackedSourceCount = pageMode === "board"
    ? new Set(items.map(item => item.sourceId)).size
    : state.sources.length;
  document.getElementById("source-count").textContent = trackedSourceCount;
  document.getElementById("story-count").textContent = items.length;
  document.getElementById("top-score").textContent = items[0]?.score ?? 0;
  document.getElementById("last-updated-label").textContent = formatUpdateTimestamp(state.updateMeta?.lastUpdatedUtc);
  document.getElementById("update-item-count").textContent = state.updateMeta?.itemCount
    ? `${state.updateMeta.itemCount} live stories fetched`
    : "";
}

function setUpdateNowStatus(message) {
  const element = document.getElementById("update-now-status");
  if (element) {
    element.textContent = message;
  }
}

function updateUpdateNowButton() {
  const button = document.getElementById("update-now-button");
  if (!button) {
    return;
  }
  button.disabled = state.isUpdatingNow;
  button.textContent = state.isUpdatingNow ? "Updating..." : "Update now";
}

function renderSources() {
  const sourceList = document.getElementById("source-list");
  if (!sourceList) {
    return;
  }
  sourceList.innerHTML = "";

  state.sources.forEach(source => {
    const link = document.createElement("a");
    link.className = "source-chip";
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = `${source.name} | ${source.type}`;
    sourceList.appendChild(link);
  });
}

function renderRankingRules() {
  const container = document.getElementById("ranking-rules");
  if (!container) {
    return;
  }
  container.innerHTML = "";

  rankingRules.forEach(rule => {
    const chip = document.createElement("div");
    chip.className = "rule-chip";
    chip.textContent = `${rule.label} ${Math.round(rule.weight * 100)}%`;
    container.appendChild(chip);
  });
}

function passesUpdateWindow(item) {
  if (state.updateWindowDays === "all") {
    return true;
  }

  const windowDays = Number(state.updateWindowDays);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const itemDate = new Date(item.date);
  const itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
  const diffDays = Math.round((today - itemDay) / 86400000);

  if (windowDays === 1) {
    return diffDays === 1;
  }

  return diffDays >= 0 && diffDays <= windowDays;
}

function filterAndSortNews() {
  if (pageMode === "board") {
    let items = [...state.news];

    items = items.filter(item => !state.archivedIds.has(item.id));
    items = items.filter(passesUpdateWindow);

    if (state.sourceType !== "all") {
      items = items.filter(item => item.source?.type === state.sourceType);
    }

    return items.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
  }

  let items = [...state.news];

  items = items.filter(item => !state.archivedIds.has(item.id));
  items = items.filter(passesUpdateWindow);

  if (state.topic !== "all") {
    items = items.filter(item => item.tags.includes(state.topic));
  }

  if (state.sourceType !== "all") {
    items = items.filter(item => item.source?.type === state.sourceType);
  }

  if (state.sort === "date") {
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    items.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
  }

  return items;
}

function getSourceWindowLabel(days) {
  return days === 1 ? "Last day" : `Last ${days} days`;
}

function getActiveWindowDays() {
  return state.updateWindowDays === "all" ? 30 : Number(state.updateWindowDays);
}

function getActiveWindowLabel() {
  return getSourceWindowLabel(getActiveWindowDays());
}

function getSourceBoardStories(sourceId, items) {
  const config = sourceBoardConfig[sourceId] ?? { limit: 5 };
  const days = getActiveWindowDays();
  return items
    .filter(item => item.sourceId === sourceId)
    .filter(item => daysAgo(item.date) >= 0 && daysAgo(item.date) <= days)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, config.limit);
}

function getWorkspaceSourceStories(sourceId, items) {
  const sorted = items
    .filter(item => item.sourceId === sourceId)
    .sort((a, b) => {
      if (state.sort === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return b.score - a.score || new Date(b.date) - new Date(a.date);
    });

  return sorted;
}

function newestStoryTime(stories) {
  return Math.max(...stories.map(story => new Date(story.date).getTime()).filter(Number.isFinite));
}

function sourceGroupRank(source) {
  const type = (source.type || "").toLowerCase();

  if (["regulator", "research", "clinical trials", "journals"].includes(type)) {
    return 1;
  }

  if (["industry media", "aggregator", "custom rss"].includes(type)) {
    return 2;
  }

  if (type === "company") {
    return 3;
  }

  return 4;
}

function sortSourceGroups(a, b) {
  const rankDiff = sourceGroupRank(a.source) - sourceGroupRank(b.source);
  if (rankDiff) {
    return rankDiff;
  }

  return a.source.name.localeCompare(b.source.name, undefined, { sensitivity: "base" });
}

function renderBoardPortal(items) {
  const tabs = document.getElementById("portal-tabs");
  const panels = document.getElementById("portal-tab-panels");
  const tabTemplate = document.getElementById("portal-source-tab-template");
  const panelTemplate = document.getElementById("portal-source-panel-template");

  if (!tabs || !panels || !tabTemplate || !panelTemplate) {
    return;
  }

  tabs.innerHTML = "";
  panels.innerHTML = "";

  const orderedSources = state.sources
    .map(source => ({
      source,
      stories: getSourceBoardStories(source.id, items)
    }))
    .filter(entry => entry.stories.length)
    .sort(sortSourceGroups);

  orderedSources.forEach(({ source, stories }, index) => {
    const tabFragment = tabTemplate.content.cloneNode(true);
    const panelFragment = panelTemplate.content.cloneNode(true);
    const panelId = `source-panel-${source.id}`;

    const tabButton = tabFragment.querySelector(".portal-tab-button");
    tabButton.textContent = source.name;
    tabButton.dataset.target = panelId;
    if (index === 0) {
      tabButton.classList.add("active");
    }

    const panel = panelFragment.querySelector(".portal-source-panel");
    panel.id = panelId;

    panelFragment.querySelector(".portal-source-type").textContent = source.type;
    panelFragment.querySelector(".portal-source-name").textContent = source.name;
    panelFragment.querySelector(".portal-window-badge").textContent = getActiveWindowLabel();

    const list = panelFragment.querySelector(".portal-story-list");
    stories.forEach(story => {
      const item = document.createElement("li");
      item.className = "portal-story-item";
      item.innerHTML = `
        <span class="portal-story-date">${escapeHtml(formatDate(story.date))}</span>
        <a class="portal-story-link" href="${escapeHtml(story.url)}" target="_blank" rel="noreferrer">${escapeHtml(story.headline)}</a>
      `;
      list.appendChild(item);
    });

    const boardLink = panelFragment.querySelector(".portal-board-link");
    boardLink.href = source.url;
    boardLink.textContent = `Visit ${source.name}`;

    tabButton.addEventListener("click", () => {
      tabs.querySelectorAll(".portal-tab-button").forEach(button => button.classList.remove("active"));
      tabButton.classList.add("active");
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    tabs.appendChild(tabFragment);
    panels.appendChild(panelFragment);
  });
}

function buildNewsCard(item) {
  const template = document.getElementById("news-card-template");
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".news-card");
  const selectable = fragment.querySelector(".selectable-copy");
  const headlineCopy = fragment.querySelector(".news-headline-copy");
  const summaryCopy = fragment.querySelector(".news-summary-copy");
  const highlightButton = fragment.querySelector(".inline-highlight-button");
  const publishToggleButton = fragment.querySelector(".publish-toggle-button");
  const archiveToggleButton = fragment.querySelector(".archive-toggle-button");

  card.dataset.storyId = item.id;
  selectable.dataset.storyId = item.id;

  fragment.querySelector(".news-meta").textContent = pageMode === "board"
    ? formatDate(item.date)
    : `${formatDate(item.date)} | ${item.source.name}`;
  fragment.querySelector(".news-headline").textContent = item.headline;
  headlineCopy.innerHTML = decorateHighlights(item.headline, item.id);
  summaryCopy.innerHTML = decorateHighlights(item.summary, item.id);
  fragment.querySelector(".score-pill").textContent = item.score;
  fragment.querySelector(".score-breakdown").textContent =
    `Trust ${item.source.trustScore}, relevance ${item.signals.drugDiscoveryRelevance}, impact ${item.signals.clinicalImpact}, novelty ${item.signals.novelty}, freshness ${item.signals.freshness}`;

  const tagRow = fragment.querySelector(".tag-row");
  item.tags.forEach(tag => {
    const chip = document.createElement("span");
    chip.className = "tag";
    chip.textContent = tag;
    tagRow.appendChild(chip);
  });

  const sourceLink = fragment.querySelector(".source-link");
  sourceLink.href = item.url;
  sourceLink.textContent = pageMode === "board"
    ? item.source.name
    : `Read source at ${item.source.name}`;

  highlightButton.addEventListener("click", () => addHighlightForStory(item.id, selectable));
  publishToggleButton.textContent = state.publishSelectedIds.has(item.id) ? "Selected for publish" : "Add to publish list";
  publishToggleButton.classList.toggle("active", state.publishSelectedIds.has(item.id));
  publishToggleButton.addEventListener("click", () => togglePublishSelection(item.id));

  archiveToggleButton.textContent = "Archive news";
  archiveToggleButton.classList.toggle("active", false);
  archiveToggleButton.addEventListener("click", () => archiveNews(item.id));

  renderGlossary(fragment.querySelector(".glossary-list"), item.id);
  return fragment;
}

function renderWorkspacePortal(items) {
  const tabs = document.getElementById("portal-tabs");
  const panels = document.getElementById("portal-tab-panels");
  const tabTemplate = document.getElementById("portal-source-tab-template");
  const panelTemplate = document.getElementById("workspace-source-panel-template");

  if (!tabs || !panels || !tabTemplate || !panelTemplate) {
    return;
  }

  tabs.innerHTML = "";
  panels.innerHTML = "";

  const orderedSources = state.sources
    .map(source => ({
      source,
      stories: getWorkspaceSourceStories(source.id, items)
    }))
    .filter(entry => entry.stories.length)
    .sort(sortSourceGroups);

  if (!orderedSources.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No stories match the current filters.";
    panels.appendChild(empty);
    return;
  }

  orderedSources.forEach(({ source, stories }, index) => {
    const tabFragment = tabTemplate.content.cloneNode(true);
    const panelFragment = panelTemplate.content.cloneNode(true);
    const panelId = `workspace-source-panel-${source.id}`;

    const tabButton = tabFragment.querySelector(".portal-tab-button");
    tabButton.textContent = source.name;
    tabButton.dataset.target = panelId;
    if (index === 0) {
      tabButton.classList.add("active");
    }

    const panel = panelFragment.querySelector(".workspace-source-panel");
    panel.id = panelId;
    panelFragment.querySelector(".portal-source-type").textContent = source.type;
    panelFragment.querySelector(".portal-source-name").textContent = source.name;
    panelFragment.querySelector(".portal-window-badge").textContent = getActiveWindowLabel();

    const storyContainer = panelFragment.querySelector(".workspace-source-stories");
    stories.forEach(story => {
      storyContainer.appendChild(buildNewsCard(story));
    });

    const boardLink = panelFragment.querySelector(".portal-board-link");
    boardLink.href = source.url;
    boardLink.textContent = `Visit ${source.name}`;

    tabButton.addEventListener("click", () => {
      tabs.querySelectorAll(".portal-tab-button").forEach(button => button.classList.remove("active"));
      tabButton.classList.add("active");
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    tabs.appendChild(tabFragment);
    panels.appendChild(panelFragment);
  });
}

function speakTerm(item) {
  if (item.audio) {
    const audio = new Audio(item.audio);
    audio.play().catch(() => {});
    return;
  }

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(item.term);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

function renderGlossary(container, storyId) {
  const items = getStoryAnnotations(storyId);
  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = '<div class="glossary-empty">No highlights yet. Select a word in this story and click the highlight button.</div>';
    return;
  }

  items.forEach(item => {
    const entry = document.createElement("article");
    entry.className = "glossary-item";
    entry.innerHTML = `
      <div class="glossary-term-row">
        <strong>${escapeHtml(item.term)}</strong>
        <span class="glossary-ipa">${escapeHtml(item.ipa)}</span>
      </div>
      <div class="glossary-pronunciation-row">
        <span class="glossary-pronunciation">Pronunciation: ${escapeHtml(item.pronunciation)}</span>
        <button class="action-button speak-button" type="button">Speak</button>
      </div>
      <p>${escapeHtml(item.simple)}</p>
    `;
    entry.querySelector(".speak-button").addEventListener("click", () => speakTerm(item));
    container.appendChild(entry);
  });
}

function renderNews(items) {
  const list = document.getElementById("news-list");
  list.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No stories match the current filters.";
    list.appendChild(empty);
    return;
  }

  items.forEach(item => {
    list.appendChild(buildNewsCard(item));
  });
}

function updateSelectionStatus() {
  const element = document.getElementById("selection-status");
  if (!element) {
    return;
  }
  const count = Object.values(state.annotations).reduce((sum, items) => sum + items.length, 0);
  element.textContent = `${count} highlighted term${count === 1 ? "" : "s"}`;
}

async function addHighlightForStory(storyId, selectableElement) {
  const selection = window.getSelection();
  const selectedText = normalizeTerm(selection?.toString() ?? "");

  if (!selectedText) {
    return;
  }

  const anchorNode = selection.anchorNode;
  const element = anchorNode?.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode;
  const selectedContainer = element?.closest(".selectable-copy");

  if (!selectedContainer || selectedContainer !== selectableElement) {
    return;
  }

  const entry = await buildTermEntry(selectedText);
  const existing = getStoryAnnotations(storyId);

  if (!existing.some(item => item.term.toLowerCase() === entry.term.toLowerCase())) {
    state.annotations[storyId] = [...existing, entry];
    saveState();
  }

  selection.removeAllRanges();
  render();
}

function clearHighlights() {
  state.annotations = {};
  saveState();
  render();
}

function togglePublishSelection(storyId) {
  if (state.publishSelectedIds.has(storyId)) {
    state.publishSelectedIds.delete(storyId);
  } else {
    state.publishSelectedIds.add(storyId);
  }
  saveState();
  render();
}

function archiveNews(storyId) {
  state.archivedIds.add(storyId);
  state.publishSelectedIds.delete(storyId);
  saveState();
  render();
}

function getPublishItems() {
  const visibleItems = filterAndSortNews();
  if (!state.publishSelectedIds.size) {
    return visibleItems;
  }
  return visibleItems.filter(item => state.publishSelectedIds.has(item.id));
}

function buildHighlightLine(story) {
  const annotations = getStoryAnnotations(story.id);
  if (!annotations.length) {
    return "";
  }

  return ["Highlights:", ...annotations.map(item => `${item.term}: ${item.simple}`)].join("\n");
}

function buildFacebookOutput(items) {
  return items.map((story, index) => {
    const highlightLine = buildHighlightLine(story);
    return [
      `${index + 1}. ${story.headline}`,
      story.summary,
      highlightLine,
      `Source: ${story.url}`
    ].filter(Boolean).join("\n");
  }).join("\n\n");
}

function buildXOutput(items) {
  return items.map((story, index) => {
    const highlightLine = buildHighlightLine(story);
    return [
      `Post ${index + 1}/${items.length}`,
      story.headline,
      highlightLine,
      `Source: ${story.url}`
    ].filter(Boolean).join("\n");
  }).join("\n\n");
}

function buildWeChatOutput(items) {
  return items.map((story, index) => {
    const annotations = getStoryAnnotations(story.id);
    const glossaryBlock = annotations.map(item => `- ${item.term}\n  Simple explanation: ${item.simple}`).join("\n");
    const glossaryBlockZh = annotations.map(item => `- ${item.term}\n  中文解释: ${item.simpleZh ?? "中文解释待补充。"}`).join("\n");

    return [
      `${index + 1}. ${story.headline}`,
      story.summary,
      story.headlineZh,
      story.summaryZh,
      glossaryBlock ? `Highlighted terms:\n${glossaryBlock}` : "",
      glossaryBlockZh ? `高亮词汇：\n${glossaryBlockZh}` : "",
      `Source link: ${story.url}`
    ].filter(Boolean).join("\n");
  }).join("\n\n");
}

function generatePublishingOutputs() {
  const items = getPublishItems();
  const facebook = document.getElementById("facebook-text");
  const x = document.getElementById("x-text");
  const wechat = document.getElementById("wechat-text");

  if (facebook) {
    facebook.value = buildFacebookOutput(items);
  }
  if (x) {
    x.value = buildXOutput(items);
  }
  if (wechat) {
    wechat.value = buildWeChatOutput(items);
  }
}

async function copyOutput(targetId) {
  const text = document.getElementById(targetId).value;
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch {}
}

function setPlatformStatus(message) {
  const element = document.getElementById("platform-status");
  if (element) {
    element.textContent = message;
  }
}

async function refreshBoardData() {
  const [rawNews, updateMeta] = await Promise.all([
    loadJsonFresh("./data/news.json"),
    loadJsonFresh("./data/update-meta.json")
  ]);

  state.rawNews = rawNews;
  state.updateMeta = updateMeta;
  rescoreNews();
}

async function refreshSourcesData() {
  let sources = await loadJsonFresh("./data/sources.json");
  sources = [...sources, ...defaultSources.filter(source => !sources.some(item => normalizeUrl(item.url) === normalizeUrl(source.url)))];
  state.sources = [...sources, ...state.customSources.filter(source => !sources.some(item => normalizeUrl(item.url) === normalizeUrl(source.url)))];
  rescoreNews();
}

async function triggerManualUpdate() {
  if (state.isUpdatingNow) {
    return;
  }

  state.isUpdatingNow = true;
  updateUpdateNowButton();
  setUpdateNowStatus("Fetching fresh live news...");

  try {
    const response = await fetch("/api/update", {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("The live update request did not complete successfully.");
    }

    const result = await response.json();
    await refreshBoardData();
    render();
    setUpdateNowStatus(`Update complete. ${result.itemCount ?? state.updateMeta?.itemCount ?? 0} stories are now on the board.`);
  } catch (error) {
    setUpdateNowStatus(error.message || "Unable to update live news right now.");
  } finally {
    state.isUpdatingNow = false;
    updateUpdateNowButton();
  }
}

async function sendToFacebook() {
  await copyOutput("facebook-text");
  window.open("https://www.facebook.com/", "_blank", "noopener");
  setPlatformStatus("Facebook content copied. Facebook opened in a new tab.");
}

function sendToX() {
  const text = document.getElementById("x-text").value;
  if (!text) {
    return;
  }
  window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  setPlatformStatus("X composer opened with your content.");
}

async function sendToWeChat() {
  await copyOutput("wechat-text");
  window.open("https://mp.weixin.qq.com/", "_blank", "noopener");
  setPlatformStatus("WeChat content copied. WeChat opened in a new tab.");
}

function setSourceStatus(message) {
  const element = document.getElementById("source-status");
  if (element) {
    element.textContent = message;
  }
}

async function addSourceFromInput() {
  const input = document.getElementById("source-url-input");
  const rawUrl = input.value.trim();

  if (!rawUrl) {
    setSourceStatus("Please paste a source URL first.");
    return;
  }

  let normalized;
  try {
    normalized = normalizeUrl(rawUrl);
    new URL(rawUrl);
  } catch {
    setSourceStatus("That URL is not valid.");
    return;
  }

  const existing = state.sources.find(source => {
    return normalizeUrl(source.url) === normalized;
  });

  if (existing) {
    setSourceStatus(`This source is already in the list as ${existing.name}.`);
    return;
  }

  const hostname = hostnameOf(rawUrl);
  const support = inferSourceSupport(rawUrl);
  const localFallbackSource = {
    id: `custom-${Date.now()}`,
    name: titleFromHostname(hostname) || "Custom Source",
    type: support.updaterReady && support.updaterMode === "rss" ? "Custom RSS" : "Custom",
    trustScore: support.updaterReady ? 6 : 5,
    url: rawUrl,
    notes: support.updaterReady
      ? "User-added source. The updater can try to fetch this automatically."
      : "User-added source. It needs RSS or a custom parser before the updater can fetch it automatically.",
    updaterReady: support.updaterReady,
    updaterMode: support.updaterMode
  };

  try {
    const response = await fetch("/api/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: rawUrl })
    });

    const result = await response.json();
    if (!response.ok || !result.ok) {
      throw new Error(result.error || "Unable to save the source.");
    }

    await refreshSourcesData();
    saveState();
    render();
    input.value = "";
    setSourceStatus(
      result.alreadyExists
        ? `This source is already in the project file as ${result.source.name}.`
        : result.source.updaterReady
          ? `Added ${result.source.name} to data/sources.json. The updater can use this source.`
          : `Added ${result.source.name} to data/sources.json. It is saved, but it still needs RSS or a custom parser before updates can fetch it automatically.`
    );
    return;
  } catch {}

  state.customSources = [...state.customSources, localFallbackSource];
  state.sources = [...state.sources, localFallbackSource];
  saveState();
  render();
  input.value = "";
  setSourceStatus(
    support.updaterReady
      ? `Added ${localFallbackSource.name} locally in this browser only. Start the local server to save it into data/sources.json so the updater can use it.`
      : `Added ${localFallbackSource.name} locally in this browser only. Start the local server to save it into the project file.`
  );
}

function wireInterface() {
  wireFilters();
  document.getElementById("copy-facebook")?.addEventListener("click", () => copyOutput("facebook-text"));
  document.getElementById("copy-x")?.addEventListener("click", () => copyOutput("x-text"));
  document.getElementById("copy-wechat")?.addEventListener("click", () => copyOutput("wechat-text"));
  document.getElementById("send-facebook")?.addEventListener("click", sendToFacebook);
  document.getElementById("send-x")?.addEventListener("click", sendToX);
  document.getElementById("send-wechat")?.addEventListener("click", sendToWeChat);
  document.getElementById("add-source-button")?.addEventListener("click", addSourceFromInput);
  document.getElementById("update-now-button")?.addEventListener("click", triggerManualUpdate);
  if (pageMode === "workspace") {
    document.getElementById("clear-highlights")?.addEventListener("click", clearHighlights);
  }

  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach(item => item.classList.remove("active"));
      document.querySelectorAll(".output-panel").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.target).classList.add("active");
    });
  });
}

function render() {
  const items = filterAndSortNews();
  renderMetrics(items);
  updateUpdateNowButton();

  if (pageMode === "board") {
    rebuildFilterOptions(state.news, state.sources);
    renderBoardPortal(items);
    return;
  }

  rebuildFilterOptions(state.news, state.sources);
  renderWorkspacePortal(items);
  renderSources();
  renderRankingRules();
  updateSelectionStatus();
  generatePublishingOutputs();
}

async function init() {
  try {
    state.annotations = readStoredJson(STORAGE_KEYS.annotations, {});
    state.publishSelectedIds = new Set(readStoredJson(STORAGE_KEYS.publishSelectedIds, []));
    state.archivedIds = new Set(readStoredJson(STORAGE_KEYS.archivedIds, []));
    state.customSources = readStoredJson(STORAGE_KEYS.customSources, []);
    state.sourceType = document.getElementById("source-filter")?.value ?? state.sourceType;
    state.updateWindowDays = document.getElementById("update-window")?.value ?? state.updateWindowDays;

    let sources = defaultSources;
    let rawNews = fallbackNews;
    let updateMeta = null;

    try {
      [sources, rawNews, updateMeta] = await Promise.all([
        loadJsonFresh("./data/sources.json"),
        loadJsonFresh("./data/news.json"),
        loadJsonFresh("./data/update-meta.json")
      ]);
      sources = [...sources, ...defaultSources.filter(source => !sources.some(item => normalizeUrl(item.url) === normalizeUrl(source.url)))];
    } catch {}

    state.sources = [...sources, ...state.customSources.filter(source => !sources.some(item => normalizeUrl(item.url) === normalizeUrl(source.url)))];
    state.updateMeta = updateMeta;

    state.rawNews = rawNews;
    rescoreNews();

    wireInterface();
    render();
  } catch (error) {
    const list = document.getElementById("news-list");
    list.innerHTML = `<div class="empty-state">${error.message}</div>`;
  }
}

init();
