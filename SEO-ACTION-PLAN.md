# Kona-verse SEO — What You Need To Do

## 1. Google Search Console (Do This First)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add `https://www.kona-verse.com` as a property
3. Choose the **URL prefix** method
4. Google will give you a verification code (a long string)
5. Open `src/app/layout.tsx` and replace `REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` with that string
6. Deploy the site, then click **Verify** in Search Console
7. After verification, go to **Sitemaps** in the left sidebar and submit: `https://www.kona-verse.com/sitemap.xml`

---

## 2. Google Business Profile

1. Go to [Google Business Profile](https://business.google.com) and create or claim your listing
2. Set your primary category to **Web design company**
3. Add a secondary category: **Digital marketing agency**
4. Set service area to **Europe** (or list specific countries you serve)
5. Fill in: website URL, phone number, email, business hours
6. Upload photos of your work, team, and office
7. Ask satisfied clients to leave Google reviews

---

## 3. Update Social Media Profiles

Update the `sameAs` URLs in `src/components/seo/json-ld.tsx` (lines 26–30) with your **actual** social profile URLs. Currently they are placeholders.

Then update the profiles themselves:

- **LinkedIn Company Page** — Bio should include: "Web Design & Digital Marketing Agency | Europe". Link to `www.kona-verse.com`
- **Instagram** — Bio: "Web Design & Digital Marketing | Building Websites That Print Money" + link to site
- **Twitter/X** — Same keyword-rich bio + link to site
- **All profiles** — Use consistent branding, logo, and cover images across platforms

---

## 4. Replace the OG Image (Optional but Recommended)

A placeholder OG image was generated at `public/images/og-default.jpg`. This is what appears when someone shares your site on LinkedIn, Twitter, Facebook, WhatsApp, Slack, etc.

For a more branded version:
- Create a **1200 x 630 px** image with your logo, tagline, and brand colours
- Replace `public/images/og-default.jpg` with the new file (keep the same filename)

---

## 5. Upgrade Favicon Assets (Optional)

Your logo was copied as a temporary favicon. For best results:

1. Go to [realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload your logo
3. Download the generated package
4. Replace these files with properly sized versions:
   - `src/app/favicon.ico` (create this — a proper .ico file)
   - `src/app/icon.png` (32x32 px)
   - `src/app/apple-icon.png` (180x180 px)

---

## 6. Set Up Google Analytics

1. Go to [Google Analytics](https://analytics.google.com) and create a property for `www.kona-verse.com`
2. Get your Measurement ID (starts with `G-`)
3. Add the Google Analytics script to your site (via `next/script` in `layout.tsx` or a third-party package like `@next/third-parties`)
4. Verify data is flowing after deployment

---

## 7. Content Strategy (Ongoing — This Is What Makes You Rank)

Code-level SEO gets you indexed. **Content** is what gets you to page one.

### Blog / Articles

Add a `/blog` route to the site and publish keyword-targeted articles:

- "How to choose a web design agency in Europe"
- "Why conversion-focused web design matters in 2026"
- "Social media management vs. doing it yourself — what's worth it?"
- "How much does a custom web application cost in 2026?"
- "5 signs your website is costing you customers"
- "Google Ads vs Meta Ads — which is right for your business?"

Aim for **2–4 articles per month**, each 1000–2000 words, targeting a specific keyword.

### Case Studies

Fill out the `/case-studies` page with real projects. Each case study should include:

- The client's challenge
- Your solution and approach
- Measurable results (traffic increase, conversion rate, revenue impact)
- Screenshots / visuals

### Expand Service Pages

Each `/solutions/*` page is currently minimal. Add:

- Detailed process breakdown (how you work)
- FAQ section (targets "People also ask" in Google)
- Tech stack details
- Pricing hints or "starting from" ranges
- Client testimonials specific to that service

---

## 8. Backlink Strategy

Backlinks from other sites are one of the strongest ranking signals.

### Directory Listings (Do These First)
- [Clutch.co](https://clutch.co) — Top agency directory
- [DesignRush](https://www.designrush.com) — Web design directory
- [Sortlist](https://www.sortlist.com) — European agency marketplace
- [GoodFirms](https://www.goodfirms.co) — IT service directory
- [Behance](https://www.behance.net) — Portfolio showcase
- [Dribbble](https://dribbble.com) — Design showcase

### Client Backlinks
- Ask clients to add a "Built by Kona-verse" link in their website footer
- This creates high-quality, relevant backlinks

### Guest Posting
- Write articles for web design, marketing, and tech blogs
- Include a link back to your site in the author bio

### Shareable Resources
- Create free tools, templates, or guides that people will link to naturally

---

## 9. Monitor and Iterate

### Weekly
- Check Google Search Console for crawl errors, indexing issues
- Review which queries are driving impressions and clicks

### Monthly
- Check Core Web Vitals in Search Console (your Next.js site should score well)
- Run [PageSpeed Insights](https://pagespeed.web.dev) on key pages
- Review keyword rankings (use Ahrefs, SEMrush, or Search Console's Performance tab)
- Publish new content (blog posts, case studies)

### Quarterly
- Update metadata descriptions if click-through rates are low
- Refresh old content with new data and keywords
- Review and update structured data if services change
- Check competitor sites for new keyword opportunities

---

## Quick Reference — What Was Added to the Codebase

| Feature | Status |
|---------|--------|
| Unique metadata per page (title, description, keywords) | Done |
| Open Graph tags (Facebook, LinkedIn, WhatsApp) | Done |
| Twitter Card tags | Done |
| Canonical URLs | Done |
| sitemap.xml (auto-generated) | Done |
| robots.txt (auto-generated) | Done |
| JSON-LD Organization schema | Done |
| JSON-LD WebSite schema (homepage) | Done |
| JSON-LD Service schema (4 solution pages) | Done |
| JSON-LD Breadcrumb schema (all subpages) | Done |
| Security headers | Done |
| Favicon + Apple icon | Done |
| OG sharing image | Done |
| Heading hierarchy fixed (single h1 per page) | Done |
| Google Search Console verification | Placeholder — you need to add the code |
| Google Analytics | Not added — you need to set it up |
| Blog section | Not added — you need to create it |
