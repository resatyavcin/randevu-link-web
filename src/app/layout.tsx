import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Randevu Link",
  description: "İşletme randevu linki ile online randevu alın.",
};

/** İlk boyamadan önce çalışır: OS koyu/açık tercihi veya kayıtlı tema (flash önleme). */
const themeInitScript = `
(function(){
try{
var k="theme";
var s=localStorage.getItem(k);
var m=window.matchMedia("(prefers-color-scheme: dark)").matches;
var r=s==="light"||s==="dark"?s:(s==="system"||!s)?(m?"dark":"light"):"light";
var d=document.documentElement;
d.classList.remove("light","dark");
d.classList.add(r);
d.style.colorScheme=r;
}catch(e){}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <ThemeProvider>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
