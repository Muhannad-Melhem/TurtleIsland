export const gradients = {
  ocean: "linear-gradient(135deg, #7FD8F7, #B8F2D6)",
  sunset: "linear-gradient(135deg, #FFA8A8, #FFE89C)",
  sky: "linear-gradient(135deg, #7FD8F7, #D8C8FF)",
  forest: "linear-gradient(135deg, #BCEFD8, #A8D5BA)",
  flower: "linear-gradient(135deg, #D8C8FF, #FFA8A8)",
  magic: "linear-gradient(135deg, #D8C8FF, #7FD8F7, #B8F2D6)",
  rainbow: "linear-gradient(135deg, #FFA8A8, #FFE89C, #B8F2D6, #7FD8F7, #D8C8FF)",
  aurora: "linear-gradient(135deg, #B8F2D6, #7FD8F7, #D8C8FF)",
} as const

export type GradientName = keyof typeof gradients

export const textGradients = {
  ocean: "gradient-ocean",
  sunset: "gradient-sunset",
  magic: "gradient-magic",
} as const
