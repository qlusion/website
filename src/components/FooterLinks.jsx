"use client";

import React from "react";
import { AppContext } from "@/lib/Providers";
import { useSession, signIn, signOut } from "next-auth/react";

const FooterLinks = () => {
  const { setMainContent } = React.useContext(AppContext);
  const session = useSession();

  return (
    <section>
      <h2>Links</h2>
      <ul>
        <li>
          <a href="#" onClick={() => setMainContent("events")}>
            Events
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setMainContent("clubs")}>
            Clubs
          </a>
        </li>
        <li>
          {session.status !== "authenticated" ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              Sign In
            </a>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </a>
          )}
        </li>
      </ul>
    </section>
  );
};

export default FooterLinks;
