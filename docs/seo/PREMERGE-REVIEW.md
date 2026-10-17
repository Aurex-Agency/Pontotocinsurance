# Pre-merge review, October 16, 2026

## Verdict: hold production release

The branch has tested SEO fixes and four complete drafts, but it is not an unconditional merge/deploy approval. Latest fetched origin/main remains `8f93d77626ddbe0c5206c49b18ef3c86846d1854`; no upstream merge conflict is present. No production account, lead record, role or deployment was changed during this review.

### Fixed findings

1. **Critical outdated framework dependency.** Next 14.0.4 was unsupported and affected by numerous historical advisories. Upgraded to current official maintenance security release Next **15.5.28**, with React/React DOM **19.3.1**, matching type packages, compatible Framer Motion and Lucide. Migrated all dynamic page/route params to the documented asynchronous API. Official sources: [support policy](https://nextjs.org/support-policy), [October 14 security release](https://nextjs.org/blog/nextjs-security-update-october-14-2026), [Next 15 migration](https://nextjs.org/docs/15/app/guides/upgrading/version-15). The full app was rebuilt and browser regression checked, not just the package manifest changed.
2. **Privileged APIs lacked authorization (pre-existing).** User administration, lead listing/mutations, team mutations and settings mutations trusted public requests while invoking the privileged database client. Added a guard inside each handler, independent of middleware: validate supplied bearer token through Supabase `getUser`, then require the verified user UUID in the server-only `ADMIN_USER_IDS` configuration. Missing authentication is 401, invalid session 401, nonallowed user 403, missing configuration 503. The admin UI sends its existing session token through a same-origin API wrapper. No role is inferred from email, login status or editable user metadata. No staff identities were added or changed.
3. **Analytics could interfere with delivery UI.** A throwing/blocked analytics callback now cannot turn confirmed form delivery into an apparent failure. Event payload is only a known form identifier; preview host produces no event. Removed password-reset logging of email/data.
4. **Compatible dependency patches.** Applied nonbreaking audit fixes and pinned/overrode PostCSS **8.5.30**, addressing the vulnerable nested PostCSS copy. No force upgrade to Tailwind 4 was made merely to make the audit counter disappear.

5. **Auth-link redirect spoof and session logging (pre-existing).** The email-link wrapper accepted any URL containing a Supabase-looking substring. Automatic and manual continuations now accept only HTTPS on the configured project origin and `/auth/v1/verify`, rejecting credentials and malformed URLs. Removed reset-page console logging of the auth session. Added the Suspense boundaries required by Next 15 to the two query-driven reset pages.
6. **Unsafe bootstrap lead-read policies (pre-existing).** Removed unconditional public SELECT policies for contact/quote leads from `supabase-schema.sql`. Editing bootstrap SQL does not revoke a policy already deployed. Do not represent this as a completed database repair.

### Required before release

- **Admin intentionally disabled:** the owner has confirmed the site has not been used and admin can remain disabled. Leave `ADMIN_USER_IDS` unset; privileged operations fail closed. This is an accepted disabled feature, not a requirement to configure staff before a public-site release. If admin is enabled later, identify existing authorized staff UUIDs explicitly and verify access in staging. Existing browser login alone does not grant administrative access.
- **Database security verification:** repository bootstrap previously explicitly allowed public SELECT on both lead tables. An authorized database operator must inspect and remove those deployed policies if present, then verify anon/authenticated nonadmins cannot read leads and permitted form insertions still work. Verify Supabase RLS/grants for lead, settings, team and storage tables. These are pre-existing direct browser database access paths; route guards do not substitute for database authorization. No live read of private leads or database mutation was performed. Application tests mock authorization results and never claim to certify deployed RLS.
- **Licensed insurance release review:** the four articles are technically gated and return 404 in production until reviewer/status/date are supplied. Existing-page Medicare corrections are sourced and corrected but are not gated off from the production page. Therefore merging a branch that auto-deploys those pages still requires licensed approval of the corrections and other service copy. No reviewer is invented and no environmental flag is used to pretend approval. If review is not available, do not merge this branch into an auto-deploying main branch. The prior original misinformation should not be restored as a workaround.
- **Hosting mapping:** verify the hosting project and deployed SHA for the domain, since matching source/content alone does not establish the currently deployed commit.

### Dependency risk remaining

The fresh audit fell from **23 findings (1 critical, 19 high, 3 moderate)** to **9 findings (0 critical, 7 high, 2 moderate)**. The remaining advisory roots are `braces` (GHSA-vfj7-8cjw-p6xm, stack exhaustion on deeply nested glob patterns) and `postcss-selector-parser` (GHSA-rj75-hqrm-r3gf, quadratic CPU with pathological selectors). The other seven entries are dependency chains through Tailwind 3, chokidar, micromatch, fast-glob, postcss-nested and the Next ESLint plugin/config. They are used by stylesheet building, file watching and linting; this site does not expose those parsers to visitor-supplied CSS/globs. Keep builds restricted to trusted repository inputs. The remaining audit is not zero, and untrusted content/build pipelines must not be enabled without remediation. Removing these chains requires a tested Tailwind/toolchain migration; it is not necessary to change the public site layout during this focused security pass. Framework runtime and nested PostCSS advisories are resolved by the current lockfile.

### Validation and scope limits

Checks cover production compilation, TypeScript, lint, auth missing/invalid/unconfigured/nonadmin/authorized outcomes with mocks, handler guard presence, local API 401 responses before operations, production draft 404/sitemap exclusion, canonical/H1 checks, analytics absence on preview, metadata sources, mobile/desktop layouts and form success/failure with external requests intercepted. No real submissions or IndexNow requests. Production field performance, consent settings, GA key-event configuration, actual staff sessions and licensed content approval are not proven by local tests.

Supabase guidance read: plugin `supabase:supabase` SKILL.md; changelog reviewed (upcoming legacy TLS cipher removal does not change these modern Node API calls), current `getUser` documentation reviewed. Unit verification substitutes for production queries intentionally: the task prohibits real lead access or account mutations.

## Database operator remediation, not executed

After confirming the correct project and reviewing current policies, the two known unsafe policy removals are:

```sql
DROP POLICY IF EXISTS "Allow public to read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public to read quote requests" ON public.quote_requests;
```

Inspect all other SELECT/ALL policies and grants as well; these statements alone do not prove no other policy permits reading. Verify with synthetic rows in approved staging or role-aware policy tests, not by extracting production leads. Public insert operations do not use `.select()` in current form code, so these read policies are not needed for form acknowledgement. No database migration or production SQL was executed.

Deployed-policy metadata inspection was attempted through Supabase list_projects but the connector did not return before interruption after roughly 284 seconds. Deployed policy state is therefore unverified. No lead-table rows were queried.

Final local validation: Next 15.5.28 production build passed; TypeScript passed; build-integrated lint passed with three existing admin warnings. Three security unit suites passed (admin authorization, analytics isolation and auth-link validation). Production browser regression passed six public routes, nine unauthenticated privileged API denials, four production draft 404s/sitemap exclusion, private noindex, intercepted form success/failure, zero preview analytics and mobile/desktop captures. Equivalent root canonical serialization was normalized in tests and IndexNow validation. Earlier four-article editorial rendering checks remain documented; the production gate was rechecked after the framework migration.

## PR 6 GitHub findings pass

The initial PR scan succeeded but the repository still had historical high CodeQL alert #1 (`js/xss-through-dom`) at `components/admin/ImageUpload.tsx`, tracing typed image URLs and parent-form values to the image preview. Added explicit image-source validation: only HTTPS without credentials, safe root-relative paths and raster-only base64 image data are accepted. Executable schemes, SVG/HTML data, network-path URLs, control characters and markup are rejected before rendering. Upload validation now enforces PNG/JPEG/GIF/WebP and the stated 10MB limit, with accessible errors and a labeled removal button. Unit tests exercise nine rejected URL inputs, three accepted source types and size/MIME boundaries. No alert was manually dismissed. The final branch scan must confirm the result; default-branch historical alerts can remain open until a fix is merged.

Follow-up persistence check: typed values now remain in local editor draft state and only accepted normalized sources reach the parent form. Team create/update endpoints independently reject unsafe/non-string sources before database calls, and public team responses replace unsafe legacy values with the default avatar. Mocked endpoint regression covers ten rejected writes, eight accepted/normalized writes and legacy-read fallback. No real database calls were made.
