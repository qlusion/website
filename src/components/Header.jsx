import React from "react";
import MenuButton from "./MenuButton";
import AuthButton from "./AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendar,
  faRocket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Header() {
  const session = await auth();
  let user = null;

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        clubs: true,
      },
    });
  }

  return (
    <header>
      <Link href="/">
        <h1>
          <FontAwesomeIcon icon={faRocket} />
          Qlusion
        </h1>
      </Link>
      <nav>
        <MenuButton icon={faCalendar} content="events" />
        <MenuButton icon={faUsers} content="clubs" />
        <AuthButton />
        <MenuButton icon={faBars} menu="menu" />
      </nav>
      {session && (
        <p>
          Hello, {user?.name}!{" "}
          {user?.clubs.length > 0 ? (
            <>
              You&apos;re admin for {user.clubs.length} event(s).{" "}
              <Link href={`/my_events`}>Click here</Link> to manage them.
            </>
          ) : user?.role === "admin" || user?.role === "clubAdmin" ? (
            <>
              <Link href="/my_events/new">Create an event</Link> to get started.
            </>
          ) : (
            <>
              You don&apos;t have rights to create an event.
              <br />
              Should this be changed?{" "}
              <a href="mailto:support@qlusion.com">Contact Qlusion</a>.
            </>
          )}
        </p>
      )}
    </header>
  );
}
