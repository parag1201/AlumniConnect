import React from "react";
import PropTypes from "prop-types";
import { deleteAchievement } from "../../actions/extras";
import { connect } from "react-redux";

const AchievementCard = ({ data, deleteAchievement }) => {
	return (
		<div className="join-request-card achievement-card">
			<ul className="col-9 join-request-card-info">
				<li>
					<strong>Name : </strong>
					{data.name}
				</li>
				{"enrollment_number" in data ? (
					<li>
						<strong>Enrollment Number : </strong>
						<span style={{ textTransform: "uppercase" }}>
							{data.enrollment_number}
						</span>
					</li>
				) : (
					<React.Fragment />
				)}
				<li>
					<strong>Program: </strong>
					<span style={{ textTransform: "uppercase" }}>
						{data.program}
					</span>
				</li>
				<li>
					<strong>Pass out Year : </strong>
					{data.passing_year}
				</li>
				<li>
					<strong>Awards : </strong>
					{data.rewards}
				</li>
				<div className="row">
					<li className="mr-2 ml-3">
						<a target="_blank" href={data.imgUrl}>
							View Image
						</a>
					</li>
					<li className="ml-1">
						<a target="_blank" href={data.proofUrl}>
							View Certificate
						</a>
					</li>
				</div>
			</ul>
			<div className="col-3">
				<div className="action-buttons-request-card">
					<button
						className="row action-button-request-card reject-button"
						onClick={() => deleteAchievement(data._id)}
					>
						<i
							className="fa fa-times"
							aria-hidden="true"
							style={{ marginTop: "3px" }}
						></i>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

AchievementCard.propTypes = {
	data: PropTypes.object.isRequired,
	deleteAchievement: PropTypes.func.isRequired,
};

export default connect(null, { deleteAchievement })(AchievementCard);
