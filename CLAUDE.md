@AGENTS.md

# PTSB Microfrontend Template

Next.js 16 app-router scaffold styled to match PTSB's brand identity.

## Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- `clsx` + `tailwind-merge` via `cn()` utility (`src/lib/utils.ts`)

## Design Tokens (`src/app/globals.css`)

All brand values are exposed as CSS custom properties (sourced from `orange-bank/orange-style-guide`):

| Token | Value | Use |
|---|---|---|
| `--ob-orange` | `#FC4C02` | Primary brand, CTAs |
| `--ob-orange-dark` | `#D23A06` | Active/pressed states |
| `--ob-orange-hover` | `#EC7403` | Hover states |
| `--ob-orange-light` | `#FFEDE6` | Tinted backgrounds |
| `--ob-orange-subtle` | `#FEC9B3` | Subtle orange tint |
| `--ob-charcoal` | `#07272D` | Headings, dark bg |
| `--ob-teal` | `#3F5156` | Dark section backgrounds |
| `--ob-teal-mid` | `#273D41` | Secondary dark bg |
| `--ob-slate` | `#55676C` | Body text |
| `--ob-slate-mid` | `#9FA8AA` | Secondary/muted text |
| `--ob-navy` | `#0E2B69` | Accent, info states |
| `--ob-border` | `#CED4D5` | Borders, dividers |
| `--ob-border-light` | `#E6E9EA` | Light dividers |
| `--ob-bg` | `#F6F6F6` | Page/section bg |
| `--ob-bg-warm` | `#FFEDE6` | Warm hero bg |
| `--ob-success` | `#00875A` | Success states |
| `--ob-error` | `#DC3135` | Error states |

## Fonts (`public/fonts/`)

| File | CSS family | Use |
|---|---|---|
| `ptsb-medium.otf` | `"PTSB Medium"` | Headings (`--font-display`) |
| `ptsb-regular.otf` | `"PTSB Regular"` | Brand body copy where needed |

Body copy uses `Inter` (Google Fonts). Both PTSB fonts are loaded via `@font-face` in `globals.css`.

## Components (`src/components/`)

| Component | Notes |
|---|---|
| `Header` | Sticky nav with utility bar, dropdown menus, mobile hamburger |
| `Footer` | Dark charcoal footer, 4-column links, social icons |
| `PTSBLogo` | SVG wordmark, `variant="white"` for dark backgrounds |
| `Button` | Variants: `primary/secondary/outline/ghost/destructive`; sizes `sm/md/lg` |
| `Card` + sub-components | `hover` prop adds elevation; `padding`: `none/sm/md/lg` |
| `Hero` | Full-width hero; `background`: `white/warm/charcoal/orange`; `align`: `left/center` |
| `SectionHeader` | Eyebrow + heading with orange underline accent |
| `ProductCard` | Icon + feature list + CTA — use for product grids |
| `Badge` | Variants: `default/orange/success/error/warning/info/outline` |
| `Alert` | Variants: `info/success/warning/error`; optional `dismissible` |
| `Input` / `Textarea` | Label, hint, error state, left/right icon slots |

## Barrel export

```ts
import { Button, Card, Hero, Badge, Alert, Input } from "@/components";
```

## Adding a microfrontend page/section

1. Create `src/app/<mfe-name>/page.tsx`
2. Reuse components from `@/components`
3. Extend design tokens in `globals.css` if needed — don't override core brand values
4. Keep each MFE page self-contained; use React Context or Zustand for shared state

## Brand reference
- Primary orange: `#FC4C02` (Pantone 1655 C)
- Dark base: `#07272D` (deep teal-black, replaces generic charcoal)
- Navy accent: `#0E2B69`
- Style guide source: `git@github.com:orange-bank/orange-style-guide.git`
- Rebranded from Permanent TSB → PTSB in 2023 by Image Now, Dublin
