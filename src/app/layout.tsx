import type { Metadata } from "next";
import { Poppins, Inter, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tayyaba Saddique | Front-End Web Developer",
  description:
    "Transforming Ideas into Beautiful, Responsive & Interactive Web Experiences. Portfolio of Tayyaba Saddique — Front-End Web Developer from Nowshera, Pakistan.",
  keywords: [
    "Tayyaba Saddique",
    "Front-End Developer",
    "Web Developer",
    "Portfolio",
    "React.js",
    "Tailwind CSS",
    "JavaScript",
    "HTML",
    "CSS",
    "Responsive Design",
    "Nowshera",
  ],
  authors: [{ name: "Tayyaba Saddique" }],
  icons: { icon: "/profile.jpg" },
  openGraph: {
    title: "Tayyaba Saddique | Front-End Web Developer",
    description:
      "Transforming Ideas into Beautiful, Responsive & Interactive Web Experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}