import React from "react";
import { Link } from "react-router-dom";

const ReuseButton = ({ title, direction, variant }) => {
  return (
    <div>
      <Link
        to={direction}
        variant={variant}
        className="btn btn-primary mb-2 col-auto"
      >
        {title}
      </Link>
    </div>
  );
};

export default ReuseButton;
