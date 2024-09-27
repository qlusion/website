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
import "@/scss/index.scss";

export const metadata = {
  title: "Qlusion",
  description:
    "Qlusion: the scheduling solution for SCU clubs, student organizations, and more.",
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
