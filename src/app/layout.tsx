import { type Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { MatrixRain } from "@/components/matrix-rain";
import { SearchProvider } from "@/components/search-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "system-logs",
  description: "Personal systems engineering field manual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="scanlines bg-black text-terminal-green font-mono min-h-screen antialiased">
        <MatrixRain />
        <div className="relative max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-6 lg:px-10 py-8">
          {/* Classification banner */}
          <div className="text-center mb-4 select-none">
            <span className="text-terminal-red/80 text-[0.6rem] tracking-[0.3em] uppercase text-glow-red">
              &#x2588;&#x2588; top secret {"// eyes only //"} classified &#x2588;&#x2588;
            </span>
          </div>
          <div className="flex items-center justify-between mb-10 border-b border-dashed border-terminal-green/40 pb-4">
            <Nav />
            <SearchProvider />
          </div>
          <main>{children}</main>
          <footer className="border-t border-dashed border-terminal-green/40 mt-16 pt-6 text-terminal-green/40 text-xs">
            <p>system-logs {"// "}{new Date().getFullYear()}</p>
            <p className="mt-1 text-terminal-red/60 text-[0.6rem] tracking-widest uppercase">
              unauthorized access will be logged and prosecuted
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
