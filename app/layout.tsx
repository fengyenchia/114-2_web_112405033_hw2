import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "尋找你的靈魂色彩",
  description: "Yen-Chia's Personality Quizzes",
  icons: {
    icon: "/avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="custom-scrollbar min-h-full h-full flex flex-col bg-[url(/images/bg3.png)] bg-cover bg-center bg-no-repeat overflow-y-scroll">

      <div className="custom-scrollbar max-w-160 w-full h-screen mx-auto my-auto px-6 sm:px-10 py-12 lg:py-8 md:my-12 bg-white/10 flex flex-col justify-center rounded-lg shadow-lg hover:scale-101 transition-all duration-500 overflow-y-scroll">
        {children}
      </div>
        
      </body>
    </html>
  );
}
