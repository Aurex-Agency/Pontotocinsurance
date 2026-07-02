// City landing page content. Each city gets genuinely distinct copy (intro,
// service angles, FAQs) so pages are useful local content, not doorway pages.
export interface CityLocation {
  slug: string
  name: string
  county: string
  headline: string
  subheadline: string
  intro: string[]
  services: {
    title: string
    href: string
    description: string
  }[]
  faqs: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
}

export const locations: CityLocation[] = [
  {
    slug: 'tupelo',
    name: 'Tupelo',
    county: 'Lee County',
    headline: 'Insurance & Medicare Advisors Serving Tupelo, MS',
    subheadline:
      'Life insurance, health insurance, Medicare, and retirement planning for Tupelo and Lee County, from your neighbors in Pontotoc.',
    intro: [
      'Tupelo is the hub of North Mississippi, and a large share of the families we serve live and work in Lee County. Our office in Pontotoc is a short drive west on Highway 6, and we meet Tupelo clients in person, by phone, or over video, whichever is easiest for you.',
      "Whether you're comparing Medicare plans as you approach 65, looking for individual or family health coverage, or protecting your family with life insurance, you'll work with a licensed Mississippi advisor who knows the local hospitals, networks, and carriers that matter in the Tupelo area, including plans accepted by North Mississippi Medical Center and other regional providers.",
    ],
    services: [
      {
        title: 'Medicare in Tupelo',
        href: '/medicare',
        description:
          'Compare Medicare Advantage, Medicare Supplement (Medigap), and Part D drug plans available in Lee County, with local network guidance.',
      },
      {
        title: 'Health Insurance in Tupelo',
        href: '/health',
        description:
          'Individual, family, and group health plans for Tupelo workers, small businesses, and the self-employed, including marketplace enrollment help.',
      },
      {
        title: 'Life Insurance in Tupelo',
        href: '/life',
        description:
          'Term, whole, and universal life insurance to protect Tupelo families, with coverage amounts sized to your mortgage, income, and goals.',
      },
      {
        title: 'Retirement Planning in Tupelo',
        href: '/retirement',
        description:
          'Annuities, 401(k) rollovers, and retirement income strategies for Lee County residents planning their next chapter.',
      },
    ],
    faqs: [
      {
        question: 'Do you meet with clients in Tupelo?',
        answer:
          'Yes. Our office is in Pontotoc, about 20 minutes west of Tupelo on Highway 6, and we regularly serve Tupelo and Lee County clients in person, by phone, and by video. We can also come to you for scheduled appointments.',
      },
      {
        question: 'Can you help me find Medicare plans that work with Tupelo doctors and hospitals?',
        answer:
          'Yes. Network coverage is one of the most important parts of choosing a Medicare Advantage or Supplement plan. We help Lee County clients confirm their doctors, preferred hospital, and prescriptions are covered before they enroll.',
      },
      {
        question: 'Is there a cost to work with your agency?',
        answer:
          'No. Our guidance is free. We are paid by the insurance carriers when you enroll, and your premium is the same whether you use an advisor or not, so you get local, licensed help at no extra cost.',
      },
      {
        question: 'Which areas around Tupelo do you serve?',
        answer:
          'We serve all of Lee County, including Saltillo, Guntown, Verona, and Plantersville, along with the rest of North Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Tupelo, MS',
    metaDescription:
      'Licensed insurance and Medicare advisors serving Tupelo and Lee County, MS. Compare life, health, Medicare, and retirement options with free local guidance. Call (662) 200-2249.',
  },
  {
    slug: 'oxford',
    name: 'Oxford',
    county: 'Lafayette County',
    headline: 'Insurance & Medicare Advisors Serving Oxford, MS',
    subheadline:
      'Independent insurance guidance for Oxford and Lafayette County: life, health, Medicare, and retirement planning.',
    intro: [
      "Oxford is one of the fastest-growing communities in North Mississippi, home to the University of Mississippi, a thriving retiree population, and plenty of young families. That mix creates very different insurance needs, and we've helped with all of them.",
      "If you're retiring to Oxford and need to move your Medicare coverage to Mississippi, transitioning off university or employer benefits, or buying life insurance to protect a growing family, our licensed advisors will compare options across carriers and explain them in plain English. We serve Oxford from our Pontotoc office, about 30 minutes east on Highway 6, with in-person, phone, and video appointments.",
    ],
    services: [
      {
        title: 'Medicare in Oxford',
        href: '/medicare',
        description:
          "Medicare Advantage, Medigap, and Part D guidance for Lafayette County, including retirees who are new to Mississippi and need to re-shop their coverage.",
      },
      {
        title: 'Health Insurance in Oxford',
        href: '/health',
        description:
          'Marketplace and private health plans for Oxford families, graduate students aging off parental plans, and self-employed professionals.',
      },
      {
        title: 'Life Insurance in Oxford',
        href: '/life',
        description:
          'Term and permanent life insurance for Oxford families and professionals, from starter policies to estate planning strategies.',
      },
      {
        title: 'Retirement Planning in Oxford',
        href: '/retirement',
        description:
          'Annuities, 403(b) and 401(k) rollovers, and income planning for Oxford retirees and those approaching retirement.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with clients in Oxford?',
        answer:
          'Yes. We serve Oxford and Lafayette County from our Pontotoc office, about 30 minutes east on Highway 6. Most Oxford clients start with a phone or video call, and we schedule in-person meetings whenever needed.',
      },
      {
        question: "I'm retiring to Oxford from another state. Do I need to change my Medicare plan?",
        answer:
          'Usually, yes. Medicare Advantage and Part D plans are tied to your county, so moving to Lafayette County gives you a Special Enrollment Period to pick a new plan. We help new Oxford residents compare local options and confirm their doctors are in network.',
      },
      {
        question: 'Can you help university employees plan for retirement?',
        answer:
          'Yes. We regularly help people transition from employer benefits into Medicare and roll retirement accounts such as 403(b) or 401(k) plans into income-producing options like annuities, coordinated with your retirement date.',
      },
      {
        question: 'Which areas around Oxford do you serve?',
        answer:
          'We serve all of Lafayette County, including Abbeville, Taylor, and the surrounding communities, plus the rest of North Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Oxford, MS',
    metaDescription:
      'Independent insurance and Medicare advisors serving Oxford and Lafayette County, MS. Life, health, Medicare, and retirement help for families, retirees, and university employees. Call (662) 200-2249.',
  },
  {
    slug: 'new-albany',
    name: 'New Albany',
    county: 'Union County',
    headline: 'Insurance & Medicare Advisors Serving New Albany, MS',
    subheadline:
      'Hometown insurance help for New Albany and Union County: life, health, Medicare, and retirement planning.',
    intro: [
      "New Albany is just up the road from us, about 20 minutes north of Pontotoc along the same Tanglefoot Trail corridor. Union County families, farmers, and small business owners have been part of our client base since the beginning, and we treat New Albany like the neighbor it is.",
      "From Medicare enrollment and plan reviews to affordable term life insurance and health coverage for the self-employed, you'll get straight answers from a licensed Mississippi advisor, without the 1-800-number runaround. Meet us in person, by phone, or by video.",
    ],
    services: [
      {
        title: 'Medicare in New Albany',
        href: '/medicare',
        description:
          'Side-by-side comparisons of Medicare Advantage, Medigap, and Part D plans available in Union County, with annual reviews so your plan keeps fitting.',
      },
      {
        title: 'Health Insurance in New Albany',
        href: '/health',
        description:
          'Individual and family health plans for New Albany workers, farmers, and small businesses, including HSA-compatible options.',
      },
      {
        title: 'Life Insurance in New Albany',
        href: '/life',
        description:
          'Term, whole, and universal life coverage to protect Union County families, homes, and farms for the next generation.',
      },
      {
        title: 'Retirement Planning in New Albany',
        href: '/retirement',
        description:
          'Annuities, IRA and 401(k) rollovers, and Social Security timing guidance for Union County residents.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve New Albany and Union County?',
        answer:
          'Yes. Our Pontotoc office is about 20 minutes south of New Albany, and we serve Union County clients in person, by phone, and by video, including scheduled visits to you.',
      },
      {
        question: 'Can you review the Medicare plan I already have?',
        answer:
          'Absolutely. Plans change their networks, drug lists, and benefits every year. We offer free annual reviews for Union County clients, and if your current plan is still the best fit, we will tell you so.',
      },
      {
        question: 'I farm or work for myself. What are my health insurance options?',
        answer:
          'Self-employed New Albany residents typically choose between marketplace plans (often with premium tax credits) and private coverage. We compare both and help you avoid plans with networks too thin to use locally.',
      },
      {
        question: 'Which areas around New Albany do you serve?',
        answer:
          'We serve all of Union County, including Myrtle, Blue Springs, and Ingomar, along with the rest of North Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in New Albany, MS',
    metaDescription:
      'Local insurance and Medicare advisors serving New Albany and Union County, MS. Life, health, Medicare, and retirement guidance from licensed Mississippi agents. Call (662) 200-2249.',
  },
  {
    slug: 'pontotoc',
    name: 'Pontotoc',
    county: 'Pontotoc County',
    headline: 'Your Hometown Insurance Agency in Pontotoc, MS',
    subheadline:
      'Life insurance, health insurance, Medicare, and retirement planning from our office right here on Highway 15 in Pontotoc.',
    intro: [
      "Pontotoc is home. Our office sits at 158 MS-15, Suite D, and the families we help here are our neighbors: the people we see around the square, on the Tanglefoot Trail, and at ball games on Friday night. When you call, you get a local advisor who answers to you, not a call center.",
      "Stop by for a free, no-pressure review of your life insurance, health coverage, Medicare options, or retirement plan. Walk-ins are welcome during office hours, and we're happy to schedule evenings when work gets in the way.",
    ],
    services: [
      {
        title: 'Medicare in Pontotoc',
        href: '/medicare',
        description:
          'Turning 65 in Pontotoc County? We compare every Medicare Advantage, Medigap, and Part D option available here and handle the enrollment paperwork with you.',
      },
      {
        title: 'Health Insurance in Pontotoc',
        href: '/health',
        description:
          'Individual, family, and small-group health plans for Pontotoc households, farms, and businesses, including marketplace subsidy help.',
      },
      {
        title: 'Life Insurance in Pontotoc',
        href: '/life',
        description:
          'Term, whole, and universal life policies to protect Pontotoc families, sized to your mortgage, income, and what you want to leave behind.',
      },
      {
        title: 'Retirement Planning in Pontotoc',
        href: '/retirement',
        description:
          'Annuities, 401(k) and IRA rollovers, and Social Security timing, planned face-to-face with an advisor you can visit any time.',
      },
    ],
    faqs: [
      {
        question: 'Can I just walk into your Pontotoc office?',
        answer:
          "Yes. We're at 158 MS-15, Suite D in Pontotoc, and walk-ins are welcome during office hours: Monday through Friday 8:00 AM to 6:00 PM and Saturday 9:00 AM to 2:00 PM. If you want a specific advisor, calling ahead at (662) 200-2249 guarantees they're in.",
      },
      {
        question: 'Do you only sell one company’s insurance?',
        answer:
          'No. We are an independent agency, which means we compare plans from multiple carriers and recommend what fits you, not a quota. If your best option is staying right where you are, we will tell you that too.',
      },
      {
        question: 'What should I bring to a Medicare appointment?',
        answer:
          'Bring your Medicare card (or your eligibility letter), a list of your doctors, and your prescriptions with dosages. With those three things we can check networks and drug coverage on the spot and show you real costs, not estimates.',
      },
      {
        question: 'Which nearby communities do you serve from the Pontotoc office?',
        answer:
          'All of Pontotoc County, including Ecru, Sherman, Thaxton, Algoma, and Toccopola, plus the surrounding counties across North Mississippi.',
      },
    ],
    metaTitle: 'Insurance Agency in Pontotoc, MS | Local Office on Hwy 15',
    metaDescription:
      'Visit Pontotoc Insurance Agency at 158 MS-15, Suite D in Pontotoc, MS. Life, health, Medicare, and retirement planning from local licensed advisors. Walk-ins welcome. (662) 200-2249.',
  },
  {
    slug: 'southaven',
    name: 'Southaven',
    county: 'DeSoto County',
    headline: 'Insurance & Medicare Advisors Serving Southaven, MS',
    subheadline:
      'Life, health, Medicare, and retirement planning for Southaven and DeSoto County, with Mississippi-licensed advisors who know both sides of the state line.',
    intro: [
      "Southaven sits in one of the fastest-growing corners of Mississippi, and living in the Memphis metro creates insurance questions most agents don't deal with: you may work in Tennessee, see doctors in Memphis, and still need Mississippi-based coverage because of where you live. We help DeSoto County families sort that out every day.",
      "Because your health and Medicare plans are tied to your Mississippi residence, not where you work, choosing coverage that includes the Memphis-area providers you actually use takes local knowledge. Our licensed Mississippi advisors serve Southaven by phone and video, with in-person appointments available, and we handle enrollment start to finish.",
    ],
    services: [
      {
        title: 'Medicare in Southaven',
        href: '/medicare',
        description:
          'Medicare Advantage, Medigap, and Part D comparisons for DeSoto County, with careful network checks for the Memphis-area hospitals and doctors many Southaven residents use.',
      },
      {
        title: 'Health Insurance in Southaven',
        href: '/health',
        description:
          'Marketplace and private health plans for Southaven families and the self-employed, matched to networks that work in the metro area.',
      },
      {
        title: 'Life Insurance in Southaven',
        href: '/life',
        description:
          'Term, whole, and universal life coverage for DeSoto County families, from first policies to estate planning.',
      },
      {
        title: 'Retirement Planning in Southaven',
        href: '/retirement',
        description:
          'Annuities, 401(k) rollovers, and retirement income planning for Southaven residents approaching or already in retirement.',
      },
    ],
    faqs: [
      {
        question: 'I live in Southaven but work in Memphis. Which state do I buy insurance in?',
        answer:
          'Your individual health insurance and Medicare plans are based on where you live, so as a Southaven resident you enroll in Mississippi plans for DeSoto County. The key is picking a plan whose network includes the Tennessee providers you use. We check that before you enroll.',
      },
      {
        question: 'Can my Medicare plan cover doctors and hospitals in Memphis?',
        answer:
          'Often, yes. Many DeSoto County Medicare Advantage plans include Memphis-area providers in network, and Medicare Supplement plans work with any provider that accepts Medicare nationwide. We compare both approaches for your specific doctors.',
      },
      {
        question: 'How do you serve Southaven from Pontotoc?',
        answer:
          'Most Southaven clients work with us by phone and video, which covers everything from quotes to enrollment. We also schedule in-person appointments in DeSoto County, and you are always welcome at our Pontotoc office.',
      },
      {
        question: 'Which areas around Southaven do you serve?',
        answer:
          'All of DeSoto County, including Horn Lake, Olive Branch, Hernando, and Walls, plus the rest of North Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Southaven, MS',
    metaDescription:
      'Licensed Mississippi insurance and Medicare advisors serving Southaven and DeSoto County. Plans checked against the Memphis-area doctors you actually use. Call (662) 200-2249.',
  },
  {
    slug: 'amory',
    name: 'Amory',
    county: 'Monroe County',
    headline: 'Insurance & Medicare Advisors Serving Amory, MS',
    subheadline:
      'Hometown-style insurance help for Amory and Monroe County: life, health, Medicare, and retirement planning.',
    intro: [
      "Amory is the kind of town where people still expect to know the folks they do business with, and that's exactly how we work. From our office in Pontotoc, about an hour up the road, we serve Monroe County families with the same sit-down, plain-English service they'd expect from an agent on Main Street.",
      "Whether you're comparing Medicare plans, covering a family on a working budget, or protecting a home and land with life insurance, a licensed Mississippi advisor will walk you through every option by phone, video, or an in-person visit.",
    ],
    services: [
      {
        title: 'Medicare in Amory',
        href: '/medicare',
        description:
          'Side-by-side Medicare Advantage, Medigap, and Part D comparisons for Monroe County, with network checks for the local providers you rely on.',
      },
      {
        title: 'Health Insurance in Amory',
        href: '/health',
        description:
          'Affordable individual and family health plans for Amory workers, farmers, and small businesses, including subsidy-eligible marketplace options.',
      },
      {
        title: 'Life Insurance in Amory',
        href: '/life',
        description:
          'Term, whole, and universal life insurance to protect Monroe County families, homes, and farmland for the next generation.',
      },
      {
        title: 'Retirement Planning in Amory',
        href: '/retirement',
        description:
          'Annuities, IRA and 401(k) rollovers, and Social Security timing for Amory residents planning retirement.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve Amory and Monroe County?',
        answer:
          'Yes. We serve all of Monroe County from our Pontotoc office, about an hour away. Most Amory clients start with a phone or video visit, and we schedule in-person appointments in Monroe County when needed.',
      },
      {
        question: 'Can you review the coverage I bought somewhere else?',
        answer:
          'Absolutely, and it costs nothing. We regularly review policies and Medicare plans people bought online or from a call center, and we will give you a straight answer about whether it still fits, even if the answer is to keep what you have.',
      },
      {
        question: 'What Medicare help do you offer Amory residents?',
        answer:
          'Everything from your first enrollment at 65 to annual plan reviews: comparing Medicare Advantage and Supplement options in Monroe County, checking your doctors and prescriptions, and handling the paperwork with you.',
      },
      {
        question: 'Which areas around Amory do you serve?',
        answer:
          'All of Monroe County, including Aberdeen, Smithville, Nettleton, and Hatley, along with the rest of North Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Amory, MS',
    metaDescription:
      'Insurance and Medicare advisors serving Amory and Monroe County, MS. Life, health, Medicare, and retirement guidance from licensed Mississippi agents. Call (662) 200-2249.',
  },
  {
    slug: 'corinth',
    name: 'Corinth',
    county: 'Alcorn County',
    headline: 'Insurance & Medicare Advisors Serving Corinth, MS',
    subheadline:
      'Life, health, Medicare, and retirement planning for Corinth and Alcorn County, up in the far northeast corner of the state.',
    intro: [
      "Corinth sits right at the Tennessee line, and that border-town reality shapes insurance decisions: some families see doctors in Corinth, others cross into Tennessee for care, and plenty of workers commute across the state line. Picking coverage that follows how you actually live matters more here than almost anywhere in Mississippi.",
      "Our licensed Mississippi advisors serve Alcorn County by phone, video, and scheduled in-person visits. We'll compare your Medicare, health, and life insurance options across carriers, check that your local providers are in network, and give you a recommendation in plain English.",
    ],
    services: [
      {
        title: 'Medicare in Corinth',
        href: '/medicare',
        description:
          'Medicare Advantage, Medigap, and Part D comparisons for Alcorn County, with network checks for local providers and any Tennessee doctors you use.',
      },
      {
        title: 'Health Insurance in Corinth',
        href: '/health',
        description:
          'Individual and family health plans for Corinth residents and cross-border commuters, including marketplace enrollment and subsidy help.',
      },
      {
        title: 'Life Insurance in Corinth',
        href: '/life',
        description:
          'Term, whole, and universal life insurance to protect Alcorn County families at every stage of life.',
      },
      {
        title: 'Retirement Planning in Corinth',
        href: '/retirement',
        description:
          'Annuities, 401(k) rollovers, and retirement income strategies for Corinth residents getting ready for what’s next.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with clients in Corinth?',
        answer:
          'Yes. We serve Corinth and all of Alcorn County from our office in Pontotoc, mostly by phone and video with in-person appointments available. Everything from quotes to enrollment can be handled without leaving your house.',
      },
      {
        question: 'I sometimes get care across the line in Tennessee. Will my plan cover that?',
        answer:
          'It depends on the plan. Medicare Supplements travel with you to any provider that accepts Medicare, while Medicare Advantage and individual health plans have networks we need to check first. Tell us which providers you use and we will verify coverage before you enroll.',
      },
      {
        question: 'Can you help me during Medicare Annual Enrollment?',
        answer:
          'Yes. Each fall (October 15 to December 7) we review plan changes for Alcorn County, compare them against what you have, and move you only if a better fit exists. The review is free every year.',
      },
      {
        question: 'Which areas around Corinth do you serve?',
        answer:
          'All of Alcorn County, including Kossuth, Rienzi, Glen, and Biggersville, plus the neighboring counties of North Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Corinth, MS',
    metaDescription:
      'Insurance and Medicare advisors serving Corinth and Alcorn County, MS. Border-smart plan comparisons for life, health, Medicare, and retirement. Call (662) 200-2249.',
  },
  {
    slug: 'columbus',
    name: 'Columbus',
    county: 'Lowndes County',
    headline: 'Insurance & Medicare Advisors Serving Columbus, MS',
    subheadline:
      'Life, health, Medicare, and retirement planning for Columbus, the Golden Triangle, and Lowndes County.',
    intro: [
      "Columbus anchors the Golden Triangle, with a workforce spread across manufacturing, the university, and Columbus Air Force Base, and each of those paths comes with different insurance decisions. Military retirees coordinating benefits with Medicare, plant workers weighing employer coverage against marketplace plans, and growing families all have different needs.",
      "We're licensed across Mississippi and serve Lowndes County by phone and video, with everything from quotes to enrollment handled remotely and in-person appointments available by schedule. You get an independent advisor comparing multiple carriers, not a single-company pitch.",
    ],
    services: [
      {
        title: 'Medicare in Columbus',
        href: '/medicare',
        description:
          'Medicare Advantage, Medigap, and Part D comparisons for Lowndes County, including guidance for military retirees coordinating their benefits with Medicare.',
      },
      {
        title: 'Health Insurance in Columbus',
        href: '/health',
        description:
          'Individual and family health plans for Columbus workers and the self-employed, with marketplace subsidy checks included.',
      },
      {
        title: 'Life Insurance in Columbus',
        href: '/life',
        description:
          'Term, whole, and universal life coverage for Golden Triangle families, from starter protection to estate planning.',
      },
      {
        title: 'Retirement Planning in Columbus',
        href: '/retirement',
        description:
          'Annuities, 401(k) and TSP-conscious rollover guidance, and retirement income planning for Lowndes County residents.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve Columbus and the Golden Triangle?',
        answer:
          'Yes. We are licensed throughout Mississippi and serve Columbus, Starkville, West Point, and the rest of the Golden Triangle by phone and video, with in-person appointments available by schedule.',
      },
      {
        question: 'I’m a military retiree. How does Medicare work with my benefits?',
        answer:
          'When you turn 65, enrolling in Medicare Part A and Part B is generally required to keep your military retiree health coverage working for you, and the two coordinate closely after that. We walk Columbus-area retirees through the timing so nothing lapses.',
      },
      {
        question: 'Can everything really be done remotely?',
        answer:
          'Yes. Quotes, plan comparisons, applications, and enrollments are all handled by phone and video with electronic signatures. Many of our Golden Triangle clients never need to visit the office, though you are always welcome.',
      },
      {
        question: 'Which areas around Columbus do you serve?',
        answer:
          'All of Lowndes County plus the wider Golden Triangle, including Starkville, West Point, Caledonia, and New Hope, and anywhere else in Mississippi.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Columbus, MS',
    metaDescription:
      'Insurance and Medicare advisors serving Columbus and the Golden Triangle, MS. Life, health, Medicare, and retirement planning, including military retiree Medicare guidance. Call (662) 200-2249.',
  },
  {
    slug: 'ocean-springs',
    name: 'Ocean Springs',
    county: 'Jackson County',
    headline: 'Insurance & Medicare Advisors Serving Ocean Springs, MS',
    subheadline:
      'Statewide Mississippi licensing means Coast families in Ocean Springs get the same independent guidance we give our North Mississippi neighbors.',
    intro: [
      "Ocean Springs draws retirees and remote workers from all over the country, and both groups tend to arrive with insurance homework: Medicare plans that need to move to Jackson County, marketplace coverage to re-shop, and retirement accounts to consolidate. That's the work we do every day.",
      "Our office is in Pontotoc, in North Mississippi, and we serve the Coast entirely by phone and video, from first quote to finished enrollment with electronic signatures. You get a licensed, independent Mississippi advisor comparing multiple carriers for Jackson County, without ever needing to drive anywhere.",
    ],
    services: [
      {
        title: 'Medicare in Ocean Springs',
        href: '/medicare',
        description:
          'Medicare Advantage, Medigap, and Part D comparisons for Jackson County, including plan moves for retirees new to the Coast.',
      },
      {
        title: 'Health Insurance in Ocean Springs',
        href: '/health',
        description:
          'Marketplace and private health plans for Ocean Springs families, artists, and the self-employed, with subsidy eligibility checked.',
      },
      {
        title: 'Life Insurance in Ocean Springs',
        href: '/life',
        description:
          'Term, whole, and universal life insurance for Coast families, from income protection to legacy planning.',
      },
      {
        title: 'Retirement Planning in Ocean Springs',
        href: '/retirement',
        description:
          'Annuities, 401(k) and IRA rollovers, and retirement income strategies for Ocean Springs retirees and near-retirees.',
      },
    ],
    faqs: [
      {
        question: 'You’re in North Mississippi. How do you serve Ocean Springs?',
        answer:
          'Entirely by phone and video. We are licensed across Mississippi, and every step, including quotes, comparisons, applications, and signatures, is handled electronically. Coast clients get the same advisor and the same service as our hometown clients.',
      },
      {
        question: 'I just moved to Ocean Springs. Do I need a new Medicare plan?',
        answer:
          'If you have a Medicare Advantage or Part D plan from another county or state, yes. Moving to Jackson County triggers a Special Enrollment Period, and we help you compare the local options and confirm your new doctors are in network.',
      },
      {
        question: 'Why work with you instead of a local Coast agent?',
        answer:
          'Work with whoever serves you best. What we offer is independence, multiple carriers compared side by side, free annual reviews, and an advisor who answers the phone. Distance stopped mattering once enrollment went electronic.',
      },
      {
        question: 'Which Coast areas do you serve?',
        answer:
          'All of Jackson County, including Gautier, Pascagoula, and Vancleave, plus the rest of the Mississippi Gulf Coast and anywhere else in the state.',
      },
    ],
    metaTitle: 'Insurance & Medicare Advisors in Ocean Springs, MS',
    metaDescription:
      'Independent Mississippi insurance and Medicare advisors serving Ocean Springs and Jackson County by phone and video. Life, health, Medicare, and retirement help. Call (662) 200-2249.',
  },
]

export function getLocation(slug: string): CityLocation | undefined {
  return locations.find((l) => l.slug === slug)
}
