import { cn } from "@/lib/utils"

type OrganicShapeProps = {
  className?: string
  variant?: "blob1" | "blob2" | "blob3" | "blob4"
  color?: string
}

const paths: Record<string, string> = {
  blob1: "M30,-40 C50,-30 70,-10 65,15 C60,40 30,55 0,55 C-30,55 -60,40 -65,15 C-70,-10 -50,-30 -30,-40 C-10,-50 10,-50 30,-40Z",
  blob2: "M40,-45 C55,-30 65,-10 60,15 C55,35 35,50 10,55 C-15,60 -40,50 -55,30 C-70,10 -65,-15 -50,-35 C-35,-55 -15,-60 5,-55 C20,-50 30,-48 40,-45Z",
  blob3: "M25,-35 C45,-25 60,-5 55,20 C50,45 25,55 0,55 C-25,55 -50,45 -55,20 C-60,-5 -45,-25 -25,-35 C-5,-45 5,-45 25,-35Z",
  blob4: "M35,-40 C50,-30 65,-5 60,20 C55,45 35,60 10,60 C-15,60 -40,50 -55,30 C-70,10 -65,-15 -50,-35 C-35,-55 -15,-60 0,-55 C15,-50 25,-45 35,-40Z",
}

function OrganicShape({
  className,
  variant = "blob1",
  color = "fill-ocean/10",
}: OrganicShapeProps) {
  return (
    <svg
      viewBox="-70 -70 140 140"
      className={cn("pointer-events-none h-32 w-32", color, className)}
      aria-hidden
    >
      <path d={paths[variant]} />
    </svg>
  )
}

export { OrganicShape }
