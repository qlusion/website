"use client";

import React from "react";
import PropTypes from "prop-types";

const Delete = ({ onDelete }) => {
  const [deleting, setDeleting] = React.useState(false);
  return (
    <button
      className="danger"
      onClick={(e) => {
        e.preventDefault();
        if (deleting) {
          e.stopPropagation();
          return;
        }
        setDeleting(true);
        onDelete();
      }}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
};

Delete.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default Delete;
