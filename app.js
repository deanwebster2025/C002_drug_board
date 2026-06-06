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
  prostate: {
    ipa: "/ˈprɑː.steɪt/",
    pronunciation: "PRAH-stayt",
    simple: "A gland in the male reproductive system that can be affected by prostate cancer.",
    simpleZh: "前列腺，男性生殖系统中的腺体，也是前列腺癌发生的部位。"
  },
  pitch: {
    ipa: "/pɪtʃ/",
    pronunciation: "pitch",
    simple: "A persuasive argument or proposal made to support an approval, deal, or decision.",
    simpleZh: "游说或论证，指为推动批准、交易或决策而提出的说服性理由。"
  },
  strike: {
    ipa: "/straɪk/",
    pronunciation: "strike",
    simple: "To make or reach a deal, agreement, or partnership.",
    simpleZh: "达成，常用于表示达成交易、协议或合作。"
  },
  chaotic: {
    ipa: "/keɪˈɑː.tɪk/",
    pronunciation: "kay-AH-tik",
    simple: "Unstable, disordered, or difficult to predict.",
    simpleZh: "混乱的、不稳定的，指局势缺乏秩序且难以预测。"
  },
  kappa: {
    ipa: "/ˈkæp.ə/",
    pronunciation: "KAP-uh",
    simple: "A type of light chain in antibodies; relevant in certain plasma-cell and amyloidosis diseases.",
    simpleZh: "κ轻链，抗体轻链的一种；在部分浆细胞疾病和淀粉样变性中具有临床意义。"
  },
  innovation: {
    ipa: "/ˌɪn.əˈveɪ.ʃən/",
    pronunciation: "in-uh-VAY-shun",
    simple: "A new idea, technology, product, or development approach that changes what is possible.",
    simpleZh: "创新，指新的理念、技术、产品或开发方式，能够带来新的可能性。"
  },
  scraps: {
    ipa: "/skræps/",
    pronunciation: "skraps",
    simple: "Stops, cancels, or abandons a project, program, or plan.",
    simpleZh: "取消或放弃，指停止推进某个项目、计划或药物开发。"
  },
  unveils: {
    ipa: "/ʌnˈveɪlz/",
    pronunciation: "un-VAYLZ",
    simple: "Reveals, discloses, or presents new data, plans, or products publicly.",
    simpleZh: "公布或披露，指公开发布新的数据、计划或产品信息。"
  },
  newco: {
    ipa: "/ˈnjuː.koʊ/",
    pronunciation: "NEW-co",
    simple: "A newly formed company, often created for a specific program, asset, or business strategy.",
    simpleZh: "新成立的公司，通常围绕特定项目、资产或商业策略设立。"
  },
  guidance: {
    ipa: "/ˈɡaɪ.dəns/",
    pronunciation: "GYE-dance",
    simple: "The act or process of guiding; in regulation, an official document that explains an agency's current thinking.",
    simpleZh: "指导；在监管语境中，通常指说明监管机构当前想法和建议做法的官方指南文件。"
  },
  tobacco: {
    ipa: "/təˈbæk.oʊ/",
    pronunciation: "tuh-BAK-oh",
    simple: "Any plant of the genus Nicotiana; tobacco leaves contain nicotine and are used in smoking or related products.",
    simpleZh: "烟草，指烟草属植物；其叶片含有尼古丁，常用于吸烟或相关产品。"
  },
  hepatitis: {
    ipa: "/ˌhep.əˈtaɪ.tɪs/",
    pronunciation: "hep-uh-TY-tis",
    simple: "Inflammation of the liver, sometimes caused by a viral infection.",
    simpleZh: "肝炎，指肝脏发生炎症，有时由病毒感染引起。"
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
  diagnostics: {
    ipa: "/ˌdaɪ.əɡˈnɑː.stɪks/",
    pronunciation: "dye-ug-NAH-stiks",
    simple: "Tests, tools, or processes used to identify a disease or medical condition.",
    simpleZh: "诊断，指用于识别疾病或医学状况的检测、工具或流程。"
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
  acquire: {
    ipa: "/əˈkwaɪr/",
    pronunciation: "uh-KWY-er",
    simple: "To get or buy something; in business, to purchase another company or asset.",
    simpleZh: "获得或购买；在商业语境中，通常指收购另一家公司或资产。"
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
  "The act or process of guiding.": "指导或引导的行为或过程；在监管语境中，也常指官方指南。",
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

const pendingChineseValue = "Chinese translation pending.";
const zhMonthNames = {
  January: "1月",
  February: "2月",
  March: "3月",
  April: "4月",
  May: "5月",
  June: "6月",
  July: "7月",
  August: "8月",
  September: "9月",
  October: "10月",
  November: "11月",
  December: "12月"
};

const chineseNewsTranslations = {
  "TALZENNA Plus XTANDI Improves Radiographic Progression-Free Survival by More Than 50% in Metastatic Prostate Cancer": "TALZENNA联合XTANDI使转移性前列腺癌患者的影像学无进展生存期改善超过50%。",
  "Official Pfizer press release on pipeline, regulatory, research, or corporate developments.": "",
  "AstraZeneca, after phase 3 miss, posts subgroup data behind pitch for rare disease approval": "阿斯利康III期研究失利后，公布支持罕见病适应症获批主张的亚组数据。",
  "AstraZeneca has shared data it believes can rescue anselamimab from a phase 3 failure, linking the rare disease drug candidate to a 62% improvement in survival in a prespecified subgroup.": "阿斯利康公布了一组其认为可挽回anselamimab III期失败影响的数据；在预设亚组中，这款罕见病候选药物与生存改善62%相关。",
  "Pfizer, Innovent strike $10B cancer drug deal": "辉瑞与信达生物达成总额100亿美元的癌症药物合作交易。",
  "Involving up to 12 antibody drugs, the alliance is the latest broad partnership between Chinese biotech and a multinational pharmaceutical company.": "这项合作最多涉及12款抗体药物，是中国生物技术公司与跨国制药企业之间最新的一项大型合作。",
  "Can a chaotic FDA still deliver on faster drug development?": "处于动荡中的FDA还能推动更快的药物开发吗？",
  "As leadership changes create more instability at the FDA, here’s what one former agency official thinks it will take to keep speedier drug approvals on track.": "随着领导层变动让FDA更加不稳定，一位前机构官员认为，要让更快的药物审批保持正轨，需要满足若干条件。",
  "As leadership changes create more instability at the FDA, hereâ€™s what one former agency official thinks it will take to keep speedier drug approvals on track.": "随着领导层变动让FDA更加不稳定，一位前机构官员认为，要让更快的药物审批保持正轨，需要满足若干条件。",
  "CARES Phase III clinical programme did not meet primary endpoint in overall light chain amyloidosis population, however, demonstrated anselamimab as potential first anti-fibril therapy in kappa light chain amyloidosis": "CARES III期临床项目未在整体轻链淀粉样变性人群中达到主要终点，但显示anselamimab有望成为κ轻链淀粉样变性的首个抗纤维疗法。",
  "AstraZeneca press release covering oncology, oncology, corporate press release.": "",
  "Pfizer pens $10B, 12-drug deal with Innovent in broad bet on Chinese cancer med innovation": "辉瑞与信达生物签署100亿美元、覆盖12款药物的合作协议，押注中国癌症药物创新。",
  "Pfizer is paying Innovent $650 million upfront to partner on cancer drug development, following Bristol Myers Squibb by striking a broad pact that positions it to leverage China’s fast early development system.": "辉瑞将向信达生物支付6.5亿美元首付款，合作开发癌症药物；继百时美施贵宝之后，辉瑞也通过大型合作来利用中国快速的早期研发体系。",
  "Pfizer is paying Innovent $650 million upfront to partner on cancer drug development, following Bristol Myers Squibb by striking a broad pact that positions it to leverage Chinaâ€™s fast early development system.": "辉瑞将向信达生物支付6.5亿美元首付款，合作开发癌症药物；继百时美施贵宝之后，辉瑞也通过大型合作来利用中国快速的早期研发体系。",
  "Gilead scraps lead arthritis drug from $405M MiroBio buyout in latest blow to BTLA agonist field": "吉利德放弃其4.05亿美元收购MiroBio所得的主要关节炎药物，BTLA激动剂领域再遭打击。",
  "Gilead has abandoned work on the lead rheumatoid arthritis drug from its $405 million buyout of MiroBio in the latest blow to the BTLA agonist field.": "吉利德已停止推进其4.05亿美元收购MiroBio所得的主要类风湿关节炎药物，这是BTLA激动剂领域遭遇的最新挫折。",
  "Bristol Myers unveils data for one of its next-gen blood cancer drugs": "百时美施贵宝公布其一款下一代血液癌症药物的数据。",
  "Called mezigdomide, the drug is one of two protein-degrading medicines Bristol Myers hopes to soon position as successors to its lucrative Revlimid franchise.": "这款名为mezigdomide的药物是百时美施贵宝两款蛋白降解药物之一，公司希望它们未来接替高收入产品Revlimid。",
  "FDA Issues Draft Guidance to Cut Unnecessary Animal Testing for Cancer Drugs": "FDA发布指南草案，拟减少癌症药物开发中不必要的动物试验。",
  "GSK, Ionis unveil data for hepatitis B drug touted as ‘functional cure’": "GSK和Ionis公布被称为有望实现“功能性治愈”的乙肝药物数据。",
  "GSK, Ionis unveil data for hepatitis B drug touted as â€˜functional cureâ€™": "GSK和Ionis公布被称为有望实现“功能性治愈”的乙肝药物数据。",
  "The findings supporting bepirovirsen were deemed a “historic moment” by physicians and validate a drug that has “clear blockbuster potential,” according to one analyst.": "支持bepirovirsen的研究结果被医生称为“历史性时刻”；一位分析师认为，这些数据验证了该药物“明确的重磅潜力”。",
  "The findings supporting bepirovirsen were deemed a â€œhistoric momentâ€ by physicians and validate a drug that has â€œclear blockbuster potential,â€ according to one analyst.": "支持bepirovirsen的研究结果被医生称为“历史性时刻”；一位分析师认为，这些数据验证了该药物“明确的重磅潜力”。",
  "Human Longevity launches newco, teams with Insilico for AI-powered longevity research": "Human Longevity成立新公司，并与Insilico合作开展AI驱动的长寿研究。",
  "Human Longevity, which is seeking to use biology and genomics to boost the human lifespan, has launched a new company called Human Life Foundation Models (HLFM) to help with its goal.": "Human Longevity希望利用生物学和基因组学延长人类寿命，并已成立名为Human Life Foundation Models（HLFM）的新公司来推进这一目标。",
  "CVS obesity drug deal puts Lilly on equal footing with Novo": "CVS肥胖药物协议让礼来与诺和诺德处于同等竞争位置。",
  "The agreement includes Lilly’s new pill Foundayo and restores coverage for Zepbound, erasing what had been a commercial edge for rival Novo Nordisk.": "该协议包括礼来的新口服药Foundayo，并恢复Zepbound的覆盖范围，从而消除了竞争对手诺和诺德此前拥有的商业优势。",
  "The agreement includes Lillyâ€™s new pill Foundayo andÂ restores coverage for Zepbound, erasing what had been a commercial edge for rival Novo Nordisk.Â ": "该协议包括礼来的新口服药Foundayo，并恢复Zepbound的覆盖范围，从而消除了竞争对手诺和诺德此前拥有的商业优势。",
  "FDA Approves First Treatment for Chronic Hepatitis Delta Virus (HDV) Infection": "FDA批准首款慢性丁型肝炎病毒（HDV）感染治疗药物。",
  "FDA Warns Retailers Selling Illegal Tobacco Products That Look Like Everyday Products": "FDA警告零售商，不要销售外观类似日常用品的非法烟草产品。",
  "Roche enters into a definitive merger agreement to acquire PathAI to transform AI-driven diagnostics": "罗氏签署最终合并协议，将收购PathAI，以推动AI驱动诊断转型。",
  "PathAI’s best-in-class Image Management System (IMS) with advanced AI analysis and workflow capabilities will complement Roche's digital pathology portfolio to drive laboratory efficiencyCombining...": "PathAI领先的图像管理系统（IMS）具备先进的AI分析和工作流能力，将补充罗氏的数字病理产品组合，帮助提升实验室效率。",
  "PathAI’s best-in-class Image Management System (IMS) with advanced AI analysis and workflow capabilities will complement Roche's digital pathology portfolio to drive laboratory efficiency Combining...": "PathAI领先的图像管理系统（IMS）具备先进的AI分析和工作流能力，将补充罗氏的数字病理产品组合，帮助提升实验室效率。"
};

const chineseNewsPhraseMap = [
  ["FDA", "FDA"],
  ["Issues", "发布"],
  ["Draft Guidance", "指南草案"],
  ["Guidance", "指南"],
  ["Cancer Drugs", "癌症药物"],
  ["Cancer", "癌症"],
  ["Drugs", "药物"],
  ["Drug", "药物"],
  ["Unnecessary Animal Testing", "不必要的动物试验"],
  ["Animal Testing", "动物试验"],
  ["Testing", "试验"],
  ["Official", "官方"],
  ["press announcement", "新闻公告"],
  ["published", "发布"],
  ["approval", "批准"],
  ["approves", "批准"],
  ["therapy", "疗法"],
  ["treatment", "治疗"],
  ["clinical trial", "临床试验"],
  ["clinical", "临床"],
  ["oncology", "肿瘤学"],
  ["biotech", "生物技术"],
  ["phase", "期"],
  ["data", "数据"],
  ["patients", "患者"],
  ["disease", "疾病"],
  ["study", "研究"],
  ["announces", "宣布"],
  ["results", "结果"],
  ["new", "新的"]
];

function hasUsableChineseText(value) {
  return Boolean(value && value !== pendingChineseValue && !String(value).includes("待补充"));
}

function getDrugBoardUrl() {
  return new URL("board.html", window.location.href).href;
}

function getDrugBoardStoryUrl(story) {
  const storyId = encodeURIComponent(story.id);
  return new URL(`board.html#${storyId}`, window.location.href).href;
}

function normalizeTranslationLookupText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .replace(/efficiencyCombining/g, "efficiency Combining")
    .trim();
}

function translateKnownDateSummary(text) {
  const match = String(text).match(/^Official FDA press announcement published on ([A-Za-z]+) (\d{1,2}), (\d{4})\.$/);
  if (!match) {
    return "";
  }

  const [, monthName, day, year] = match;
  const month = zhMonthNames[monthName] ?? monthName;
  return `FDA于${year}年${month}${Number(day)}日发布的官方新闻公告。`;
}

function draftChineseNewsText(text) {
  if (!text || text === pendingChineseValue) {
    return "";
  }

  const normalized = normalizeTranslationLookupText(text);
  const known = chineseNewsTranslations[text] || chineseNewsTranslations[normalized];
  if (known) {
    return known;
  }

  const dateSummary = translateKnownDateSummary(normalized);
  if (dateSummary) {
    return dateSummary;
  }

  return "中文翻译待补充。";
}

function isBoilerplateSummary(value) {
  const text = String(value || "");
  return text.startsWith("Official ") && text.includes(" press announcement published on ");
}

function getChineseNewsLines(story) {
  const headlineZh = hasUsableChineseText(story.headlineZh) ? story.headlineZh : draftChineseNewsText(story.headline);
  const summaryZh = isBoilerplateSummary(story.summary) ? "" : (hasUsableChineseText(story.summaryZh) ? story.summaryZh : draftChineseNewsText(story.summary));
  return [headlineZh, summaryZh].filter(Boolean);
}
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
  isUpdatingNow: false,
  journalArticleGroups: [],
  journalArticlesLoading: false
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
const journalBoardConfig = [
  { rank: 1, name: "Nature Reviews Drug Discovery", issn: "1474-1784", impact: 101.8, url: "https://www.nature.com/nrd/" },
  { rank: 2, name: "Nature Medicine", issn: "1546-170X", impact: 50.0, url: "https://www.nature.com/nm/" },
  { rank: 3, name: "Nature", issn: "1476-4687", impact: 48.5, url: "https://www.nature.com/nature/" },
  { rank: 4, name: "Science", issn: "1095-9203", impact: 45.8, url: "https://www.science.org/journal/science" },
  { rank: 5, name: "Cancer Cell", issn: "1535-6108", impact: 44.5, url: "https://www.cell.com/cancer-cell/home" },
  { rank: 6, name: "Cell", issn: "1097-4172", impact: 42.5, url: "https://www.cell.com/cell/home" },
  { rank: 7, name: "Nature Biotechnology", issn: "1546-1696", impact: 41.7, url: "https://www.nature.com/nbt/" },
  { rank: 8, name: "Cancer Discovery", issn: "2159-8290", impact: 33.3, url: "https://aacrjournals.org/cancerdiscovery" },
  { rank: 9, name: "Nature Methods", issn: "1548-7105", impact: 32.1, url: "https://www.nature.com/nmeth/" },
  { rank: 10, name: "Nature Cancer", issn: "2662-1347", impact: 28.5, url: "https://www.nature.com/natcancer/" },
  { rank: 11, name: "Nature Immunology", issn: "1529-2916", impact: 27.6, url: "https://www.nature.com/ni/" },
  { rank: 12, name: "Nature Biomedical Engineering", issn: "2157-846X", impact: 26.6, url: "https://www.nature.com/natbiomedeng/" },
  { rank: 13, name: "Immunity", issn: "1074-7613", impact: 26.3, url: "https://www.cell.com/immunity/home" },
  { rank: 14, name: "Nature Machine Intelligence", issn: "2522-5839", impact: 23.9, url: "https://www.nature.com/natmachintell/" },
  { rank: 15, name: "Trends in Pharmacological Sciences", issn: "0165-6147", impact: 19.9, url: "https://www.cell.com/trends/pharmacological-sciences/home" },
  { rank: 16, name: "Nature Computational Science", issn: "2662-8457", impact: 18.3, url: "https://www.nature.com/natcomputsci/" },
  { rank: 20, name: "Science Translational Medicine", issn: "1946-6242", impact: 14.6, url: "https://www.science.org/journal/stm" },
  { rank: 21, name: "Nature Chemical Biology", issn: "1552-4469", impact: 13.7, url: "https://www.nature.com/nchembio/" },
  { rank: 22, name: "Briefings in Bioinformatics", issn: "1477-4054", impact: 7.7, url: "https://academic.oup.com/bib" },
  { rank: 23, name: "Cell Systems", issn: "2405-4712", impact: 7.7, url: "https://www.cell.com/cell-systems/home" },
  { rank: 24, name: "Drug Discovery Today", issn: "1359-6446", impact: 7.5, url: "https://www.sciencedirect.com/journal/drug-discovery-today" },
  { rank: 27, name: "Cell Chemical Biology", issn: "2451-9456", impact: 7.2, url: "https://www.cell.com/cell-chemical-biology/home" },
  { rank: 28, name: "Journal of Medicinal Chemistry", issn: "1520-4804", impact: 6.8, url: "https://pubs.acs.org/journal/jmcmar" },
  { rank: 29, name: "European Journal of Medicinal Chemistry", issn: "0223-5234", impact: 5.9, url: "https://www.sciencedirect.com/journal/european-journal-of-medicinal-chemistry" },
  { rank: 30, name: "Digital Discovery", issn: "2635-098X", impact: 5.6, url: "https://www.rsc.org/journals-books-databases/about-journals/digital-discovery/" },
  { rank: 31, name: "Clinical Pharmacology & Therapeutics", issn: "1532-6535", impact: 5.5, url: "https://ascpt.onlinelibrary.wiley.com/journal/15326535" },
  { rank: 32, name: "Bioinformatics", issn: "1367-4811", impact: 5.4, url: "https://academic.oup.com/bioinformatics" },
  { rank: 33, name: "Journal of Chemical Information and Modeling", issn: "1549-960X", impact: 5.3, url: "https://pubs.acs.org/journal/jcisd8" },
  { rank: 34, name: "Molecular Pharmaceutics", issn: "1543-8392", impact: 4.5, url: "https://pubs.acs.org/journal/mpohbp" },
  { rank: 35, name: "Pharmaceutical Research", issn: "1573-904X", impact: 4.3, url: "https://link.springer.com/journal/11095" },
  { rank: 36, name: "ACS Medicinal Chemistry Letters", issn: "1948-5875", impact: 4.0, url: "https://pubs.acs.org/journal/amclct" },
  { rank: 37, name: "Drug Metabolism and Disposition", issn: "1521-009X", impact: 4.0, url: "https://dmd.aspetjournals.org/" }
];
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

function hasUsableChineseExplanation(value) {
  return Boolean(value && !String(value).includes("待补充"));
}

function hydrateAnnotation(item) {
  const key = normalizeTerm(item.term || "").toLowerCase();
  const local = termDictionary[key];

  if (!local) {
    return item;
  }

  return {
    ...item,
    ipa: item.ipa && item.ipa !== "/custom term/" ? item.ipa : local.ipa,
    pronunciation: item.pronunciation || local.pronunciation,
    simple: item.simple || local.simple,
    simpleZh: hasUsableChineseExplanation(item.simpleZh) ? item.simpleZh : local.simpleZh,
    audio: item.audio || local.audio || ""
  };
}

function findAutoGlossaryItems(story) {
  const text = `${story.headline || ""} ${story.summary || ""}`;
  return Object.entries(termDictionary)
    .filter(([term]) => term.length > 2 && new RegExp(`\\b${escapeRegex(term)}\\b`, "i").test(text))
    .slice(0, 2)
    .map(([term, local]) => hydrateAnnotation({
      term,
      ipa: local.ipa,
      pronunciation: local.pronunciation,
      simple: local.simple,
      simpleZh: local.simpleZh,
      audio: local.audio || ""
    }));
}
function getStoryAnnotations(storyId) {
  return (state.annotations[storyId] ?? []).map(hydrateAnnotation);
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
  const primarySourceOrder = ["fda", "nih", "astrazeneca"];
  const aPrimaryIndex = primarySourceOrder.indexOf(a.source.id);
  const bPrimaryIndex = primarySourceOrder.indexOf(b.source.id);

  if (aPrimaryIndex !== -1 || bPrimaryIndex !== -1) {
    if (aPrimaryIndex === -1) return 1;
    if (bPrimaryIndex === -1) return -1;
    return aPrimaryIndex - bPrimaryIndex;
  }

  const rankDiff = sourceGroupRank(a.source) - sourceGroupRank(b.source);
  if (rankDiff) {
    return rankDiff;
  }

  return a.source.name.localeCompare(b.source.name, undefined, { sensitivity: "base" });
}

function getCrossrefDate(work) {
  const dateParts = work?.published?.["date-parts"]?.[0]
    ?? work?.["published-print"]?.["date-parts"]?.[0]
    ?? work?.["published-online"]?.["date-parts"]?.[0]
    ?? work?.issued?.["date-parts"]?.[0];

  if (!dateParts?.length) {
    return "";
  }

  const [year, month = 1, day = 1] = dateParts;
  return new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10);
}

function getCrossrefTitle(work) {
  const title = Array.isArray(work?.title) ? work.title[0] : work?.title;
  return title ? title.replace(/\s+/g, " ").trim() : "Untitled article";
}

function getCrossrefContainer(work) {
  const container = Array.isArray(work?.["container-title"]) ? work["container-title"][0] : work?.["container-title"];
  return container ? container.replace(/\s+/g, " ").trim() : "";
}

function journalContainerMatches(work, journalName) {
  const container = getCrossrefContainer(work).toLowerCase();
  return container && container === journalName.toLowerCase();
}

async function fetchJournalArticles(journal) {
  const endpoint = new URL("https://api.crossref.org/works");
  const fromDate = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
  endpoint.searchParams.set("filter", `issn:${journal.issn},type:journal-article,from-pub-date:${fromDate}`);
  endpoint.searchParams.set("sort", "published");
  endpoint.searchParams.set("order", "desc");
  endpoint.searchParams.set("rows", "6");
  endpoint.searchParams.set("mailto", "deanwebster2025@gmail.com");

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(endpoint, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Crossref returned ${response.status}`);
    }

    const data = await response.json();
    const works = data?.message?.items ?? [];
    const exactMatches = works.filter(work => journalContainerMatches(work, journal.name));
    const selectedWorks = exactMatches.length ? exactMatches : works;

    return selectedWorks.slice(0, 5).map(work => ({
      title: getCrossrefTitle(work),
      date: getCrossrefDate(work),
      url: work.URL || (work.DOI ? `https://doi.org/${work.DOI}` : journal.url),
      container: getCrossrefContainer(work)
    }));
  } finally {
    window.clearTimeout(timeout);
  }
}

function renderJournalBoard() {
  const tabs = document.getElementById("portal-tabs");
  const panels = document.getElementById("portal-tab-panels");
  const tabTemplate = document.getElementById("portal-source-tab-template");

  if (!tabs || !panels || !tabTemplate) {
    return;
  }

  tabs.querySelector('[data-target="journal-panel"]')?.remove();
  panels.querySelector("#journal-panel")?.remove();

  const groups = state.journalArticleGroups.length
    ? state.journalArticleGroups
    : journalBoardConfig.map(journal => ({ journal, articles: [], status: state.journalArticlesLoading ? "loading" : "idle" }));

  const tabFragment = tabTemplate.content.cloneNode(true);
  const tabButton = tabFragment.querySelector(".portal-tab-button");
  tabButton.textContent = "Journal articles";
  tabButton.dataset.target = "journal-panel";

  const panel = document.createElement("article");
  panel.className = "portal-source-panel journal-source-panel journal-board-panel";
  panel.id = "journal-panel";

  const groupMarkup = groups.map(group => {
    const listItems = group.articles.map(article => `
      <li class="portal-story-item journal-story-item">
        <span class="portal-story-date">${escapeHtml(article.date ? formatDate(article.date) : "Latest")}</span>
        <a class="portal-story-link" href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a>
      </li>
    `).join("");

    const statusText = group.status === "loading"
      ? "Loading latest articles..."
      : group.status === "error"
        ? "Unable to load latest articles right now."
        : "No articles returned from the past 30 days.";

    return `
      <section class="journal-group">
        <div class="portal-source-board-head journal-group-head">
          <div>
            <p class="section-label">Rank ${group.journal.rank}</p>
            <h4>${escapeHtml(group.journal.name)}</h4>
          </div>
          <span class="portal-window-badge">IF ${group.journal.impact.toFixed(1)}</span>
        </div>
        <ul class="portal-story-list journal-story-list">
          ${listItems || `<li class="journal-story-status">${escapeHtml(statusText)}</li>`}
        </ul>
        <div class="journal-group-footer">
          <a class="source-link portal-board-link" href="${escapeHtml(group.journal.url)}" target="_blank" rel="noreferrer">Visit journal</a>
        </div>
      </section>
    `;
  }).join("");

  panel.innerHTML = `
    <div class="portal-source-board-head">
      <div>
        <p class="section-label">Journal articles</p>
        <h3>Past 30 days in ranked journal order</h3>
      </div>
      <span class="portal-window-badge">${groups.length} journals</span>
    </div>
    <div class="journal-group-list">
      ${groupMarkup}
    </div>
    <div class="portal-board-footer">
      <a class="source-link portal-board-link" href="https://www.crossref.org/" target="_blank" rel="noreferrer">Article metadata</a>
      <button class="portal-back-top-button" type="button">Back to top</button>
    </div>
  `;

  panel.querySelector(".portal-back-top-button")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  tabButton.addEventListener("click", () => {
    tabs.querySelectorAll(".portal-tab-button").forEach(button => button.classList.remove("active"));
    tabButton.classList.add("active");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  tabs.appendChild(tabFragment);
  panels.appendChild(panel);
}
async function loadJournalArticles() {
  const container = document.getElementById("portal-tab-panels");
  if (!container || state.journalArticlesLoading || state.journalArticleGroups.length) {
    return;
  }

  state.journalArticlesLoading = true;
  state.journalArticleGroups = journalBoardConfig.map(journal => ({ journal, articles: [], status: "loading" }));
  renderJournalBoard();

  const groups = await Promise.all(journalBoardConfig.map(async journal => {
    try {
      const articles = await fetchJournalArticles(journal);
      return { journal, articles, status: articles.length ? "ready" : "empty" };
    } catch {
      return { journal, articles: [], status: "error" };
    }
  }));

  state.journalArticleGroups = groups.sort((a, b) => a.journal.rank - b.journal.rank);
  state.journalArticlesLoading = false;
  renderJournalBoard();
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

  const permanentBoardSourceIds = new Set(["fda", "nih", "astrazeneca"]);
  const orderedSources = state.sources
    .map(source => ({
      source,
      stories: getSourceBoardStories(source.id, items)
    }))
    .filter(entry =>
      entry.stories.length ||
      (state.sourceType === "all" && permanentBoardSourceIds.has(entry.source.id))
    )
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
    if (stories.length) {
      stories.forEach(story => {
        const item = document.createElement("li");
        item.id = story.id;
        item.className = "portal-story-item";
        item.innerHTML = `
          <span class="portal-story-date">${escapeHtml(formatDate(story.date))}</span>
          <a class="portal-story-link" href="${escapeHtml(story.url)}" target="_blank" rel="noreferrer">${escapeHtml(story.headline)}</a>
        `;
        list.appendChild(item);
      });
    } else {
      const empty = document.createElement("li");
      empty.className = "empty-state";
      empty.textContent = `No ${source.name} stories are available for ${getActiveWindowLabel().toLowerCase()}.`;
      list.appendChild(empty);
    }

    const boardLink = panelFragment.querySelector(".portal-board-link");
    boardLink.href = source.url;
    boardLink.textContent = `Visit ${source.name}`;

    const backTopButton = panelFragment.querySelector(".portal-back-top-button");
    backTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

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
  const clearCardHighlightButton = fragment.querySelector(".clear-card-highlight-button");
  const archiveToggleButton = fragment.querySelector(".archive-toggle-button");

  card.id = item.id;
  card.dataset.storyId = item.id;
  selectable.dataset.storyId = item.id;

  fragment.querySelector(".news-meta").textContent = pageMode === "board"
    ? formatDate(item.date)
    : `${formatDate(item.date)} | ${item.source.name}`;
  fragment.querySelector(".news-headline").innerHTML = decorateHighlights(item.headline, item.id);
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

  highlightButton.addEventListener("click", () => addHighlightForStory(item.id, card));
  clearCardHighlightButton.addEventListener("click", () => clearHighlightForStory(item.id));

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

    const backTopButton = panelFragment.querySelector(".portal-back-top-button");
    backTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

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
    const chineseExplanation = item.simpleZh || "中文解释待补充。";
    entry.innerHTML = `
      <div class="glossary-term-row">
        <strong>${escapeHtml(item.term)}</strong>
        <span class="glossary-ipa">${escapeHtml(item.ipa)}</span>
      </div>
      <div class="glossary-pronunciation-row">
        <span class="glossary-pronunciation">Pronunciation: ${escapeHtml(item.pronunciation)}</span>
        <button class="action-button speak-button" type="button">Speak</button>
      </div>
      <p><strong>Simple explanation:</strong> ${escapeHtml(item.simple)}</p>
      <p><strong>中文解释:</strong> ${escapeHtml(chineseExplanation)}</p>
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

async function addHighlightForStory(storyId, cardElement) {
  const selection = window.getSelection();
  const selectedText = normalizeTerm(selection?.toString() ?? "");

  if (!selectedText) {
    return;
  }

  const anchorNode = selection.anchorNode;
  const focusNode = selection.focusNode;
  const anchorElement = anchorNode?.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode;
  const focusElement = focusNode?.nodeType === Node.TEXT_NODE ? focusNode.parentElement : focusNode;
  const anchorCard = anchorElement?.closest(".news-card");
  const focusCard = focusElement?.closest(".news-card");

  if (!anchorCard || anchorCard !== cardElement || focusCard !== cardElement) {
    return;
  }

  const entry = await buildTermEntry(selectedText);
  const existing = getStoryAnnotations(storyId);

  if (!existing.some(item => item.term.toLowerCase() === entry.term.toLowerCase())) {
    state.annotations[storyId] = [...existing, entry];
  }

  state.publishSelectedIds.add(storyId);
  saveState();
  selection.removeAllRanges();
  render();
}

function clearHighlightForStory(storyId) {
  delete state.annotations[storyId];
  state.publishSelectedIds.delete(storyId);
  saveState();
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
  const boardUrl = new URL("board.html", window.location.href).href;
  const storyBlocks = items.map((story, index) => {
    const highlightLine = buildHighlightLine(story);
    return [
      `${index + 1}. ${story.headline}`,
      isBoilerplateSummary(story.summary) ? "" : story.summary,
      highlightLine
    ].filter(Boolean).join("\n");
  });

  return [`Drug Board link: ${boardUrl}`, ...storyBlocks].filter(Boolean).join("\n\n");
}

function buildXOutput(items) {
  return items.map((story, index) => {
    const highlightLine = buildHighlightLine(story);
    return [
      `Post ${index + 1}/${items.length}`,
      `Drug Board link: ${getDrugBoardStoryUrl(story)}`,
      story.headline,
      highlightLine
    ].filter(Boolean).join("\n");
  }).join("\n\n");
}

function buildWeChatOutput(items) {
  const boardUrl = new URL("board.html", window.location.href).href;
  const storyBlocks = items.map((story, index) => {
    const savedAnnotations = getStoryAnnotations(story.id);
    const annotations = savedAnnotations.length ? savedAnnotations : findAutoGlossaryItems(story);
    const englishGlossaryBlock = annotations.map(item => `- ${item.term}\n  Simple explanation: ${item.simple}`).join("\n");
    const chineseGlossaryBlock = annotations.map(item => `- ${item.term}\n  中文解释: ${item.simpleZh || "中文解释待补充。"}`).join("\n");
    const englishNewsLines = [story.headline];
    if (!isBoilerplateSummary(story.summary)) {
      englishNewsLines.push(story.summary);
    }
    const chineseNewsLines = getChineseNewsLines(story);

    return [
      `${index + 1}. ${englishNewsLines.filter(Boolean).join("\n")}`,
      chineseNewsLines.join("\n"),
      englishGlossaryBlock ? `Highlighted terms :\n${englishGlossaryBlock}` : "",
      chineseGlossaryBlock ? `高亮词汇：\n${chineseGlossaryBlock}` : ""
    ].filter(Boolean).join("\n");
  });

  return [`Drug Board link: ${boardUrl}`, ...storyBlocks].filter(Boolean).join("\n\n");
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
    renderJournalBoard();
    return;
  }

  rebuildFilterOptions(state.news, state.sources);
  renderWorkspacePortal(items);
  renderJournalBoard();
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
    loadJournalArticles();
  } catch (error) {
    const list = document.getElementById("news-list");
    list.innerHTML = `<div class="empty-state">${error.message}</div>`;
  }
}

init();
