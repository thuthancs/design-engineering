import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "100 days of design engineering",
  description:
    "I'm Thu. This is my 100 days of design engineering — Daily UI Challenge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${GeistMono.variable} ${GeistSans.variable}`}
    >
      <body>
        <div className="site-shell">
          <div className="site-content">{children}</div>
          <footer className="site-footer" role="contentinfo">
            <p className="site-footerText">
              MADE WITH 💛 AND LOTS OF COFFEE BY THU THAN
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
