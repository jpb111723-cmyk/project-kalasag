# KALASAG handoff (final build)

## Files (upload keeping this structure; no other files needed)
index.html · phase1.html · phase2.html · gobag.html · sim.html · profile.js · scenarios/{flood,quake,tsunami,typhoon,surge,volcano,slide}.js
Delete any old flood.html from the repo.

## How it works
- Static site, runs in the browser. Profile in localStorage "kalasag_profile" (profile.js: KP.get/set/lang). Language "kalasag_lang" (en|tl). Game overs: "kalasag_over" (flood) and "kalasag_over_<id>".
- Phases: phase1 (hazards, household, 3-question warning check) -> p1; phase2 (guess vs actual supply days, Kwentuhan prompts) -> p2; gobag -> p3; sim.html?s=<id> is Phase 4.
- sim.html loads scenarios/<id>.js. Text is [English, Filipino] pairs. Each decision has req (lock key); its Best option is locked unless the profile qualifies. Lock keys and messages: LKD and R in sim.html. "Demo mode" checkbox ignores the profile.
- To add a scenario: copy a scenarios file, add its id to SC in sim.html, add "kalasag_over_<id>" to the list in index.html.

## Content rules
5 tiers (Best/Good/Fair/Risky/Wrong); Best must not be the longest/shortest option; wrong answers must sound reasonable; tone dry and professional, not fear-based; game over = realistic non-graphic consequence + rewind.

## MUST verify before public release
- Every Best answer against primary PAGASA, OCD, PHIVOLCS, DOH, DENR-MGB documents (research used news and agency summaries).
- Flagged "(verify)" items: quake decision 3 (open area), volcano decision 4 (lahars after rain).
- Facts used: PAGASA red = >30 mm/h; wind signal lead times 36/24/18/12 h; DOH leptospirosis 24-48 h check; PHIVOLCS Shake-Drop-Roar, ashfall mask/damp cloth, Permanent Danger Zone; MGB landslide signs (cracks, tilting, seepage, muddy water). Casualty counts differ by source.
- Native Filipino speaker should review all Tagalog (written by Claude).
- Barangay DRRM officer / nurse review of go-bag extras.

## Known limits
Scene art is simple CSS/SVG. New scenarios have 4 decisions (flood has 5). Profile is self-reported. Thesis findings are associations, not causation. Not tested on real devices; test on a phone.
