import React from "react";
import "./styles.css";
import cross from "../../assets/images/cross.svg";

const Popup = ({ title, setPopUp, children }) => {
	return (
		<div className="popup">
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
