import React from "react";
import "./styles.css";
import cross from "../../assets/images/cross.svg";

const Popup = ({ title, setPopUp, children, bgColor }) => {
	return (
		<div style={{ background: (bgColor && bgColor) || "" }} className="popup">
			<div className="popup__inner">
				<div className="popup__header">
					<p>{title}</p>
					<img
						onClick={() => setPopUp(false)}
						className="pointer"
						src={cross}
						alt=""
					/>
				</div>
				<div className="popup__body">{children}</div>
			</div>
		</div>
	);
};

export default Popup;
