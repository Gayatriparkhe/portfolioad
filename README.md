Aditya Parkhe — Data Science Portfolio (v3)
=============================================

Pure HTML + CSS + JS — no build, no framework. Photo slot intentionally
left blank so you can drop in your own portrait.

Files
-----
  index.html   — page structure (semantic HTML5)
  styles.css   — refined professional theme (deep navy + emerald/cyan)
  script.js    — typewriter, scroll-reveal, modal, theme, form

Features carried over from the Shubham Gadekar reference
(with a refined professional theme on top)
-----------------------------------------------------------------
  - Hero with rotating rotating-tagline typewriter
  - Round circular portrait frame (currently EMPTY — drop your photo)
  - "Contact Me" + "View Projects" CTAs, GitHub/LinkedIn/Email socials
  - Bouncing scroll-cue arrow at the bottom of the hero
  - About: 2x2 fact cards (Personal Info / Education / Experience / Interests)
  - Education: alternating timeline with center dot + colored icons
  - Skills: 3 cards (Core / Programming / Toolbox) with colour-band headers
    and chip rows (same layout language as the reference's 3-card grid)
  - Projects: 3-up grid, each with an icon band, tech chips and a
    View Details button → spring-style MODAL with full description
  - Experience: 2-up volunteer cards + extracurricular card
  - Contact: form (Name/Email/Subject/Message) with submit spinner +
    success toast + Contact Information list + "Let's Connect" gradient
    CTA box with socials
  - Footer: gradient brand + 3 social icons + animated heart credit line
  - Dark / Light theme toggle (sun / moon), persisted in localStorage
  - Mobile hamburger menu
  - Print → clean monochrome PDF

Theme refinement vs the reference
---------------------------------
  - Tightened type scale (Fraunces serif + Inter sans + JetBrains mono)
  - Reduced vertical density; more breathing room inside cards
  - Consistent emerald/cyan accent (#14b88a → #06b6d4) across all sections
    instead of the reference's mixed blue/purple/green palette
  - Soft glow rather than saturated shadows; uniform 12 px / 18 px radii
  - Light theme also provided (auto-switches surface, ink and glow tokens)

Run
---
  Just open index.html in any modern browser. No build, no install.

Drop your photo in
------------------
  Find this block in index.html:

      <!-- Photo blank by design — drop your <img src="your-photo.jpg"> here -->
      <div class="portrait-empty" aria-label="Photo placeholder">
        <span class="empty-circle"></span>
        <span class="empty-label">Your Photo<br/>Here</span>
      </div>

  Replace that <div ...>...</div> with:

      <img src="your-photo.jpg" alt="Aditya Parkhe"
           style="width:100%;height:100%;object-fit:cover;" />

  Place your-photo.jpg in the same folder as index.html.

Placeholders to fill
--------------------
  - [ Add your college / university here ]
  - 2nd Year · CGPA: [ update me ]
  - aditya.parkhe.ds@gmail.com
  - github.com/, linkedin.com/  (swap in real handles)
  - Project href="#"  (swap in real GitHub/Notebook URLs)
