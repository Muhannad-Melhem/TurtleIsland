"use client"

import { useEffect } from "react"

export function TurtleCursor() {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3C!-- legs --%3E%3Cellipse cx='8' cy='28' rx='4' ry='3' fill='%236B9E6B'/%3E%3Cellipse cx='14' cy='31' rx='3.5' ry='3' fill='%236B9E6B'/%3E%3Cellipse cx='26' cy='31' rx='3.5' ry='3' fill='%236B9E6B'/%3E%3Cellipse cx='32' cy='28' rx='4' ry='3' fill='%236B9E6B'/%3E%3C!-- tail --%3E%3Cpath d='M20 32 L20 36 L22 34 Z' fill='%236B9E6B'/%3E%3C!-- head --%3E%3Cellipse cx='20' cy='10' rx='5' ry='6' fill='%236B9E6B'/%3E%3C!-- shell --%3E%3Cellipse cx='20' cy='22' rx='14' ry='10' fill='%235B8C5A'/%3E%3Cellipse cx='20' cy='21' rx='12' ry='8' fill='%234A7C49'/%3E%3C!-- shell pattern --%3E%3Cpath d='M14 19 L16 22 L12 22 Z' fill='%233B6B3A' opacity='0.5'/%3E%3Cpath d='M20 16 L18 20 L22 20 Z' fill='%233B6B3A' opacity='0.5'/%3E%3Cpath d='M26 19 L24 22 L28 22 Z' fill='%233B6B3A' opacity='0.5'/%3E%3Cpath d='M17 25 L20 27 L23 25 Z' fill='%233B6B3A' opacity='0.5'/%3E%3C!-- eyes --%3E%3Ccircle cx='17' cy='9' r='2' fill='%232F3640'/%3E%3Ccircle cx='23' cy='9' r='2' fill='%232F3640'/%3E%3Ccircle cx='17.5' cy='8.5' r='0.8' fill='white'/%3E%3Ccircle cx='23.5' cy='8.5' r='0.8' fill='white'/%3E%3C!-- smile --%3E%3Cpath d='M17 12 Q20 15 23 12' stroke='%232F3640' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 20 20, auto;
      }
      a, button, [role="button"], input, select, textarea, label, .cursor-pointer {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3C!-- legs --%3E%3Cellipse cx='8' cy='28' rx='4' ry='3' fill='%236B9E6B'/%3E%3Cellipse cx='14' cy='31' rx='3.5' ry='3' fill='%236B9E6B'/%3E%3Cellipse cx='26' cy='31' rx='3.5' ry='3' fill='%236B9E6B'/%3E%3Cellipse cx='32' cy='28' rx='4' ry='3' fill='%236B9E6B'/%3E%3C!-- tail --%3E%3Cpath d='M20 32 L20 36 L22 34 Z' fill='%236B9E6B'/%3E%3C!-- head --%3E%3Cellipse cx='20' cy='10' rx='5' ry='6' fill='%236B9E6B'/%3E%3C!-- shell --%3E%3Cellipse cx='20' cy='22' rx='14' ry='10' fill='%235B8C5A'/%3E%3Cellipse cx='20' cy='21' rx='12' ry='8' fill='%234A7C49'/%3E%3C!-- shell pattern --%3E%3Cpath d='M14 19 L16 22 L12 22 Z' fill='%233B6B3A' opacity='0.5'/%3E%3Cpath d='M20 16 L18 20 L22 20 Z' fill='%233B6B3A' opacity='0.5'/%3E%3Cpath d='M26 19 L24 22 L28 22 Z' fill='%233B6B3A' opacity='0.5'/%3E%3Cpath d='M17 25 L20 27 L23 25 Z' fill='%233B6B3A' opacity='0.5'/%3E%3C!-- eyes --%3E%3Ccircle cx='17' cy='9' r='2' fill='%232F3640'/%3E%3Ccircle cx='23' cy='9' r='2' fill='%232F3640'/%3E%3Ccircle cx='17.5' cy='8.5' r='0.8' fill='white'/%3E%3Ccircle cx='23.5' cy='8.5' r='0.8' fill='white'/%3E%3C!-- smile --%3E%3Cpath d='M17 12 Q20 15 23 12' stroke='%232F3640' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 20 20, pointer;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}
