"use client";

import React from "react";
import PropTypes from "prop-types";

const Repeating = ({ repeating, endRepeat }) => {
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(repeating);
  console.log(repeating);

  return (
    <>
      <label>
        Repeating:
        <select
          onChange={(e) => setShowEndDatePicker(e.target.value)}
          name="repeating"
          defaultValue={repeating}
        >
          <option value="NEVER">Never (1-time event)</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </label>
      <label
        style={{ display: showEndDatePicker === "NEVER" ? "none" : "block" }}
      >
        Repeat Until:
        <input
          required={true}
          type="datetime-local"
          name="endRepeat"
          defaultValue={endRepeat}
          disabled={showEndDatePicker === "NEVER"}
        />
      </label>
    </>
  );
};

Repeating.propTypes = {
  repeating: PropTypes.string,
  endRepeat: PropTypes.string,
};

export default Repeating;
