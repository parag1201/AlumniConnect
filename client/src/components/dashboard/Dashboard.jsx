import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner.jsx";
import Experience from "./Experience";
import { getCurrentUserProfile } from "../../actions/users";
import { closeSideNav } from "../../actions/alert";
import DashboardActions from "./DashboardActions";
import Education from "./Education.jsx";

const Dashboard = ({ closeSideNav, auth: { authUser, loadingAuth } }) => {
	useEffect(() => {
		closeSideNav();
	}, [getCurrentUserProfile]);

	return (loadingAuth || authUser === null) ? (
		<Spinner />
	) : (
		<React.Fragment>
			<div className="head-area">
				<h1 className="large text-primary">Dashboard</h1>
				<p className="lead">
					<i className="fas fa-user" />
					Welcome {authUser && authUser.name}
				</p>
			</div>
			{authUser !== null ? (
				<div className="row">
					<div className="col-md-3">
						<DashboardActions />
					</div>
					<div className="col-md-9">
						<div className="user-info">
							<img
								className="round-img profile-card-img"
								src={authUser.avatar}
								alt="avatar"
							/>
							{authUser.name}
							{authUser.role === "student" && (
								<React.Fragment>
									Student @ IIITA
									{authUser.starting_year}-{authUser.passing_year}
									{authUser.program}
								</React.Fragment>
							)}
						</div>
						<Experience experience={authUser.experience} />
						<Education education={authUser.education} />
					</div>
				</div>
			) : (
				<React.Fragment>
					<p>You have not created a profile yet</p>
					<Link className="btn btn-primary my-1" to="/create-profile">
						Create Profile
					</Link>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	closeSideNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentUserProfile, closeSideNav })(
	Dashboard
);
