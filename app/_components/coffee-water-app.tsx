"use client";

import { useState } from "react";
import {
  calculateMineralAmounts,
  clamp,
  CUSTOM_GH_LIMITS,
  CUSTOM_KH_LIMITS,
  DEFAULT_RECIPE_ID,
  DEFAULT_VOLUME_LITERS,
  formatLiters,
  getRecipe,
  RECIPES,
  RECIPE_BRANDS,
  PUBLISHED_COMPETITION_RECIPES,
  VOLUME_LIMITS,
  VOLUME_PRESETS,
} from "@/app/_lib/coffee-water";
import { SectionLabel } from "@/app/_components/section-label";

const TABS = [
  { id: "calculator", label: "Calculator" },
  { id: "guide", label: "Preparation" },
  { id: "science", label: "Composition" },
  { id: "competition", label: "Competition" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function CoffeeWaterApp() {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-lm-bg/90 backdrop-blur-md border-b border-lm-border">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:py-4">
            <div className="min-w-0 shrink-0">
              <a href="/">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-lm-muted mb-1">
                  <span>Pug Coffee</span>
                  {/* <span className="text-lm-border">×</span>
                <span>Fear of God</span> */}
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-lm-ink leading-none">
                  Water Calculator
                </h1>
              </a>
            </div>
            <nav
              aria-label="Application sections"
              className="grid grid-cols-2 gap-x-3 gap-y-2 pb-px min-[400px]:flex min-[400px]:flex-nowrap min-[400px]:gap-4 sm:w-auto sm:gap-6"
              role="tablist"
            >
              {TABS.map((tab) => (
                <button
                  aria-controls={`${tab.id}-panel`}
                  aria-selected={activeTab === tab.id}
                  className={`whitespace-nowrap transition-colors ${activeTab === tab.id ? "text-lm-ink lm-tab-active" : "text-lm-muted hover:text-lm-ink"}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  <span className="text-[10px] uppercase tracking-[0.12em] font-medium">
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-6 py-5 sm:py-6">
        {activeTab === "calculator" && <Calculator />}
        {activeTab === "guide" && <PreparationGuide />}
        {activeTab === "science" && <SciencePanel />}
        {activeTab === "competition" && <CompetitionRecipes />}
      </main>
      <footer className="border-t border-lm-border mt-auto">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-lm-muted">
            <span>Pug Coffee</span>
            {/* <span className="text-lm-border">×</span>
            <span>Fear of God</span> */}
          </div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-lm-muted hidden sm:block">
            Copyright © 2026 Pug Coffee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Calculator() {
  const [volume, setVolume] = useState(DEFAULT_VOLUME_LITERS);
  const [volumeInput, setVolumeInput] = useState(
    formatLiters(DEFAULT_VOLUME_LITERS),
  );
  const [recipeId, setRecipeId] = useState(DEFAULT_RECIPE_ID);
  const [customGh, setCustomGh] = useState(60);
  const [customKh, setCustomKh] = useState(25);
  const recipe = getRecipe(recipeId);
  const gh = recipe.id === "custom" ? customGh : recipe.gh;
  const kh = recipe.id === "custom" ? customKh : recipe.kh;
  const amounts = calculateMineralAmounts(volume, gh, kh);
  const updateVolume = (value: number) => {
    const next = clamp(value, VOLUME_LIMITS);
    setVolume(next);
    setVolumeInput(formatLiters(next));
  };
  const commitVolume = () => {
    const next = Number.parseFloat(volumeInput);
    if (Number.isNaN(next)) {
      setVolumeInput(formatLiters(volume));
      return;
    }
    updateVolume(next);
  };

  return (
    <section
      aria-label="Coffee water calculator"
      className="bg-lm-elevated border border-lm-border"
      id="calculator-panel"
      role="tabpanel"
    >
      <div className="p-5 sm:p-6 space-y-5 border-b border-lm-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <SectionLabel>Volume</SectionLabel>
              <div className="flex items-baseline gap-1">
                <input
                  aria-label="Water volume in liters"
                  className="font-display text-2xl tabular-nums leading-none w-[4.5rem] bg-transparent border-b border-lm-border focus:border-lm-ink focus:outline-none text-lm-ink text-right"
                  inputMode="decimal"
                  onBlur={commitVolume}
                  onChange={(event) => setVolumeInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                  type="text"
                  value={volumeInput}
                />
                <span className="text-xs text-lm-muted">L</span>
              </div>
            </div>
            <input
              aria-label="Water volume slider"
              className="lm-range mb-3"
              max={VOLUME_LIMITS.max}
              min={VOLUME_LIMITS.min}
              onChange={(event) => updateVolume(Number(event.target.value))}
              step={VOLUME_LIMITS.step}
              type="range"
              value={volume}
            />
            <div className="flex flex-wrap gap-1.5">
              {VOLUME_PRESETS.map((preset) => (
                <button
                  className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] border transition-colors ${volume === preset ? "bg-lm-ink text-lm-surface border-lm-ink" : "text-lm-muted border-lm-border hover:border-lm-ink hover:text-lm-ink"}`}
                  key={preset}
                  onClick={() => updateVolume(preset)}
                  type="button"
                >
                  {preset === 3.78 ? "1 Gal" : `${preset}L`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel className="mb-2">Profile</SectionLabel>
            <select
              aria-label="Water profile"
              className="lm-select w-full bg-lm-surface border border-lm-border px-3 py-2.5 text-sm text-lm-ink focus:outline-none focus:border-lm-ink transition-colors appearance-none cursor-pointer"
              onChange={(event) => setRecipeId(event.target.value)}
              value={recipeId}
            >
              {RECIPE_BRANDS.map((brand) => (
                <optgroup key={brand} label={brand}>
                  {RECIPES.filter((entry) => entry.brand === brand).map(
                    (entry) => (
                      <option key={entry.id} value={entry.id}>
                        {entry.name} — {entry.gh}/{entry.kh}
                      </option>
                    ),
                  )}
                </optgroup>
              ))}
            </select>
            <p className="text-[10px] uppercase tracking-[0.12em] text-lm-muted mt-2 tabular-nums">
              Target: {gh} GH / {kh} KH
            </p>
          </div>
        </div>
        {recipeId === "custom" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-lm-surface border border-lm-border">
            <RangeControl
              label="GH"
              limits={CUSTOM_GH_LIMITS}
              onChange={setCustomGh}
              value={customGh}
            />
            <RangeControl
              label="KH"
              limits={CUSTOM_KH_LIMITS}
              onChange={setCustomKh}
              value={customKh}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-lm-border border-b border-lm-border">
        <OutputCard
          drops={amounts.bottleADrops}
          grams={amounts.bottleAGrams}
          label="Bottle A"
          name="Hardness · Epsom"
        />
        <OutputCard
          alternate
          drops={amounts.bottleBDrops}
          grams={amounts.bottleBGrams}
          label="Bottle B"
          name="Buffer · Bicarbonate"
        />
      </div>
      <div className="p-5 sm:p-6 space-y-3">
        <p className="text-xs text-lm-muted leading-relaxed">
          {recipe.description}
        </p>
        <p className="text-[11px] text-lm-muted leading-relaxed border-t border-lm-border pt-3">
          <span className="text-lm-ink uppercase tracking-[0.1em] text-[10px]">
            Scale method ·{" "}
          </span>
          Tare kettle with {volume}L ZeroWater, add{" "}
          {amounts.bottleAGrams.toFixed(2)}g Bottle A, tare, add{" "}
          {amounts.bottleBGrams.toFixed(2)}g Bottle B.
        </p>
      </div>
    </section>
  );
}

function RangeControl({
  label,
  limits,
  onChange,
  value,
}: {
  label: string;
  limits: { min: number; max: number };
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-[10px] uppercase tracking-[0.15em] text-lm-muted">
          {label}
        </span>
        <span className="font-display text-2xl tabular-nums">{value}</span>
      </div>
      <input
        aria-label={`Custom ${label}`}
        className="lm-range"
        max={limits.max}
        min={limits.min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
    </div>
  );
}
function OutputCard({
  alternate = false,
  drops,
  grams,
  label,
  name,
}: {
  alternate?: boolean;
  drops: number;
  grams: number;
  label: string;
  name: string;
}) {
  return (
    <div className={`p-5 sm:p-6 ${alternate ? "bg-lm-surface/50" : ""}`}>
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <SectionLabel className="mb-1">{label}</SectionLabel>
          <p className="text-xs text-lm-ink">{name}</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.12em] text-lm-muted tabular-nums">
          {drops} drops
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-5xl sm:text-6xl font-medium tabular-nums tracking-tight leading-none">
          {grams.toFixed(2)}
        </span>
        <span className="text-xs uppercase tracking-[0.12em] text-lm-muted">
          g
        </span>
      </div>
    </div>
  );
}

const INGREDIENTS = [
  { number: "I", title: "ZeroWater", body: "Pure 0 TDS from a fresh filter." },
  {
    number: "II",
    title: "Epsom Salt",
    body: "MgSO₄ · 7H₂O, food grade, fragrance-free.",
  },
  {
    number: "III",
    title: "Baking Soda",
    body: "NaHCO₃, no anti-caking agents.",
  },
] as const;
const BOTTLES = [
  {
    title: "Bottle A — Hardness",
    amount: "12.3 g Epsom",
    steps: [
      "Tare 100 mL bottle to 0.0g.",
      "Add 12.3 g Epsom salt.",
      "Add ~60 g warm ZeroWater (~45°C), shake 30s.",
      "Top up to 100.0 g with cold ZeroWater.",
    ],
  },
  {
    title: "Bottle B — Buffer",
    amount: "4.2 g Soda",
    steps: [
      "Tare 100 mL bottle to 0.0g.",
      "Add 4.2 g Baking Soda.",
      "Add ~60 g room temp ZeroWater, shake.",
      "Top up to 100.0 g with ZeroWater.",
    ],
  },
] as const;

function PreparationGuide() {
  return (
    <section
      aria-label="Preparation guide"
      className="bg-lm-elevated border border-lm-border"
      id="guide-panel"
      role="tabpanel"
    >
      <div className="p-5 sm:p-6 border-b border-lm-border">
        <SectionLabel className="mb-1.5">Preparation</SectionLabel>
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-2">
          Concentrate Formulation
        </h2>
        <p className="text-xs text-lm-muted leading-relaxed">
          Two separate 100 mL concentrates. Keep bottles apart until dilution in
          your kettle.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-lm-border border-b border-lm-border">
        {INGREDIENTS.map((ingredient) => (
          <div className="p-4 sm:p-5" key={ingredient.number}>
            <span className="font-display text-xl text-lm-highlight">
              {ingredient.number}
            </span>
            <h3 className="text-[10px] uppercase tracking-[0.15em] mt-2 mb-1.5">
              {ingredient.title}
            </h3>
            <p className="text-xs text-lm-muted leading-relaxed">
              {ingredient.body}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-lm-border border-b border-lm-border">
        {BOTTLES.map((bottle, index) => (
          <div
            className={`p-5 sm:p-6 ${index === 1 ? "bg-lm-surface/50" : ""}`}
            key={bottle.title}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-[0.15em]">
                {bottle.title}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.12em] text-lm-muted">
                {bottle.amount}
              </span>
            </div>
            <ol className="space-y-2">
              {bottle.steps.map((step, stepIndex) => (
                <li
                  className="flex gap-3 text-xs text-lm-muted leading-relaxed"
                  key={step}
                >
                  <span className="font-display text-base text-lm-highlight shrink-0 w-4">
                    {stepIndex + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <div className="p-5 sm:p-6 border-l-2 border-lm-ink ml-5 sm:ml-6 my-5 sm:my-6 mr-5 sm:mr-6">
        <p className="text-[10px] uppercase tracking-[0.15em] text-lm-muted mb-1">
          Critical
        </p>
        <p className="text-sm text-lm-ink leading-snug">
          Never combine Epsom salt and baking soda in one concentrate — they
          form MgCO₃ chalk.
        </p>
      </div>
    </section>
  );
}

function CompetitionRecipes() {
  return (
    <section
      aria-label="Published competition water recipes"
      className="bg-lm-elevated border border-lm-border"
      id="competition-panel"
      role="tabpanel"
    >
      <div className="p-5 sm:p-6 border-b border-lm-border">
        <SectionLabel className="mb-1.5">Competition recipes</SectionLabel>
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-2">
          World Brewers Cup · Published Finalist Recipes
        </h2>
        <p className="text-xs text-lm-muted leading-relaxed">
          Complete published finalist recipes from the past three years. Mineral
          amounts are shown only when their source discloses them; no formulas
          are inferred.
        </p>
      </div>
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {PUBLISHED_COMPETITION_RECIPES.map((recipe) => (
          <article
            className="border border-lm-border bg-lm-surface p-4 sm:p-5"
            key={recipe.id}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
              <h3 className="text-sm font-medium text-lm-ink">
                {recipe.brewer} · {recipe.country}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.12em] text-lm-muted">
                {recipe.competition} {recipe.year} · #{recipe.placement}
              </p>
            </div>
            <p className="text-xs text-lm-muted leading-relaxed">
              Start with {recipe.baseWater}, then add{" "}
              {recipe.ingredients.join(", ")}.
            </p>
            <dl className="grid grid-cols-3 gap-2 mt-4 text-xs text-lm-muted">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em]">
                  Coffee
                </dt>
                <dd className="mt-1 text-lm-ink">{recipe.brew.coffee}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em]">
                  Water
                </dt>
                <dd className="mt-1 text-lm-ink">{recipe.brew.water}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.12em]">
                  Temperature
                </dt>
                <dd className="mt-1 text-lm-ink">{recipe.brew.temperature}</dd>
              </div>
            </dl>
            <ol className="mt-4 space-y-1.5 border-t border-lm-border pt-3">
              {recipe.brew.method.map((step, index) => (
                <li
                  className="flex gap-2 text-xs text-lm-muted leading-relaxed"
                  key={step}
                >
                  <span className="font-display text-lm-highlight">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              className="inline-block mt-3 text-[10px] uppercase tracking-[0.12em] text-lm-ink underline underline-offset-4"
              href={recipe.source.url}
              rel="noreferrer"
              target="_blank"
            >
              Source: {recipe.source.label}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

const MINERALS = [
  {
    abbreviation: "GH",
    label: "Hardness",
    title: "Magnesium (Mg²⁺)",
    content: (
      <>
        Multivalent cations — primarily magnesium via MgSO₄. Binds to volatile
        acids and fruit sugars,{" "}
        <strong>enhancing sweetness and vibrancy</strong>.
      </>
    ),
  },
  {
    abbreviation: "KH",
    label: "Buffer",
    title: "Bicarbonate (HCO₃⁻)",
    content: (
      <>
        Neutralizes organic acids in the cup via NaHCO₃. Higher KH{" "}
        <strong>smooths sourness and adds body</strong>; lower KH preserves
        crisp acidity.
      </>
    ),
  },
] as const;
function SciencePanel() {
  return (
    <section
      aria-label="Coffee water composition"
      className="bg-lm-elevated border border-lm-border divide-y divide-lm-border"
      id="science-panel"
      role="tabpanel"
    >
      <div className="p-5 sm:p-6">
        <SectionLabel className="mb-1.5">Composition</SectionLabel>
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-2">
          Water &amp; Extraction
        </h2>
        <p className="text-xs text-lm-muted leading-relaxed">
          How GH and KH shape flavor during extraction.
        </p>
      </div>
      {MINERALS.map((mineral, index) => (
        <article
          className={`grid grid-cols-1 sm:grid-cols-[72px_1fr] gap-4 sm:gap-6 p-5 sm:p-6 ${index === 1 ? "bg-lm-surface/50" : ""}`}
          key={mineral.abbreviation}
        >
          <div>
            <p className="font-display text-3xl text-lm-highlight leading-none">
              {mineral.abbreviation}
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-lm-muted mt-1">
              {mineral.label}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.15em]">
              {mineral.title}
            </h3>
            <p className="text-xs text-lm-muted leading-relaxed">
              {mineral.content}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
