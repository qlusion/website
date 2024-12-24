"use client";

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "@/lib/Providers";
import FiltersMenu from "./FiltersMenu";
import Events from "./Events";

export default function Main({ data }) {
  const {
    date,
    mainContent,
    filtersMenu,
    filteredEvents,
    setFilteredEvents,
    audience,
  } = useContext(AppContext);
  const [allEvents, setAllEvents] = useState(data);
  const [categories, setCategories] = useState(["All"]);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

  useEffect(() => {
    const currentEvents = data.filter(
      (event) =>
        event.day === dayOfWeek &&
        (audience === "all" ? true : event.audience === audience) &&
        (categories.includes("All")
          ? true
          : categories.includes(event.category.name)),
    );
    setAllEvents(currentEvents);
    setFilteredEvents(currentEvents);
  }, [date, dayOfWeek, data, audience, categories]);

  const isToday = date.toDateString() === new Date().toDateString();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "America/Los_Angeles",
  });

  const toggleCategory = (category) => {
    if (category === "All") {
      setCategories(["All"]);
      setFilteredEvents(allEvents);
    } else {
      const updatedCategories = categories.includes("All")
        ? [category]
        : categories.includes(category)
          ? categories.filter((c) => c !== category && c !== "All")
          : [...categories, category];
      if (updatedCategories.length === 0) {
        updatedCategories.push("All");
      }
      setCategories(updatedCategories);
      setFilteredEvents(
        allEvents.filter((event) =>
          updatedCategories.some((c) => event.category.name === c),
        ),
      );
    }
  };

  const allCategories = [
    "All",
    "Academic & Professional",
    "Business",
    "Cultural",
    "Engineering",
    "Faith-Based",
    "Performance Arts",
    "Recreational",
    "Service",
    "Social Justice",
    "Special Interest",
  ];

  return (
    <>
      {mainContent === "events" && (
        <nav className="categories">
          <ul>
            {allCategories.map((category) => (
              <li
                key={category}
                onClick={() => toggleCategory(category)}
                className={categories.includes(category) ? "active" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </nav>
      )}
      <h2>
        {mainContent === "events" ? "Events" : "Clubs"}
        <span
          className="date"
          style={mainContent !== "events" ? { visibility: "hidden" } : {}}
        >{` ${isToday ? "Today" : dayOfWeek}, ${formattedDate}`}</span>
      </h2>
      <section className="content">
        {mainContent === "events" && (
          <>
            {data !== null ? (
              <Events events={filteredEvents} />
            ) : (
              <p>Loading events...</p>
            )}
            {filtersMenu && <FiltersMenu allEvents={allEvents} />}
          </>
        )}
        <iframe
          className={mainContent === "events" ? "hidden" : ""}
          src="https://airtable.com/embed/appe9g0nayQGaEwk3/shr0cCfcwDyg7lRur?viewControls=on"
          frameBorder="0"
          width="100%"
          height="675"
        />
      </section>
    </>
  );
}

Main.propTypes = {
  data: PropTypes.array,
};
