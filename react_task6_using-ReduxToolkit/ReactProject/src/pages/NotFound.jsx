import React from "react";

function NotFound() {
  return (
    <div
      className="container mt-5"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="text-center text-danger alert alert-danger">
        404 - Page Not Found
      </h1>
      <p className="text-center">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
