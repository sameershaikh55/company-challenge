import React from "react";
import "./styles.css";

const Footer = ({ assignment_view }) => {
  const year = new Date().getFullYear();

  return (
    <div className={`${(assignment_view && "minus_padding") || "footer"}`}>
      <a
        href="https://faktor22.nl"
        target="_blank"
        style={{ color: "#00000087", paddingRight: "0.4rem" }}
      >
        Ⓒ
      </a>
      Company Challenges {year}
    </div>
  );
};

export default Footer;
