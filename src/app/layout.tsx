import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Ambient } from "@/components/site/Ambient";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://paste-co.de"),
  title: {
    default: "paste-co.de — Project archive",
    template: "%s — paste-co.de",
  },
  description:
    "A specialized educational repository for game security research, modding and software development. Browse community-contributed projects, offsets and guides.",
  icons: {
    icon: "/brand/icon.svg",
  },
  openGraph: {
    title: "paste-co.de — Project archive",
    description:
      "Game security research archive: projects, Roblox offsets, game updates and guides.",
    images: ["/brand/placeholder.svg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="h-full">
      <body className="min-h-full font-sans antialiased">
        <Ambient />
        <Header />
        {children}
      </body>
    </html>
  );
}
