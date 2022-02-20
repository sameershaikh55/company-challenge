import React from "react";
import "./styles.css";
import clientIcon from "../../../assets/images/clientIcon.svg";

const Assignment = () => {
	return (
		<div className="user__assignment">
			<div className="user__assignment__header">
				<img src={clientIcon} alt="" />
				<button>Complete</button>
			</div>
			<br />
			<br />
			<div className="user__assignment__body">
				<div className="user__assignment__body__left">
					<div className="user__assignment__body__left__inner">
						<h2>AssignmentTitle</h2>

						<div>
							<p>AssignmentDescription</p>
							<br />
							<br />
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
								tempor, neque vel euismod finibus, enim mauris viverra nibh, id
								finibus nulla neque sed diam.
							</p>
							<br />
							<br />
							<p>
								Donec ut iaculis odio. Phasellus quis urna sapien. Lorem ipsum
								dolor sit amet, consectetur adipiscing elit. Etiam vel blandit
								sem.
							</p>
							<br />
							<br />
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
								tempor, neque vel euismod finibus, enim mauris viverra nibh, id
								finibus nulla neque sed diam.
							</p>
							<br />
							<br />
							<p>
								Donec ut iaculis odio. Phasellus quis urna sapien. Lorem ipsum
								dolor sit amet, consectetur adipiscing elit. Etiam vel blandit
								sem.
							</p>
						</div>
					</div>
				</div>
				<div className="user__assignment__body__right">
					<div className="user__assignment__body__right__inner">
						<div className="user__assignment__body__right__inner__img"></div>
						<br />
						<p>AsignmentQuestion</p>
						<br />
						<p>
							Mauris gravida sapien quis risus ultricies condimentum. Cras eu
							lacus nunc. Proin congue mi tortor, eu vehicula nisl suscipit
							quis. Quisque a metus commodo, volutpat risus ut, iaculis elit.
							Vestibulum convallis vestibulum ante. Curabitur sagittis mollis mi
							ac cursus. Fusce massa diam, tincidunt eget arcu eu, convallis
							vehicula ipsum.{" "}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Assignment;
