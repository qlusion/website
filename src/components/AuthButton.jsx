"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <span className="menu" onClick={() => signOut()}>
        <FontAwesomeIcon icon={faRightFromBracket} fixedWidth />
        <span className="text">Sign out</span>
      </span>
    );
  }

  return (
    <span className="menu" onClick={() => signIn("google")}>
      <FontAwesomeIcon icon={faRightToBracket} fixedWidth />
      <span className="text">Sign in</span>
    </span>
  );
};

export default AuthButton;
