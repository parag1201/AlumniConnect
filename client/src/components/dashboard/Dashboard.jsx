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

	return loadingAuth || authUser === null ? (
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
						<div
							className="row"
							style={{ padding: "1em 1em", margin: "1em 2em" }}
						>
							<div className="profile-image float-md-right">
								<img
									src={authUser.avatar}
									alt="avatar"
									style={{
										width: "100px",
										height: "100px",
										borderRadius: "50%",
									}}
								/>
							</div>
							<div>
								<p>
									<span
										style={{
											fontSize: "1.5rem",
											paddingLeft: "0.5em",
											paddingRight: "0.5em",
											marginLeft:"1em",
										}}
									>
										{authUser.name}
									</span>
								</p>
								<p>
									<span
										className="job_post"
										style={{
											fontSize: "1.5rem",
											paddingLeft: "0.5em",
											paddingRight: "0.5em",
											marginLeft:"1em",
											float: "right"
										}}
									>
										{authUser.role === "alumni" && (
											<span
												style={{
													textTransform: "capitalize",
												}}
											>
												{authUser.designation}
												{" @ "}
												{authUser.organisation}
											</span>
										)}

										{authUser.role === "student" &&
											"Student @ IIITA"}

										{authUser.role === "faculty" && (
											<span
												style={{
													textTransform: "capitalize",
												}}
											>
												{authUser.designation}
											</span>
										)}

										{authUser.role === "faculty" &&
											"@ Department of "}

										{authUser.role === "faculty" && (
											<span
												style={{
													textTransform: "uppercase",
												}}
											>
												{authUser.department}
											</span>
										)}
									</span>

									{authUser.role === "student" && (
										<p>
											{authUser.starting_year}-
											{authUser.passing_year}
										</p>
									)}

									{authUser.role === "alumni" && (
										<div>
											<p style={{ marginBottom: "0" }}>
												{authUser.location}
											</p>
											{/* <br/> */}
											<p>
												{"Alumni @ IIITA"}
												{" ( "}
												{authUser.passing_year}
												{" Passout )"}
											</p>
										</div>
									)}
								</p>
							</div>
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

export default connect(mapStateToProps, {
	getCurrentUserProfile,
	closeSideNav,
})(Dashboard);
