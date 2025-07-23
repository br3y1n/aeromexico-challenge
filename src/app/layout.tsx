import clsx from "clsx";
import { Roboto_Condensed } from "next/font/google";
import { ReactNode } from "react";

import type { Metadata } from "next";

import "@styles/globals.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const metadata: Metadata = {
  title: "Aeroméxico challenge",
  description: "Explore Rick and Morty characters retrieved from a public API.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en" className={clsx("w-full h-full", robotoCondensed.className)}>
    <body className="h-full w-full">{children}</body>
  </html>
);

export { RootLayout as default, metadata, robotoCondensed };
