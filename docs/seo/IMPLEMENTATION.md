# Pontotoc SEO implementation and release handoff

Branch: `codex/pontotoc-seo-service-alignment`. Source: `https://github.com/Aurex-Agency/Pontotocinsurance.git`, starting commit `8f93d77626ddbe0c5206c49b18ef3c86846d1854`.

## Source mapping

Repository metadata, canonical host, phone/address, exact homepage copy, resource slugs and the specific Medicare table/Part D defects match the public production site reviewed October 16, 2026. Hosting project/deployment commit cannot be verified from repository source alone. Confirm the domain-to-project and deployed commit in the hosting dashboard before merging. No remote push, deployment, account changes or submission to search engines performed.

Next 14.0.4 has no installed `next/dist/docs` guide. Versioned official metadata and sitemap documentation was consulted. There is no repository AGENTS.md. Existing work is preserved through an isolated clone.

## Plan coverage

| Workstream | Status | Evidence or remaining dependency |
| --- | --- | --- |
| Production source identification | Substantially matched; release check remains | Exact public content/routes match. Hosting project and deployment SHA need owner-access verification. |
| Service intent | Implemented within verified public scope | Metadata/organization schema no longer advertises investment/estate/wealth credentials. Homepage focuses life/health/Medicare. No auto/renters pages invented. Carrier/product matrix still requires owner/licensed confirmation. |
| Homepage trust | Implemented | Unsupported numeric counters and hardcoded testimonials removed from homepage; real office/team/resources paths replace them. Legacy testimonial component remains unmounted for evidence review. |
| Medicare accuracy | Implemented, licensed release review required | Correct Plan A/G/N deductible entries and qualify Plan N/foreign travel summary; replace obsolete Part D gap and 5% catastrophic claims with sourced 2026 structure. Annual 2027 material requires separate verification. |
| Core service pages | Implemented | Life price teaser and generic savings removed; preparation content and resource/team links added to life, health, Medicare. All carrier/rider/retirement claims require licensed review before release. |
| Agent pages | Implemented canonical fix; profile evidence blocked | Profile canonical now points to itself, not root inherited canonical. Existing biographies remain DB-managed; no fake credentials added. Owner must verify active agents/licensing. |
| Local pages | Implemented common accuracy improvement | Existing city pages explicitly state Pontotoc is the office; no fake local branches. Two-page bespoke expansion awaits real appointment logistics and service evidence. |
| Four new posts | Complete; review-gated | Four full articles in `lib/seo-articles.ts`, unique intent, source notes, related links and CTA. Pending review posts unavailable in all production builds and omitted from sitemap. |
| Existing resources | Preserved | No duplicate replacements; review backlog includes year-sensitive subsidy/enrollment assertions in older content. |
| Technical templates | Implemented | Published-content sitemap, truthful dates, private-flow response noindex, agent canonical, server-rendered main content, keyboard focus. HTTP/www redirects require real host inspection before modifying hosting. |
| Conversion measurement | Implemented | `generate_lead` fires only in successful delivery branches on production hostname; only form identifier, no service/health details or contact data. Preview GA loader is blocked. Existing GA ID preserved with env override. Phone clicks are not leads. |
| Google/Bing/IndexNow | Prepared; external activation pending | Explicit opt-in production CLI, live key file and sitemap/indexability verification; dry run by default. No account edits or index submissions. Google/Bing ownership, inspection, sitemap submission and baseline require signed-in account follow-through. |
| Performance/accessibility | Partially verified | Production build and responsive screenshots; focus and motion-duration support. Field Core Web Vitals and real device baselines remain post-deploy measurement, not inferred from build size. |
| Local authority/proof | Evidence-dependent | Owner verifies GBP/Bing categories/NAP, real offices, professional/carrier listings and testimonial permissions before account edits or outreach. |
| 90-day improvement cycle | Future measurement | Weekly 28-day comparisons, qualified lead review and branded/nonbranded queries after approved release. No fabricated uplift or scheduled automation. |

## Four completed articles

All are in `lib/seo-articles.ts`. Routes become available after approval status, reviewer and review date are supplied in the content record. Do not merely flip a global environment flag in production.

1. `/resources/what-to-bring-medicare-plan-review`
2. `/resources/term-permanent-life-insurance-agent-questions`
3. `/resources/prepare-health-coverage-conversation-pontotoc`
4. `/resources/moving-north-mississippi-insurance-review-checklist`

For local editorial review only: `SEO_REVIEW_PREVIEW=true npm run dev -- -p 8774`. Pending pages receive noindex and a review banner. The production build always excludes unapproved drafts, even if this variable is present. Publication approval needs a named licensed reviewer, actual review date and appropriate carrier/compliance approval; none is invented. Set actual publication date when publishing.

Sources include Medicare.gov Medigap benefits, CMS 2026 Part D guidance, HealthCare.gov enrollment/plan comparisons and NAIC life insurance guidance. The old Medicare 2026 PDF URL now returns a 2027 document and was not used as 2026 proof. The four posts avoid precise premiums, savings, automatic enrollment entitlement and individualized coverage recommendations.

## Release checklist and measurement

- Verify hosting project/deployed commit and preserve current production environment.
- Licensed reviewer signs off on core Medicare corrections and the four posts; verify agency product/agent matrix, retirement authority and older resource claims.
- Inspect HTTP/www/HTTPS redirect behavior and Google-selected canonicals before changing host redirects. Preserve all valuable existing paths.
- Confirm `G-E8MB7HL2TR` is the intended GA property, consent configuration and `generate_lead` key-event configuration. Check delivered lead records against GA; one event is a received request, not a qualified customer.
- Review form privacy/consent and retention. Contact/quote delivery currently succeeds when either existing destination confirms receipt; this behavior is preserved. No real test leads were submitted.
- Set an IndexNow key and deploy its matching root text file only after release approval. Run `node scripts/indexnow.mjs docs/seo/changed-urls.json` for dry run. Submission additionally requires `--submit`, `VERCEL_ENV=production`, `INDEXNOW_ENABLED=true`, valid `INDEXNOW_KEY`, accessible deployed verification file and live public sitemap matches. Update changed URL manifest to actual changed published paths. No key or deployment hook was silently enabled.
- Capture GSC and Bing baseline, selected canonical/indexing status, queries and pages. Submit approved sitemap and request priority URL inspection with account authorization.
- Compare clicks, impressions, organic sessions and real qualified requests at 28-day intervals. Small starting samples mean percent increases alone are misleading. Separate paid social from organic. Validate targets against service fit and outcomes.

## Verification

`npm ci --ignore-scripts`; `npx tsc --noEmit`; `npm run lint`; `npm run build`. Build requires Google Font network fetch. Lint has three existing admin-only warnings (two img optimizations and a hook dependency); pre-existing conditional-hook error fixed without changing auth intent. Existing package audit reports 23 vulnerabilities, including one critical in the old dependency tree; framework security upgrade is a separate release prerequisite to assess, not silently forced through this SEO branch.

Browser test: `PLAYWRIGHT_MODULE=/path/to/@playwright/test node scripts/seo-smoke.cjs` against local production server. All external requests and writes intercepted. Tests cover canonical/H1, draft 404 and sitemap exclusion, private noindex, zero preview GA requests, form delivered/failure states and responsive screenshots. Screenshots stay uncommitted under artifacts. No business production data changed.

Final verification: production build passed; tsc passed; lint passed with the three documented admin warnings. Production SEO/form smoke test passed, including both intercepted delivery outcomes. All four article previews passed substantive-content, noindex and mobile/desktop layout checks. No preview analytics request was made.
