"use client";

import React from "react";
import PropTypes from "prop-types";

const Submit = ({ children, ...props }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const handleClick = (e) => {
    if (submitting) {
      e.preventDefault();
      e.stopPropagation();
      return;
    } else {
      if (e.target.form.checkValidity()) {
        setSubmitting(true);
        e.target.form.requestSubmit();
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      // onMouseDown={handleClick}
      disabled={submitting}
      {...props}
      type="submit"
    >
      {submitting ? "Submitting..." : children}
    </button>
  );
};

Submit.propTypes = {
  children: PropTypes.node,
};

export default Submit;
