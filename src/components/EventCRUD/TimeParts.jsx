import React from "react";
import propTypes from "prop-types";

const TimeParts = ({ event, type, title = "Time:" }) => {
  const hour = event?.[`${type}Hour`] || 12;
  const minute = event?.[`${type}Minute`] || 0;
  const period = event?.[`${type}Period`] || "AM";

  return (
    <label>
      {title}
      <div className="time-parts">
        <select name={`${type}Hour`} required defaultValue={hour}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select name={`${type}Minute`} required defaultValue={minute || "00"}>
          {Array.from({ length: 13 }, (_, i) => i * 5).map((minute) => (
            <option key={minute} value={minute}>
              {minute < 10 ? `0${minute}` : minute}
            </option>
          ))}
        </select>
        <select name={`${type}Period`} required defaultValue={period || "AM"}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </label>
  );
};

TimeParts.propTypes = {
  event: propTypes.object.isRequired,
  type: propTypes.string.isRequired,
  title: propTypes.string,
};

export default TimeParts;
