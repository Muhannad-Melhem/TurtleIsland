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
            __html: `(function(){try{window.__turtleErrors=[];var orig=window.onerror;window.onerror=function(msg,url,line,col,err){window.__turtleErrors.push({msg:msg,url:url,line:line,col:col,err:err?err.stack:""});if(orig)return orig(msg,url,line,col,err)};var r=window.addEventListener;window.addEventListener=function(type,handler,capture){if(type==="error"){var origHandler=handler;handler=function(e){window.__turtleErrors.push({msg:"UnhandledRejection",err:e.reason?e.reason.stack||e.reason:"unknown"});if(origHandler)origHandler(e)};handler._orig=origHandler}return r.call(window,type,handler,capture)};var o=document.createElement("div");o.id="turtle-errors";o.style.cssText="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:rgba(0,0,0,.85);color:#ff6b6b;padding:16px;font-size:13px;font-family:monospace;max-height:40vh;overflow:auto;white-space:pre-wrap;display:none";document.body.appendChild(o)}catch(e){console.error("DIAG:",e)}})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
