<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Dev commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # start production server
npm run lint       # ESLint
npx prettier . --write   # format all files
```

## Stack

- Next.js 16 (App Router, `src/` directory)
- TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"` in CSS, no `tailwind.config.ts`)
- Motion v12 (`motion/react`) — not Framer Motion
- Zustand, Howler, Lucide React
- Radix UI primitives (dialog, popover, tooltip, tabs, etc.)
- shadcn/ui ready (`cn()` utility in `src/lib/utils.ts`)
- ESLint (flat config `eslint.config.mjs`), Prettier (`.prettierrc`)

## Design system — Motion

Import from `"motion/react"` (not `"framer-motion"`):

```ts
import { motion, AnimatePresence } from "motion/react"
```

**Principles:** Nothing is static. Everything is alive. Cozy + magical feel.  
Springs by default: `stiffness: 120, damping: 18, mass: 1`.  
Never `width`/`height` — only `opacity`, `transform`, `scale`, `rotate`, `translate`.  
GPU accelerated via `will-change-transform` on every motion element.

### Variants + presets in `src/lib/motion.ts`

All variants use the cozy spring unless noted.

| Category | Variants |
|---|---|
| Entrance | `fadeIn`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleIn`, `popIn`, `rotateIn`, `softFade`, `magicalAppear` |
| Stagger | `staggerContainer`, `staggerChildren` |
| Continuous | `floating`, `slowFloat`, `wiggle`, `bubbleFloat`, `cloudFloat`, `turtleIdle`, `dinosaurIdle`, `shimmer`, `sparkle`, `ripple`, `breathing`, `gentleFloat` |
| Page | `pageTransition` (blur + fade + scale), `pageSlide(direction)` |
| Interaction | `hoverLift`, `buttonHover`, `cardHover`, `magneticPull` (spread as props) |
| Transition presets | `transitions.fast`/`medium`/`slow`/`spring`/`bouncy`/`gentle`/`elastic` |

Default `cozySpring` is exported separately for direct use.

### Prebuilt client components in `src/components/animations/`

| Component | Features |
|---|---|
| `AnimatedSection` | viewport entrance (fadeUp default) |
| `AnimatedDiv` | viewport entrance (fadeUp default) |
| `AnimatedCard` | viewport entrance + hover lift/tilt + layout |
| `AnimatedButton` | viewport entrance + hover scale + focus ring |
| `AnimatedIcon` | continuous wiggle + hover pulse |
| `StaggerChildren` | stagger container with viewport trigger |
| `FloatingParticles` | continuous floating particle overlay (configurable count/size/color) |
| `MouseFollower` | cursor-following element with spring smoothing |
| `MagneticButton` | button that pulls toward cursor with spring delay |
| `RevealText` | character-by-character spring reveal |
| `ParallaxLayer` | scroll-driven vertical parallax (configurable speed) |
| `AnimatedList` | staggered list with shared layout + AnimatePresence exit |

Every component respects `prefers-reduced-motion` via `useReducedMotion` and CSS override.

### Hooks in `src/hooks/`

| Hook | Purpose |
|---|---|
| `useMousePosition()` | returns `{ x, y }` of cursor |
| `useParallax(outputRange, options)` | returns `{ ref, transform, scrollYProgress }` for scroll-driven transforms |
| `useMediaQuery(query)` | reactive media query match |
| `useTheme()` | light/dark/system theme control |

### Usage patterns

- **Page transitions:** wrap pages in `<AnimatePresence mode="wait">` and use `pageTransition` or `pageSlide(direction)` variants on a `<motion.div>` wrapper
- **Cards:** use `<AnimatedCard>` for lift + tilt + entrance
- **Buttons:** use `<AnimatedButton>` or `<MagneticButton>` for magnetic pull
- **Icons:** wrap in `<AnimatedIcon>` for wiggle + hover
- **Text reveals:** use `<RevealText text="..." />` for character spring animations
- **Parallax:** wrap content in `<ParallaxLayer speed={0.5}>` for scroll-driven movement
- **Particles:** use `<FloatingParticles count={20} />` as an ambient overlay
- **Cursor effect:** mount `<MouseFollower />` once for a spring-following element
- **Staggered lists:** use `<AnimatedList>` with AnimatePresence + layout for add/remove animations
- **Shared layout:** use `layout` prop + `layoutId` for smooth element transitions
- **`useScroll` + `useTransform`:** compose scroll-driven animations with `useParallax` or inline

## Design system — UI

All design tokens are defined in `src/app/globals.css` as CSS custom properties and exposed via Tailwind v4 `@theme inline` block.

### Color palette

| Name | Hex |
|---|---|
| Ocean | `#7FD8F7` |
| Mint | `#B8F2D6` |
| Cream | `#FFF8ED` |
| Lavender | `#D8C8FF` |
| Coral | `#FFA8A8` |
| Soft Yellow | `#FFE89C` |
| Seafoam | `#BCEFD8` |
| Sage | `#A8D5BA` |

Semantic tokens (primary, secondary, accent, success, warning, danger, info, background, surface, card, muted, border, etc.) all adapt to light/dark mode automatically.

### Theme

`<ThemeProvider>` wraps the root layout. Supports `"light"`, `"dark"`, `"system"` modes with `localStorage` persistence. Access via `useTheme()` hook.

### Typography scale (Tailwind classes)

- `text-hero` — 4.5rem, `text-display` — 3.5rem, `text-h1` through `text-h6`
- `text-body-lg`, `text-body`, `text-small`, `text-caption`, `text-button`, `text-label`

### Glassmorphism

CSS classes: `glass`, `glass-sm`, `glass-lg` (backdrop-filter + translucent background).  
Programmatic: `import { glass, glassStyles } from "@/styles/glass"`.

### Gradients

CSS classes: `gradient-ocean`, `gradient-sunset`, `gradient-sky`, `gradient-forest`, `gradient-flower`, `gradient-magic`, `gradient-rainbow`, `gradient-aurora`.  
Text gradients: `text-gradient-ocean`, `text-gradient-sunset`, `text-gradient-magic`.

### Shadows

`shadow-soft`, `shadow-medium`, `shadow-large`, `shadow-floating`, `shadow-glass`, `shadow-card`, `shadow-button`, `shadow-modal`, `shadow-hover`.

### Blurs

`blur-xs` (2px) through `blur-3xl` (48px). Default `backdrop-blur` classes also available.

### Animations (CSS)

`animate-float`, `animate-float-slow`, `animate-wiggle`, `animate-bounce-soft`, `animate-pulse-soft`, `animate-sparkle`, `animate-drift`, `animate-glow`, `animate-ripple`, `animate-float-up`.

### Component library

| Category | Path | Components |
|---|---|---|
| Layout | `src/components/layout/` | `Container`, `Section`, `Grid`, `Stack`, `Flex`, `Spacer`, `Divider`, `PageWrapper`, `GlassPanel`, `FloatingPanel` |
| UI Primitives | `src/components/ui/` | `Button`, `Badge`, `Card` (+Header/Title/Description/Content/Footer), `Input`, `SearchInput`, `Textarea`, `Label`, `Select`, `Checkbox`, `RadioGroup`/`RadioItem`, `Switch`, `Slider`, `Separator`, `Skeleton`/`SkeletonCard`, `Spinner`, `Tooltip`, `Popover`, `Dialog`, `Drawer`, `Toast`, `Progress`, `Tabs`, `Breadcrumbs`, `Pagination` |
| Navigation | `src/components/navigation/` | `Navbar`, `Sidebar`, `FloatingNav` |
| Feedback | `src/components/feedback/` | `EmptyState`, `LoadingState`, `Chip`, `Notification` |
| Decorations | `src/components/decorations/` | `SparkleDecoration`, `FloatingBlob`, `WaveDivider`, `OrganicShape` |
| Icons | `src/components/icons/` | `IconWrapper` (Lucide + size + animate) |
| Theme | `src/components/theme/` | `ThemeProvider` |
| Animations | `src/components/animations/` | See Motion section above |

### Button variants

`primary`, `secondary`, `accent`, `outline`, `ghost`, `glass` × sizes `sm`/`md`/`lg`/`xl`.  
Supports `loading`, `disabled`, `asChild`, `icon` (square) modes.

### Card variants

`basic` (border + shadow), `glass` (frosted), `elevated` (floating shadow), `interactive` (hover lift + shadow).  
Subcomponents: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### Container sizes

`sm`, `md`, `lg`, `page` (1200px), `wide` (1400px), `full`.

## Performance

- Only animate `opacity` + transforms (never `width`/`height`)
- `will-change-transform` on every animated motion element
- `prefers-reduced-motion` CSS kills all animation durations to 0.01ms
- shadcn-style components go in `src/components/ui/`
- Zustand stores in `src/store/`
- Custom hooks in `src/hooks/`
