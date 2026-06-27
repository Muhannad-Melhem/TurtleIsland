export const colors = {
  ocean: "#7FD8F7",
  mint: "#B8F2D6",
  cream: "#FFF8ED",
  lavender: "#D8C8FF",
  coral: "#FFA8A8",
  softYellow: "#FFE89C",
  seafoam: "#BCEFD8",
  sage: "#A8D5BA",
  darkText: "#2F3640",
} as const

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const

export const radius = {
  sm: "0.375rem",
  md: "0.625rem",
  lg: "0.875rem",
  xl: "1.25rem",
  "2xl": "1.75rem",
  pill: "9999px",
  circle: "50%",
} as const

export const shadows = {
  soft: "0 2px 8px rgba(47, 54, 64, 0.06), 0 1px 3px rgba(47, 54, 64, 0.04)",
  medium: "0 4px 16px rgba(47, 54, 64, 0.08), 0 2px 6px rgba(47, 54, 64, 0.04)",
  large: "0 8px 32px rgba(47, 54, 64, 0.10), 0 4px 12px rgba(47, 54, 64, 0.06)",
  floating: "0 12px 48px rgba(47, 54, 64, 0.12), 0 6px 16px rgba(47, 54, 64, 0.06)",
  card: "0 2px 12px rgba(47, 54, 64, 0.06), 0 1px 4px rgba(47, 54, 64, 0.03)",
  button: "0 2px 8px rgba(47, 54, 64, 0.08), 0 1px 2px rgba(47, 54, 64, 0.04)",
  modal: "0 16px 64px rgba(47, 54, 64, 0.16), 0 8px 24px rgba(47, 54, 64, 0.08)",
  hover: "0 8px 32px rgba(47, 54, 64, 0.12), 0 4px 12px rgba(47, 54, 64, 0.06)",
} as const

export const blur = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "20px",
  "2xl": "32px",
  "3xl": "48px",
} as const

export const opacity = {
  subtle: 0.08,
  light: 0.15,
  medium: 0.3,
  strong: 0.5,
  heavy: 0.7,
  glass: 0.7,
} as const

export const transitions = {
  fast: "150ms cubic-bezier(0.32, 0.72, 0, 1)",
  medium: "300ms cubic-bezier(0.32, 0.72, 0, 1)",
  slow: "500ms cubic-bezier(0.32, 0.72, 0, 1)",
} as const

export const durations = {
  fast: 150,
  medium: 300,
  slow: 500,
} as const

export const containerWidths = {
  page: "1200px",
  wide: "1400px",
  narrow: "720px",
} as const

export const zIndex = {
  dropdown: 100,
  sticky: 200,
  navbar: 300,
  sidebar: 400,
  overlay: 500,
  modal: 600,
  popover: 700,
  tooltip: 800,
  toast: 900,
} as const

export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
} as const

export const componentSizes = {
  button: {
    sm: { height: 32, paddingX: 12, fontSize: 13 },
    md: { height: 40, paddingX: 16, fontSize: 14 },
    lg: { height: 48, paddingX: 20, fontSize: 15 },
    xl: { height: 56, paddingX: 24, fontSize: 16 },
  },
  input: {
    sm: { height: 32 },
    md: { height: 40 },
    lg: { height: 48 },
  },
} as const
