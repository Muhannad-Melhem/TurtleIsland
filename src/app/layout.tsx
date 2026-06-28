import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Turtle Island",
  description: "A cozy, magical experience",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF8ED",
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function show(msg){var o=document.getElementById("turtle-errors");if(!o){o=document.createElement("div");o.id="turtle-errors";o.style.cssText="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:rgba(0,0,0,.85);color:#ff6b6b;padding:16px;font-size:13px;font-family:monospace;max-height:40vh;overflow:auto;white-space:pre-wrap";document.body.appendChild(o)}var p=document.createElement("pre");p.style.cssText="margin:0 0 8px;line-height:1.4";p.textContent=msg;o.appendChild(p)}try{var orig=window.onerror;window.onerror=function(m,s,l,c,e){show("JS Error: "+(e?e.stack:e&&e.message?e.message:m));if(orig)return orig(m,s,l,c,e)};window.addEventListener("unhandledrejection",function(e){show("Unhandled Rejection: "+(e.reason?e.reason.stack||e.reason:"?"))})}catch(e){console.error("[DIAG]",e)}})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
