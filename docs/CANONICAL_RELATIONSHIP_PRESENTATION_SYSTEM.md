# Canonical Relationship Presentation System

Relationship labels are domain language, not generic database language. The registry in `content/relationships` defines how each source entity presents a relationship role.

Examples:

- reagent → reaction: **Typical reactions**
- reagent → molecule: **Typical substrates**
- molecule → reagent: **Relevant reagents**
- reaction → reaction: **Competing pathways** or **Alternative pathways to compare**
- mechanism → reaction: **Occurs in reactions**
- spectroscopy → structure: **Assigned structure environment**
- lesson → applications: **Chemistry in action**

UI components consume a presentation ID and render its canonical heading and explanatory text. New entity pages should not hardcode generic headings such as “Related items.” Add or reuse a typed presentation instead.

Every relationship card should answer why the target is shown. Entity records remain responsible for chemistry relationships; the presentation registry controls human-facing terminology.
