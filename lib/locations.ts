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
]

export function getLocation(slug: string): CityLocation | undefined {
  return locations.find((l) => l.slug === slug)
}
