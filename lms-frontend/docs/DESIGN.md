---
name: SaaS Education Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1440px
---

## Brand & Style
The design system is engineered for modern educational environments, balancing academic rigor with the frictionless experience of a high-end SaaS platform. It evokes a sense of **trust, clarity, and progress**. The aesthetic is rooted in **Minimalism** and **Modern Corporate** styles, prioritizing high legibility and reduced cognitive load to help students and educators focus on content rather than the interface. 

The visual language uses generous whitespace and a refined color palette to create an atmosphere of professional calm. It avoids unnecessary decoration, relying instead on structural integrity, purposeful movement, and a clear information hierarchy to guide users through complex learning management workflows.

## Colors
The color strategy for the design system centers on a high-trust **Primary Blue (#2563EB)**, which serves as the anchor for interactive elements and brand presence. 

- **Primary**: Used for main actions, active states, and progress indicators.
- **Secondary (Slate)**: Utilized for utility icons, secondary text, and less emphasized UI elements.
- **Tertiary (Amber)**: Reserved for "achievement" moments, warnings, or high-priority notifications.
- **Backgrounds**: A clean **White (#FFFFFF)** is used for content containers (cards, modals) to stand out against a subtle **Light Gray (#F8FAFC)** base surface.
- **Text**: Deep Navy (#0F172A) provides optimal contrast for long-form reading and data density.

## Typography
The design system utilizes **Inter** across all levels to ensure maximum readability and a systematic, technical feel. The scale is built on a modular rhythm that prioritizes vertical rhythm and clear differentiation between content tiers.

- **Headlines**: Use Semi-Bold (600) or Bold (700) weights with slightly tighter letter-spacing to create a strong visual anchor for page sections.
- **Body Text**: Uses a standard Regular (400) weight. The line height is intentionally generous (1.5–1.6) to facilitate extended reading sessions without fatigue.
- **Labels**: Utilize Medium (500) weights for better legibility at smaller sizes, particularly in navigation and data tables.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a 12-column grid with a maximum width of 1440px for desktop screens to prevent line lengths from becoming unreadable. 

- **Sidebar Navigation**: Fixed at 280px on desktop, collapsing to a hamburger menu or bottom bar on mobile.
- **Spacing Rhythm**: An 8px base unit drives all padding and margins. Generous internal padding (24px or 32px) is used within cards and containers to maintain a "breathable" and modern SaaS aesthetic.
- **Breakpoints**: 
    - Mobile (<640px): 1-column layout, 16px margins.
    - Tablet (640px - 1024px): 6-column layout, 24px margins.
    - Desktop (>1024px): 12-column layout, 32px margins.

## Elevation & Depth
Depth in the design system is achieved through **Tonal Layering** supplemented by **Ambient Shadows**. This creates a clear hierarchy between the application surface and interactive elements.

- **Surface Levels**: The base application background is `#F8FAFC`. Primary content containers (Cards, Modals) use `#FFFFFF`.
- **Shadows**: Shadows are extremely soft and diffused, using the primary text color at very low opacities (e.g., `rgba(15, 23, 42, 0.08)`). 
    - **Low Elevation**: Used for cards. A 4px blur with a 2px Y-offset.
    - **High Elevation**: Used for modals and dropdowns. A 20px blur with a 10px Y-offset.
- **Interactive States**: Elements like buttons or active cards may use a subtle lift effect (increased shadow) on hover to provide tactile feedback.

## Shapes
The shape language is defined by **pronounced roundedness**, contributing to an approachable and modern educational atmosphere. 

- **Standard Elements**: Buttons and input fields follow the `rounded-lg` (1rem) standard.
- **Containers**: Cards and main content areas utilize `rounded-xl` (1.5rem) or `rounded-2xl` (2rem) for a distinctive, friendly appearance.
- **Data Visuals**: Small badges and chips use a full pill-shape to distinguish them from actionable buttons.

## Components
- **Cards**: Pure white background, `rounded-xl` corners, and a low-elevation ambient shadow. Cards are the primary container for course modules and student data.
- **Buttons**:
    - *Primary*: Solid #2563EB, white text, `rounded-lg`.
    - *Secondary*: Soft gray background (#F1F5F9) with Slate (#475569) text.
- **Data Tables**: Borderless design with a light gray header row. Rows have a subtle hover state (`#F8FAFC`) and generous vertical padding (16px).
- **Sidebar**: High-contrast or subtle slate-based navigation with a vertical indicator bar and background tint for the active state.
- **Input Fields**: Light gray borders (#E2E8F0) that transition to the Primary Blue on focus. Labels are positioned above the field in `label-md` style.
- **Top Bar**: Fixed height (64px or 72px), white background with a subtle bottom border. Contains global search, notifications, and user profile.
- **Modals**: Centered with a dark semi-transparent overlay (Backdrop Blur: 8px). Corners are `rounded-2xl` to emphasize their "overlay" nature.