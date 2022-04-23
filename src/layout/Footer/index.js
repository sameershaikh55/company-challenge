import React from "react";
import "./styles.css";

const Footer = ({ assignment_view }) => {
	const year = new Date().getFullYear();

	return (
		<div className={`${(assignment_view && "minus_padding") || "footer"}`}>
			copyright Ⓒ {year}
		</div>
	);
};

export default Footer;
