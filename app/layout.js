import "./globals.css";
import LenisScroll from "../components/LenisScroll";

export const metadata = {
  title: "Yashvardhan Khanna | The Vinyl Vault Portfolio",
  description: "An interactive vinyl record room showcasing Yashvardhan Khanna's cloud engineering, serverless SaaS applications, devops automation, and IoT security projects.",
  keywords: "Yashvardhan Khanna, Cloud Computing, Next.js, AWS, DevOps, Serverless, LoRa E2EE, Portfolio, Software Engineer",
  authors: [{ name: "Yashvardhan Khanna" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased dark">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-300 font-sans antialiased selection:bg-amber-900/30 selection:text-amber-200">
        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
