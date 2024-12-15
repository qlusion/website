import React from "react";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AppProvider } from "@/lib/Providers";
import { auth } from "@/lib/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/index.css";

export const metadata = {
  title: "Qlusion",
  description:
    "Qlusion: the scheduling solution for SCU clubs, student organizations, and more.",
  meta: {
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <div id="root" className="container">
          <AppProvider session={session}>
            <Header />
            {children}
            <Footer />
          </AppProvider>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
