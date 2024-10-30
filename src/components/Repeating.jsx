"use client";

import React from "react";
import PropTypes from "prop-types";

const Repeating = ({ repeating, endDate }) => {
  const [showEnd, setShowEnd] = React.useState(repeating !== "NEVER");

  return (
    <>
      <label>
        Repeating:
        <select
          onChange={(e) => setShowEnd(e.target.value !== "NEVER")}
          name="repeating"
          defaultValue={repeating}
        >
          <option value="NEVER">Never (1-time event)</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </label>
      <label style={{ display: showEnd ? "block" : "none" }}>
        End Date:
        <input
          type="date"
          name="endDate"
          defaultValue={
            endDate ||
            new Date(new Date().getFullYear(), 11, 31)
              .toISOString()
              .split("T")[0]
          }
          required={showEnd}
        />
      </label>
    </>
  );
};

Repeating.propTypes = {
  repeating: PropTypes.string,
  endDate: PropTypes.string,
};

export default Repeating;
