export const RECIPE_BRANDS = ["Lotus Water", "Apax Lab", "Custom"] as const;
export type RecipeBrand = (typeof RECIPE_BRANDS)[number];

export const TEA_RECIPE_BRANDS = ["Tea", "Custom"] as const;
export type TeaRecipeBrand = (typeof TEA_RECIPE_BRANDS)[number];

export interface Recipe {
  readonly id: string;
  readonly brand: RecipeBrand;
  readonly name: string;
  readonly gh: number;
  readonly kh: number;
  readonly description: string;
}

export interface PublishedCompetitionRecipe {
  readonly id: string;
  readonly competition: string;
  readonly year: number;
  readonly placement: number;
  readonly brewer: string;
  readonly country: string;
  readonly baseWater: string;
  readonly ingredients: readonly string[];
  readonly brew: {
    readonly coffee: string;
    readonly water: string;
    readonly temperature: string;
    readonly method: readonly string[];
  };
  readonly source: {
    readonly label: string;
    readonly url: string;
  };
}

export const DEFAULT_RECIPE_ID = "lotus-light-bright";
export const DEFAULT_VOLUME_LITERS = 1.5;
export const VOLUME_LIMITS = { min: 0.25, max: 10, step: 0.05 } as const;
export const VOLUME_PRESETS = [0.5, 1, 1.5, 2, 3.78, 5] as const;
export const CUSTOM_GH_LIMITS = { min: 10, max: 150 } as const;
export const CUSTOM_KH_LIMITS = { min: 5, max: 100 } as const;

export const RECIPES = [
  {
    id: "lotus-light-bright",
    brand: "Lotus Water",
    name: "Light & Bright (Filter)",
    gh: 60,
    kh: 25,
    description:
      "High acidity, clean floral notes, bright flavor separation. Best for washed Ethiopian and Kenyan light roasts.",
  },
  {
    id: "lotus-simple-sweet",
    brand: "Lotus Water",
    name: "Simple & Sweet (Filter)",
    gh: 90,
    kh: 40,
    description:
      "Smooth, full-bodied, high sweetness, tamed acidity. Great daily brew for medium roasts.",
  },
  {
    id: "lotus-bright-juicy",
    brand: "Lotus Water",
    name: "Bright & Juicy (Filter)",
    gh: 72,
    kh: 18,
    description:
      "High mineral extraction paired with low buffer for maximum acidity pop in light roasts.",
  },
  {
    id: "lotus-scott-rao",
    brand: "Lotus Water",
    name: "Scott Rao Recipe",
    gh: 90,
    kh: 42,
    description:
      "Heavy extraction power, balanced, rounded, and highly forgiving across all drippers.",
  },
  {
    id: "lotus-ultra-light",
    brand: "Lotus Water",
    name: "Ultra Light",
    gh: 30,
    kh: 10,
    description:
      "Minimalist mineral touch; tea-like clarity for Nordic ultra-light roasts.",
  },
  {
    id: "lotus-espresso-lb",
    brand: "Lotus Water",
    name: "Light & Bright (Espresso)",
    gh: 40,
    kh: 50,
    description:
      "Higher buffer to neutralize intense espresso sourness in light roast shots.",
  },
  {
    id: "lotus-espresso-ss",
    brand: "Lotus Water",
    name: "Simple & Sweet (Espresso)",
    gh: 30,
    kh: 70,
    description:
      "Heavy buffering for a thick, low-acidity, ultra-smooth espresso or milk beverage.",
  },
  {
    id: "apax-tone",
    brand: "Apax Lab",
    name: "Tone (Floral & Expressive)",
    gh: 55,
    kh: 18,
    description:
      "High clarity, accentuates delicate florals and high-altitude cup acidity.",
  },
  {
    id: "apax-jam",
    brand: "Apax Lab",
    name: "Jam (Sweet & Rounded)",
    gh: 85,
    kh: 38,
    description:
      "Pushes body, tactile mouthfeel, and deep fruit sweetness while softening harsh edges.",
  },
  {
    id: "apax-tonic",
    brand: "Apax Lab",
    name: "Tonic (Vibrant Acidity)",
    gh: 70,
    kh: 22,
    description:
      "Drives dynamic, punchy acidity and juicy fruit flavors in light-to-medium roasts.",
  },
  {
    id: "apax-catch",
    brand: "Apax Lab",
    name: "Catch (Structured & Balanced)",
    gh: 75,
    kh: 32,
    description:
      "Balanced extraction focus; clean finish with structured body and lingering sweetness.",
  },
  {
    id: "apax-espresso",
    brand: "Apax Lab",
    name: "Espresso Focus",
    gh: 45,
    kh: 55,
    description:
      "High buffer to prevent sourness in high-yield specialty espresso recipes.",
  },
  {
    id: "custom",
    brand: "Custom",
    name: "Custom Profile",
    gh: 60,
    kh: 25,
    description:
      "Define your own custom General Hardness (GH) and Alkalinity (KH) targets.",
  },
] as const satisfies readonly Recipe[];

export interface TeaRecipe {
  readonly id: string;
  readonly brand: TeaRecipeBrand;
  readonly name: string;
  readonly gh: number;
  readonly kh: number;
  readonly description: string;
}

export const DEFAULT_TEA_RECIPE_ID = "tea-green";

// Tea water targets follow the Chinese six-category tradition (绿茶 green, 白茶
// white, 黄茶 yellow, 青茶/乌龙 oolong, 红茶 black, 黑茶 dark). Peer-reviewed work
// from the Tea Research Institute of the Chinese Academy of Agricultural
// Sciences (Hangzhou) and Anhui Agricultural University is the source of truth
// for the direction these values take:
//
//   * Lower-TDS / low-mineral water brews better tea for sensory quality and
//     antioxidant retention (Xu et al. 2017, Food Chem. 236:142; Cao et al.
//     2021, Food Chem. 364:130235).
//   * Sensitivity to hard, high-pH, high-TDS water ranks: Japanese + Chinese
//     green most sensitive → white/yellow → light oolong → rock/roasted oolong
//     and sheng pu-erh → black red tea → shou/dark pu-erh most stable (Cao et
//     al. 2021; Deng et al. 2023, Food Chem. 419:136079).
//   * Higher pH + TDS darkens infusions and turns them flatter/astringent via
//     oxidative polymerization of catechins; pure water resists this best
//     (Cao et al. 2021; Deng et al. 2023).
//   * Calcium/iron in water suppress volatile (aromatic) compounds; neutral pH
//     and low mineral content suit green tea (Bai et al. 2023, Food Chem. X
//     18:100681).
//
// The specific GH/KH numbers below are practical starting presets derived from
// these principles rather than exact optima published in the papers: the
// research establishes low mineral + low carbonate (buffer), not per-tea ppm
// Tradeoff: buffer here stays minimal so delicate teas never taste
// flat, and hardness scales up only along the oxidation/fermentation/roast
// gradient. Finer splits (Japanese vs Chinese green, light vs rock oolong,
// sheng vs shou pu-erh) follow the same low→high ordering within each family.
export const TEA_RECIPES = [
  {
    id: "tea-green",
    brand: "Tea",
    name: "Chinese Green — 绿茶",
    gh: 20,
    kh: 10,
    description:
      "The most water-sensitive tea: soft, low mineral, low buffer. Preserves fresh, grassy-vegetal sweetness and aroma.",
  },
  {
    id: "tea-japanese-green",
    brand: "Tea",
    name: "Japanese Green — 煎茶/玉露",
    gh: 15,
    kh: 8,
    description:
      "Sencha and gyokuro prize clean umami; use the softest, lowest-buffer water so sweet-savory depth isn't masked.",
  },
  {
    id: "tea-white",
    brand: "Tea",
    name: "White Tea — 白茶",
    gh: 15,
    kh: 8,
    description:
      "Softest water of any category; lets delicate floral, honey and downy notes come through untouched.",
  },
  {
    id: "tea-yellow",
    brand: "Tea",
    name: "Yellow Tea — 黄茶",
    gh: 20,
    kh: 10,
    description:
      "Rare, lightly-oxidized tea between green and white; keep water near-neutral and low-mineral like green tea.",
  },
  {
    id: "tea-oolong-light",
    brand: "Tea",
    name: "Light Oolong — 清香型乌龙",
    gh: 25,
    kh: 12,
    description:
      "Fragrant, crisp high-mountain (gaoshan) and floral oolongs; low mineral keeps the aroma bright and transparent.",
  },
  {
    id: "tea-oolong-dark",
    brand: "Tea",
    name: "Rock / Roasted Oolong — 岩茶/浓香",
    gh: 35,
    kh: 18,
    description:
      "Wuyi yancha and heavily roasted oolongs: a touch more mineral rounds out toasty, mineral-driven body.",
  },
  {
    id: "tea-black",
    brand: "Tea",
    name: "Black Tea — 红茶",
    gh: 40,
    kh: 25,
    description:
      "Most tolerant of the lighter teas: moderate mineral and low-moderate buffer round out malty, full-bodied red tea.",
  },
  {
    id: "tea-puerh-sheng",
    brand: "Tea",
    name: "Sheng Pu-erh — 生普洱",
    gh: 35,
    kh: 18,
    description:
      "Raw, aged pu-erh brews bright and aromatic; keep mineral moderate so bitterness stays in check.",
  },
  {
    id: "tea-puerh-shou",
    brand: "Tea",
    name: "Shou Pu-erh — 熟普洱",
    gh: 50,
    kh: 30,
    description:
      "Ripe/fermented pu-erh is the most water-stable brew; higher mineral brings out thick, earthy, woody body.",
  },
  {
    id: "tea-custom",
    brand: "Custom",
    name: "Custom Tea Profile",
    gh: 20,
    kh: 10,
    description:
      "Define your own custom General Hardness (GH) and Alkalinity (KH) targets for tea.",
  },
] as const satisfies readonly TeaRecipe[];

// Values are transcribed from each finalist's published routine. When mineral
// doses are not published, retain the reported water target without inference.
export const PUBLISHED_COMPETITION_RECIPES = [
  {
    id: "wbrc-2026-nas-jaafar",
    competition: "World Brewers Cup",
    year: 2026,
    placement: 1,
    brewer: "Nas Jaafar",
    country: "Malaysia",
    baseWater: "Water at 50 ppm",
    ingredients: ["Balanced magnesium and calcium"],
    brew: {
      coffee: "15 g",
      water: "200 g",
      temperature: "92°C",
      method: [
        "Pour 100 g and percolate for 58 seconds.",
        "At 1:00, add 100 g; drain at 2:00 for 10 seconds.",
      ],
    },
    source: {
      label: "Andeo: 2026 WBrC finalists",
      url: "https://andeo.pe/blogs/conocimiento/world-brewers-cup-2026-las-recetas-de-los-6-finalistas-ficha-por-ficha",
    },
  },
  {
    id: "wbrc-2026-simon-gautherin",
    competition: "World Brewers Cup",
    year: 2026,
    placement: 2,
    brewer: "Simon Gautherin",
    country: "Australia",
    baseWater: "Water at 80 ppm",
    ingredients: [
      "3 parts magnesium sulfate",
      "2 parts potassium chloride",
      "1 part silica",
    ],
    brew: {
      coffee: "14 g (7 g of each coffee)",
      water: "200 g",
      temperature: "89°C",
      method: [
        "Pour 100 g and immerse for 1:20.",
        "Add the remaining 100 g, then adjust final yield to 140 g.",
      ],
    },
    source: {
      label: "Andeo: 2026 WBrC finalists",
      url: "https://andeo.pe/blogs/conocimiento/world-brewers-cup-2026-las-recetas-de-los-6-finalistas-ficha-por-ficha",
    },
  },
  {
    id: "wbrc-2026-bavis-kwong",
    competition: "World Brewers Cup",
    year: 2026,
    placement: 3,
    brewer: "Bavis Kwong",
    country: "Hong Kong SAR",
    baseWater: "Natural mineral water at 35 ppm, pH 6",
    ingredients: ["Source mineral composition not published"],
    brew: {
      coffee: "16 g (14 g coarse, 2 g fine)",
      water: "215 g published total",
      temperature: "94°C",
      method: [
        "Bloom with 15 g.",
        "Add four 50 g pours at 0:40, 1:20, 2:00, and 2:40.",
      ],
    },
    source: {
      label: "Andeo: 2026 WBrC finalists",
      url: "https://andeo.pe/blogs/conocimiento/world-brewers-cup-2026-las-recetas-de-los-6-finalistas-ficha-por-ficha",
    },
  },
  {
    id: "wbrc-2026-jackie-tran",
    competition: "World Brewers Cup",
    year: 2026,
    placement: 4,
    brewer: "Jackie Tran",
    country: "Czech Republic",
    baseWater: "Water at 80 ppm",
    ingredients: ["Mineral composition not published"],
    brew: {
      coffee: "14 g",
      water: "200 g",
      temperature: "94°C, then 80°C",
      method: [
        "Pour 100 g at 94°C, close the valve for 1 minute, then drain.",
        "Pour 100 g at 80°C, close the valve for 1 minute, then drain.",
      ],
    },
    source: {
      label: "Andeo: 2026 WBrC finalists",
      url: "https://andeo.pe/blogs/conocimiento/world-brewers-cup-2026-las-recetas-de-los-6-finalistas-ficha-por-ficha",
    },
  },
  {
    id: "wbrc-2026-ethan-junseong-park",
    competition: "World Brewers Cup",
    year: 2026,
    placement: 5,
    brewer: "Ethan Junseong Park",
    country: "South Korea",
    baseWater: "Water at 60 ppm",
    ingredients: ["Calcium and magnesium"],
    brew: {
      coffee: "14 g",
      water: "200 g",
      temperature: "95°C, then 75°C",
      method: [
        "Pour 50 g at 95°C with the switch closed, then open it.",
        "Add 50 g at 95°C after 30 seconds.",
        "At 1:10, close the switch and add 80 g at 75°C; steep for 40 seconds.",
      ],
    },
    source: {
      label: "Andeo: 2026 WBrC finalists",
      url: "https://andeo.pe/blogs/conocimiento/world-brewers-cup-2026-las-recetas-de-los-6-finalistas-ficha-por-ficha",
    },
  },
  {
    id: "wbrc-2025-george-jinyang-peng",
    competition: "World Brewers Cup",
    year: 2025,
    placement: 1,
    brewer: "George Jinyang Peng",
    country: "China",
    baseWater: "Natural mineral water at 40 ppm",
    ingredients: ["Source mineral composition not published"],
    brew: {
      coffee: "15 g",
      water: "210 g",
      temperature: "96°C, then 80°C",
      method: [
        "Bloom with 30 g at 96°C.",
        "At 0:30, pour 90 g at 96°C.",
        "At 1:10, use a Melodrip to add 90 g at 80°C.",
      ],
    },
    source: {
      label: "BeanBook: 2025 WBrC champion recipe",
      url: "https://beanbook.app/recipes/george-jinyang-peng--temperature-controlled-2025-world-brewers-cup-champion-recip__3d7fce91-1530-4ccf-961d-9cb65c6b9b55",
    },
  },
  {
    id: "wbrc-2024-martin-woelfl",
    competition: "World Brewers Cup",
    year: 2024,
    placement: 1,
    brewer: "Martin Wölfl",
    country: "Austria",
    baseWater: "1 L base water",
    ingredients: ["1 g TONIK", "1.5 g JAMM", "1.5 g LYLAC"],
    brew: {
      coffee: "17 g",
      water: "270 g",
      temperature: "93°C",
      method: [
        "Bloom with 60 g for 40 seconds.",
        "Add 60 g at 0:40, 50 g at 1:20, and 100 g at 2:00.",
      ],
    },
    source: {
      label: "OREA: Martin Wölfl’s WBrC V4 guide",
      url: "https://www.orea.uk/guides-v4",
    },
  },
] as const satisfies readonly PublishedCompetitionRecipe[];

export function clamp(value: number, limits: { min: number; max: number }) {
  return Math.min(limits.max, Math.max(limits.min, value));
}

export function getRecipe(recipeId: string) {
  return RECIPES.find((recipe) => recipe.id === recipeId) ?? RECIPES[0];
}

export function getTeaRecipe(recipeId: string) {
  return TEA_RECIPES.find((recipe) => recipe.id === recipeId) ?? TEA_RECIPES[0];
}

export function calculateMineralAmounts(
  volumeLiters: number,
  gh: number,
  kh: number,
) {
  const bottleAGrams = (volumeLiters * gh) / 50;
  const bottleBGrams = (volumeLiters * kh) / 25;
  return {
    bottleAGrams,
    bottleBGrams,
    bottleADrops: Math.round(bottleAGrams * 20),
    bottleBDrops: Math.round(bottleBGrams * 20),
  };
}

export function formatLiters(volumeLiters: number) {
  return volumeLiters.toFixed(2);
}
