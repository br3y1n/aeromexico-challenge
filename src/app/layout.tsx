import type { Metadata } from "next";
import "@styles/globals.css";
import { ReactNode } from "react";

const metadata: Metadata = {
  title: "Aeroméxico challenge",
  description: "Explore Rick and Morty characters retrieved from a public API.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en" className="w-full h-full">
    <body className="h-full w-full">{children}</body>
  </html>
);

export { RootLayout as default, metadata };
