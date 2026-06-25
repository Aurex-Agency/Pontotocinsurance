-- Seed current team members for Pontotoc Insurance Agency
-- Run this in the Supabase SQL Editor (Project: ndgzmalrirbbeqbrgrjo).
-- Safe to re-run: it removes any existing rows for these emails first.

BEGIN;

DELETE FROM team_members WHERE email IN ('justin@pontotocinsuranceagency.com', 'brandon@pontotocinsuranceagency.com', 'jake@pontotocinsuranceagency.com');

INSERT INTO team_members
  (name, title, bio, image_url, email, phone, specialties, licenses, years_experience, display_order, social_media, is_active)
VALUES
  ('Justin Stark', 'Owner & Lead Agent', 'With over 7 years of experience in the insurance industry, Justin founded Pontotoc Insurance Agency to provide personalized service to the local community. He specializes in all lines of insurance and is committed to finding the best coverage at competitive rates.', '/team/justin-stark.jpg', 'justin@pontotocinsuranceagency.com', '(662) 200-2249', ARRAY['Life Insurance','Medicare','Retirement Planning','Health Insurance','Medicare Supplement','Medicare Advantage']::text[], ARRAY['Life & Health','Medicare']::text[], 7, 1, '{"website":"","facebook":"https://www.facebook.com/justin.stark.3538039/","linkedin":"https://linkedin.com/in/justin-stark","instagram":"https://www.instagram.com/the_justin_stark/"}'::jsonb, true),
  ('Brandon Gonzales', 'Senior Licensed Insurance Agent & Client Solutions Strategist', 'Brandon brings a unique backround from the respiratory and nursing field(s). He has helped hundreds of families find the right coverage for their needs and is passionate about educating clients about their options.', '/team/brandon-gonzales.jpg', 'brandon@pontotocinsuranceagency.com', '(662) 200-2249', ARRAY['Health Insurance','Life Insurance','Medicare Supplement','Medicare Advantage','Medicare']::text[], ARRAY['Life & Health','Medicare']::text[], 2, 2, '{"linkedin":""}'::jsonb, true),
  ('Jake Wingo', 'Licensed Insurance & Annuity Specialist', 'Jake brings nearly a decade of experience in customer support, operations management, and business transactions to his role as a licensed insurance agent. Before stepping into the insurance world, Jake held leadership roles at Fastenal, where he excelled in inventory management, client relationship stewardship, and operational efficiency. 

Though new to insurance, Jake has a deep understanding of business dynamics, market behavior, and investment principles. He’s quickly found a passion for annuities and life insurance — pairing his knowledge of financial growth with a strong desire to help clients protect what matters most. As a long-time friend and trusted professional, Jake is committed to building lasting relationships and delivering high-value solutions. His philosophy within the world of business is to, as he often quotes, "Live Serving Others."', '/team/jake-wingo.jpg', 'jake@pontotocinsuranceagency.com', '(662) 200-2249', ARRAY['Life Insurance','Health Insurance','Medicare','Medicare Supplement','Medicare Advantage','Retirement Planning']::text[], ARRAY['Life & Health','Medicare']::text[], 1, 3, '{"facebook":"https://www.facebook.com/jake.wingo.188","linkedin":"https://www.linkedin.com/in/jake-wingo-a338a0235/"}'::jsonb, true);

COMMIT;
