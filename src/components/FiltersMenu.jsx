"use client";

import { React, useState, useContext } from "react";
import { AppContext } from "@/lib/Providers";

export default function FiltersMenu() {
  const { date, setDate, setMainContent, setFiltersMenu, setAudience } =
    useContext(AppContext);
  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const realYear = new Date().getFullYear();
  const years = [realYear, realYear + 1];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dayOfTheWeek = (month, year, day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date(year, month, day).getDay()];
  };

  const generateDays = () => {
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const days = [];

    for (let i = 1; i <= totalDays; i++) {
      const row = Math.ceil((i + firstDay) / 7) + 1;
      days.push(
        <label
          key={i}
          onClick={() => handleDayChange(i, selectedMonth, selectedYear)}
          className={
            selectedDay === i &&
              selectedMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
              ? "active " + dayOfTheWeek(selectedMonth, selectedYear, i)
              : dayOfTheWeek(selectedMonth, selectedYear, i)
          }
          style={{ gridRow: row }}
        >
          <input type="radio" name={`day`} />
          {i}
        </label>,
      );
    }
    return days;
  };

  const calendarHeaders = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.map((day) => (
      <p key={day} className={day} style={{ gridRow: "1" }}>
        {day.slice(0, 3)}
      </p>
    ));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(months.indexOf(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleDayChange = (day, month, year) => {
    if (window.innerWidth <= 800) {
      setFiltersMenu(false);
    }
    setSelectedDay(day);
    setDate(new Date(year, month, day));
    setMainContent("events");
  };

  const changeToToday = (e) => {
    e.preventDefault();
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setSelectedDay(today.getDate());
    setDate(today);
    setMainContent("events");
    if (window.innerWidth <= 800) {
      setFiltersMenu(false);
    }
  };
  return (
    <aside className="container filters">
      <h3>Sort Events</h3>
      <p>Select the events you want to see</p>
      <label className="h4">
        Audience
        <select
          onChange={(e) => {
            setAudience(e.target.value);
          }}
        >
          <option value="all">Any</option>
          <option value="students">Students</option>
          <option value="faculty">Faculty/Staff</option>
          <option value="athletics">Athletics</option>
          <option value="community">Community</option>
        </select>
      </label>
      <form method="POST" id="calendarForm">
        <h4>Date</h4>
        <select
          aria-label="month"
          name="month"
          value={months[selectedMonth]}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          aria-label="year"
          name="year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div id="calendar">
          {calendarHeaders()}
          {generateDays()}
        </div>
        <button onClick={changeToToday}>Today</button>
      </form>
    </aside>
  );
}
