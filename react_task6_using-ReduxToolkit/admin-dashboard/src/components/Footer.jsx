import React from "react";

function Footer() {
  return (
    <footer
      className="bg-dark text-light text-center p-3 mt-5"
      style={{
        bottom: "0",
        width: "100%",
        position: "fixed",
      }}
    >
      <p>&copy; 2023 My App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
