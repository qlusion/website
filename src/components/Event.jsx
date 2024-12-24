"use client";

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faCalendar,
  faCircleInfo,
  faClock,
  faLocationArrow,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "@/lib/Providers";
import Link from "next/link";

export default function Event({ event }) {
  const { session } = useContext(AppContext);
  const hasAdminAccess =
    session && event.admins?.some((user) => user.email === session.user.email);

  return (
    <article className="event">
      <h3>{event.name || "Error Loading Club Name"}</h3>
      <ul>
        {event.category && <li>{event.category.name}</li>}
        {event.day && (
          <li>
            <FontAwesomeIcon icon={faCalendar} fixedWidth />
            {event.day}
          </li>
        )}
        {event.time && (
          <li>
            <FontAwesomeIcon icon={faClock} fixedWidth />
            {event.time}
          </li>
        )}
        {event.location && (
          <li>
            <FontAwesomeIcon icon={faLocationArrow} fixedWidth />
            {event.location}
          </li>
        )}
        {event.audience && (
          <li>
            <FontAwesomeIcon icon={faUsers} fixedWidth />
            {event.audience === "faculty" ? "Faculty/Staff" : event.audience}
          </li>
        )}
        {event.admins.length && (
          <li>
            <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
            {event.admins.map((admin) => (
              <a
                href={`mailto:${admin.email}`}
                className="event-contact"
                key={admin.id}
              >
                {admin.email}
              </a>
            ))}
          </li>
        )}
      </ul>
      <div className="img-container">
        <Image
          src={event.picture ? event.picture : "/img/default.jpg"}
          alt={event.name}
          width={150}
          height={200}
        />
      </div>
      {event.short_description && <p>{event.short_description}</p>}
      {hasAdminAccess && (
        <Link className="button" href={`/my_events/edit/${event.id}`}>
          Edit
        </Link>
      )}
    </article>
  );
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
};
