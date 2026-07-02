// Article content for /resources. Block-based so all articles share one
// renderer and consistent styling. Dollar figures must stay consistent with
// the Medicare page (see components/medicare/MedicareCosts.tsx).
export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; title: string; text: string }

export interface Article {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: 'Medicare' | 'Health Insurance' | 'Retirement' | 'Life Insurance'
  datePublished: string
  readMinutes: number
  blocks: ArticleBlock[]
  related: { label: string; href: string }[]
}

export const articles: Article[] = [
  {
    slug: 'medicare-advantage-vs-medicare-supplement-mississippi',
    title: 'Medicare Advantage vs. Medicare Supplement in Mississippi: Which Is Right for You?',
    metaTitle: 'Medicare Advantage vs. Supplement in Mississippi',
    metaDescription:
      'The honest differences between Medicare Advantage and Medicare Supplement (Medigap) plans for Mississippi residents: costs, networks, drug coverage, and how to choose. Free local help: (662) 200-2249.',
    excerpt:
      'The two main ways to cover the gaps in Original Medicare work very differently, especially in rural Mississippi. Here is the plain-English comparison we walk clients through every week.',
    category: 'Medicare',
    datePublished: '2026-07-02',
    readMinutes: 7,
    blocks: [
      {
        type: 'p',
        text: 'If you are approaching 65 in Mississippi, or reviewing your coverage during Annual Enrollment, you will face one big fork in the road: add a Medicare Supplement (Medigap) plan to Original Medicare, or replace Original Medicare’s delivery with a Medicare Advantage plan. Both are legitimate choices. They just fit different people, and the right answer in Pontotoc or Tupelo is not always the same as the right answer in a big city.',
      },
      { type: 'h2', text: 'The 60-second version' },
      {
        type: 'ul',
        items: [
          'Medicare Advantage (Part C): usually low or $0 monthly plan premium, often includes drug, dental, and vision coverage, but you use the plan’s network and pay copays as you go.',
          'Medicare Supplement (Medigap): a higher monthly premium, but it pays most of what Original Medicare doesn’t, and you can see any doctor in the country who accepts Medicare. Drug coverage (Part D) is purchased separately.',
          'Either way, you keep paying your Part B premium ($202.90 per month for most people in 2026).',
        ],
      },
      { type: 'h2', text: 'How each one actually works' },
      {
        type: 'p',
        text: 'With Original Medicare plus a Supplement, Medicare pays first and your Medigap plan picks up most of the rest, like the Part A hospital deductible ($1,736 per benefit period in 2026) and your 20% coinsurance on doctor visits. The most popular plan for new enrollees, Plan G, covers essentially everything except the small Part B deductible ($283 per year in 2026). Your costs are predictable: a fixed premium, and very little else.',
      },
      {
        type: 'p',
        text: 'With Medicare Advantage, a private insurance company delivers your Part A and B benefits. Premiums are low, and most plans bundle in a drug plan plus extras like dental and vision. In exchange, you pay copays and coinsurance as you use care, up to an annual out-of-pocket maximum, and the plan’s provider network and prior-authorization rules apply.',
      },
      { type: 'h2', text: 'The network question matters more in Mississippi' },
      {
        type: 'p',
        text: 'This is the part national articles skip. Provider networks are thinner in rural areas, and in North Mississippi the difference between a plan that includes your local hospital and clinic and one that doesn’t is the whole ballgame. Before we recommend any Advantage plan to a client in Pontotoc, Tupelo, New Albany, or Corinth, we check their specific doctors, their preferred hospital, and their pharmacy against that plan’s network. A Supplement sidesteps the issue entirely: if a provider takes Medicare, they take your Medigap plan.',
      },
      { type: 'h2', text: 'Cost: premium now vs. costs later' },
      {
        type: 'p',
        text: 'Think of it as choosing where your money goes. A Supplement front-loads cost into a predictable monthly premium and protects you from big bills later. Advantage keeps monthly costs low and charges you when you use care, which is a great deal in healthy years and a more expensive one in the years you need treatment. Neither is automatically cheaper over a lifetime; it depends on your health, your budget, and your tolerance for surprise bills.',
      },
      {
        type: 'callout',
        title: 'The one-way door most people miss',
        text: 'When you first get Part B, you have a 6-month window to buy any Medigap plan with no health questions. After that window, in most cases, switching from Advantage to a Supplement means passing medical underwriting, and you can be declined for health reasons. Choosing Advantage now does not always leave the Supplement door open later. This is the single most important thing to understand before you decide.',
      },
      { type: 'h2', text: 'Who tends to choose which' },
      {
        type: 'ul',
        items: [
          'Frequent travelers, snowbirds, and people who want any-doctor freedom usually lean Supplement.',
          'People managing serious or chronic conditions often prefer the predictability of a Supplement.',
          'Budget-focused, generally healthy people who use local in-network providers often do well with Advantage.',
          'People who want dental, vision, and drug coverage bundled into one card often lean Advantage.',
        ],
      },
      { type: 'h2', text: 'How to decide without guessing' },
      {
        type: 'p',
        text: 'Write down three lists: your doctors, your prescriptions with dosages, and your monthly budget for premiums. Those three lists, checked against the actual plans available in your Mississippi county, answer this question far better than any article can. That check is exactly what we do for clients, for free, and if what you already have is the best fit, we will tell you so.',
      },
    ],
    related: [
      { label: 'Our Medicare services', href: '/medicare' },
      { label: 'Watch: How Medicare is changing in 2026', href: '/webinarlink' },
      { label: 'Talk to a local advisor', href: '/contact' },
    ],
  },
  {
    slug: 'how-much-does-health-insurance-cost-mississippi',
    title: 'How Much Does Health Insurance Cost in Mississippi in 2026?',
    metaTitle: 'Health Insurance Cost in Mississippi (2026)',
    metaDescription:
      'What actually drives health insurance prices in Mississippi: age, income, subsidies, and plan tiers, plus how families routinely pay far less than the sticker price. Free quotes: (662) 200-2249.',
    excerpt:
      'The sticker price and what Mississippians actually pay are two very different numbers. Here is how premiums really work, and the subsidy check most people skip.',
    category: 'Health Insurance',
    datePublished: '2026-07-02',
    readMinutes: 6,
    blocks: [
      {
        type: 'p',
        text: 'Ask what health insurance costs in Mississippi and you will get answers ranging from “free” to “more than my truck payment.” Both can be true. The honest answer is that your price depends on a handful of factors, and one of them, your household income, matters more than all the others combined.',
      },
      { type: 'h2', text: 'What actually sets your premium' },
      {
        type: 'ul',
        items: [
          'Age: premiums rise as you get older, with the steepest climb in your 50s and early 60s.',
          'Household size and income: this determines your premium tax credit, which can cut hundreds of dollars a month off the sticker price.',
          'Tobacco use: Mississippi insurers can charge tobacco users significantly more.',
          'County: available insurers and plans vary across Mississippi, so Pontotoc County options differ from DeSoto or Jackson County.',
          'Plan tier: Bronze, Silver, and Gold tiers trade monthly premium against deductibles and copays.',
        ],
      },
      { type: 'h2', text: 'The subsidy most people never check' },
      {
        type: 'p',
        text: 'Marketplace premium tax credits are the reason sticker prices mislead. They are based on your income and family size, not your assets, and they phase down gradually rather than cutting off at a cliff. Many working Mississippi families qualify for substantial help, and lower-income households frequently qualify for plans with little to no monthly premium after the credit. Farmers, contractors, and other self-employed people are the group we most often find leaving subsidy money on the table, usually because they assumed they earned too much to qualify.',
      },
      {
        type: 'callout',
        title: 'Rule of thumb',
        text: 'Never judge a plan by its full price. Until you have run your household income through a subsidy check, you do not actually know what health insurance costs you. The check takes minutes and we do it free.',
      },
      { type: 'h2', text: 'Picking a tier: premium vs. deductible' },
      {
        type: 'p',
        text: 'A Bronze plan keeps monthly costs low but carries a high deductible, which suits people who rarely see a doctor and mainly want protection from catastrophe. Gold plans cost more monthly and cover more from dollar one, which can win for families with regular prescriptions or ongoing care. Silver sits in between, and for lower-income households Silver plans can come with extra cost-sharing reductions that quietly make them the best value on the shelf. The cheapest premium is often not the cheapest plan once you count the care you will actually use.',
      },
      { type: 'h2', text: 'One more thing that matters in Mississippi: the network' },
      {
        type: 'p',
        text: 'A cheap plan whose nearest in-network hospital is an hour away is not cheap. Before enrolling, confirm your local clinic, hospital, and pharmacy are in network. This is a two-minute check that saves rural Mississippi families real money and real headaches, and it is part of every quote we run.',
      },
      { type: 'h2', text: 'What to do next' },
      {
        type: 'p',
        text: 'Gather three numbers: your expected household income for the year, the number of people in your household, and your ZIP code. With those, a licensed advisor can show you every plan available in your county with your actual subsidized price, not the sticker price. It costs nothing to look, and open enrollment is not the only chance: job changes, moves, marriages, and new babies all open special enrollment windows during the year.',
      },
    ],
    related: [
      { label: 'Our health insurance services', href: '/health' },
      { label: 'Get a free quote', href: '/contact' },
      { label: 'Areas we serve', href: '/locations' },
    ],
  },
  {
    slug: 'turning-65-mississippi-medicare-checklist',
    title: 'Turning 65 in Mississippi: Your Complete Medicare Checklist',
    metaTitle: 'Turning 65 in Mississippi: Medicare Checklist',
    metaDescription:
      'A step-by-step Medicare enrollment checklist for Mississippians turning 65: your 7-month window, the still-working exception, penalties to avoid, and what to decide when. Free help: (662) 200-2249.',
    excerpt:
      'Your Medicare window opens 3 months before your 65th birthday and the penalties for missing it are permanent. Here is exactly what to do, and when, in plain English.',
    category: 'Medicare',
    datePublished: '2026-07-02',
    readMinutes: 8,
    blocks: [
      {
        type: 'p',
        text: 'Medicare has a reputation for being confusing, but the timeline itself is simple once someone lays it out. Here is the checklist we walk North Mississippi clients through, organized by when each step needs to happen.',
      },
      { type: 'h2', text: 'Know your window: the 7-month rule' },
      {
        type: 'p',
        text: 'Your Initial Enrollment Period runs 7 months: the 3 months before your birthday month, your birthday month, and the 3 months after. Enroll in the 3 months before your birthday and coverage starts the first day of your birthday month, which is the smoothest path. Wait until later in the window and your start date slips.',
      },
      { type: 'h2', text: '6 months out: get your bearings' },
      {
        type: 'ul',
        items: [
          'Confirm you have a my Social Security account at ssa.gov; you will use it to enroll.',
          'Learn the four parts: A (hospital), B (medical), C (Medicare Advantage), D (prescription drugs).',
          'Start a list of your doctors, your pharmacy, and every prescription with dosage. This list drives every good decision later.',
          'If you are still working, find out whether your employer has 20 or more employees; it changes your whole timeline (see below).',
        ],
      },
      { type: 'h2', text: '3 months out: enroll in A and B' },
      {
        type: 'ul',
        items: [
          'Apply online at ssa.gov, by phone, or at a Social Security office. If you already receive Social Security benefits, enrollment in A and B is automatic and your card arrives in the mail.',
          'Most people pay nothing for Part A. Part B costs $202.90 per month for most enrollees in 2026, deducted from Social Security if you receive it.',
          'Higher incomes pay more for Part B via IRMAA, based on your tax return from two years prior.',
        ],
      },
      { type: 'h2', text: 'Same window: make the real decision' },
      {
        type: 'p',
        text: 'Parts A and B alone leave real gaps: deductibles, 20% coinsurance with no cap, and no drug coverage. During this same window, choose your path: Original Medicare plus a Medicare Supplement and a standalone Part D drug plan, or a Medicare Advantage plan that bundles it together. Your 6-month Medigap open enrollment, the only time you can buy any Supplement with no health questions, starts when your Part B takes effect. Do not let it pass unexamined.',
      },
      {
        type: 'callout',
        title: 'The penalties are permanent',
        text: 'Skip Part B without creditable employer coverage and your premium goes up 10% for each 12-month period you delayed, for life. Skip drug coverage and Part D adds a penalty of 1% of the national base premium per month you went without, also permanent. The fix is simple: enroll on time, or make sure your employer coverage counts as creditable.',
      },
      { type: 'h2', text: 'Still working at 65? Read this first' },
      {
        type: 'p',
        text: 'If you (or your spouse) are actively working and covered by an employer plan from a company with 20 or more employees, you can usually delay Part B and drug coverage without penalty, and enroll later through a Special Enrollment Period when the job or coverage ends. Many people in this situation still take free Part A. If the employer has fewer than 20 employees, Medicare generally needs to become your primary coverage at 65, so do not delay. When in doubt, confirm with HR whether your coverage is creditable, and get it in writing.',
      },
      { type: 'h2', text: 'After you enroll: two habits' },
      {
        type: 'ul',
        items: [
          'Watch the mail for your card and set up your Medicare.gov account.',
          'Review your plan every fall during Annual Enrollment (October 15 to December 7). Networks, drug lists, and premiums change every year even when your health doesn’t. A 20-minute annual review is the cheapest insurance there is.',
        ],
      },
      { type: 'h2', text: 'You do not have to do this alone' },
      {
        type: 'p',
        text: 'Every step above, from the enrollment paperwork to comparing every plan available in your Mississippi county, is something a licensed local advisor can do with you at no cost. We help people across Pontotoc, Tupelo, Oxford, and all of North Mississippi through this exact checklist every week.',
      },
    ],
    related: [
      { label: 'Our Medicare services', href: '/medicare' },
      { label: 'Watch: How Medicare is changing in 2026', href: '/webinarlink' },
      { label: 'Schedule a free consultation', href: '/contact' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
