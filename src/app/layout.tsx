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
  <html
    lang="en"
    className={clsx("w-full h-full overflow-hidden", robotoCondensed.className)}
  >
    <body className="h-full w-full overflow-auto overflow-x-hidden">
      <main className="flex flex-col h-full w-full">
        {children}
        <footer className="flex items-end justify-center p-2 bg-linear-180 from-[3%] from-green-500 to-gray-800 to-[177%] h-[50px] lg:h-[150px] w-full shrink-0">
          <p className="text-sm text-center">
            © the Brayayin, {new Date().getFullYear()} - All rights reserved.
          </p>
        </footer>
      </main>
    </body>
  </html>
);

export { RootLayout as default, metadata, robotoCondensed };
