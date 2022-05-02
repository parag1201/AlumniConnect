import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import { useLocation } from "react-router-dom";
import UserCard from "./UserCard";
import { getUsers, getUsersByType } from "../../actions/users";
import { closeSideNav } from "../../actions/alert";

const Profiles = ({
	getUsers,
	closeSideNav,
	getUsersByType,
	user: { users, loading },
}) => {
	const [query, setQuery] = useState("");
	const [studentCount, setStudentCount] = useState(0);
	const [facultyCount, setFacultyCount] = useState(0);
	const [alumniCount, setAlumniCount] = useState(0);
	const [adminCount, setAdminCount] = useState(0);

	useEffect(() => {
		closeSideNav();
		setStudentCount(getUsersByType("student"));
		setAlumniCount(getUsersByType("alumni"));
		setFacultyCount(getUsersByType("faculty"));
		setAdminCount(getUsersByType("admin"));
	}, []);

	useEffect(() => {
		getUsers(query);
	}, [query]);

	const onSubmit = () => {
		console.log(query);
		getUsers(query);
	};

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1
						className="large text-primary"
						style={{ textAlign: "center" }}
					>
						Members
					</h1>
					<p className="lead" style={{ textAlign: "center" }}>
						<i className="fab fa-connectdevelop"></i>Browse and
						connect with members
					</p>
					<div className="search-div">
						<form
							method="get"
							className="col-12 search-form"
							onSubmit={() => onSubmit()}
						>
							<input
								type="text"
								name="query"
								id="search-box"
								placeholder="Search Members..."
								className="col-9 search-input posts-top-item"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<input
								type="submit"
								value="Search"
								className="btn btn-primary col-3 posts-top-item"
								onSubmit={() => onSubmit()}
							/>
						</form>
					</div>
					<div
						className="user-type-stats"
						style={{ textAlign: "center" }}
					>
						<ul className="profile-stats">
							<li className="profile-stat-count user-type-count">
								<span className="profile-stat-count">
									Alumni{" "}
								</span>
								<span>164</span>
							</li>
							<li className="profile-stat-count user-type-count">
								<span className="profile-stat-count">
									Faculty
								</span>{" "}
								<span>164</span>
							</li>
							<li className="profile-stat-count user-type-count">
								<span className="profile-stat-count">
									Students
								</span>{" "}
								<span>164</span>
							</li>
							<li className="profile-stat-count user-type-count">
								<span className="profile-stat-count">
									Admin
								</span>{" "}
								<span>164</span>
							</li>
						</ul>
					</div>
					<h5
						className="row ml-5 pb-2 mt-5"
						style={{ textAlign: "center" }}
					>
						{users && users.length} users found
					</h5>
					<div className="container profile-page grid-container">
						{users && users.length > 0 ? (
							users.map((user) => {
								return (
									<UserCard key={user._id} profile={user} />
								);
							})
						) : (
							<h4 style={{ textAlign: "center" }}>
								No Profiles Found
							</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	user: PropTypes.object.isRequired,
	getUsers: PropTypes.func.isRequired,
	closeSideNav: PropTypes.func.isRequired,
	getUsersByType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, {
	getUsers,
	closeSideNav,
	getUsersByType,
})(Profiles);
