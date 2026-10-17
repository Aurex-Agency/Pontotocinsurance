# SEO and schema review, 2026-10-16

Agent pages now use their own canonical and Open Graph URLs instead of inheriting the homepage; removed duplicated title suffix. Shared stable InsuranceAgency ID across schema, corrected provider type, removed properties used on unsupported types and the unverified employee count, and escaped inline JSON-LD.

Based on the verified Vercel production source `claude/pontotoc-webinar-landing-wmd01s` at `ce1523b466bf`. Reviewed existing SEO work before making this focused follow-up.

Validation: Next.js production build; rendered schema validation; Google Rich Results Test health-page code: 3 valid items, optional priceRange advisory only. The built-page validator parsed 53 JSON-LD blocks across 35 HTML files using the official Schema.org vocabulary and found no issues in the implemented checks. Representative homepage checks at desktop and mobile widths found no horizontal overflow, with primary conversion paths present. No production lead was submitted.

Remaining dependencies: Existing PR #6 remains a separate release dependency: database RLS/public lead-read review, admin authorization configuration, intake verification and licensed review of insurance copy. This narrow change does not resolve those holds.

This PR is independently reviewable. After release, recrawl production and recheck Search Console; local validation does not guarantee Google indexing or rich-result display.

Also redirect the confirmed legacy /home 404 to the homepage. The source URLs returned 404 in a live check on 2026-10-16; all replacement destinations returned 200.
