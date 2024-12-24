"use client";
import React from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MiniDashboardButtons = ({ user }) => {
  const handleClick = (e) => {
    const authorized = ["admin", "clubAdmin"].includes(user.role);

    if (!authorized) {
      e.preventDefault();
      if (
        confirm(
          "You are not authorized to create events. Do you want to contact the Qlusion team to change this?",
        )
      ) {
        window.open(
          `mailto:qlusion.scu@gmail.com?subject=Request%20to%20add%20user:%20${user.id}%20to%20admin%20group`,
          "_blank",
        );
        alert(
          "Redirecting you to email... Please don't change the subject line.",
        );
      }
    }
  };

  return (
    <nav>
      {user?.clubs.length > 0 && (
        <span className="menu first">
          <Link href={`/my_events`} onClick={handleClick}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <span className="text">My Events</span>
          </Link>
        </span>
      )}
      <span className="menu">
        <Link href="/my_events/new" onClick={handleClick}>
          <FontAwesomeIcon icon={faCalendarPlus} />
          <span className="text">New Event</span>
        </Link>
      </span>
    </nav>
  );
};

MiniDashboardButtons.propTypes = {
  user: propTypes.object,
};

export default MiniDashboardButtons;
