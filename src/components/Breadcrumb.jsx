import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            {breadcrumb.to ? (
              <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
