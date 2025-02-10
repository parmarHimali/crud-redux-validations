import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-5 d-flex flex-column align-items-center gap-2">
      <h1 className="heading text-muted">Oops! 404 Page not found.</h1>
      <Link to={"/"}>
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
