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
import Link from "next/link";

export default async function Header() {
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
    </header>
  );
}
