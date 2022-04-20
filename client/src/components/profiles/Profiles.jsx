import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import UserCard from "./UserCard";
import { getUsers } from "../../actions/users";
import { closeSideNav } from "../../actions/alert";

const Profiles = ({ getUsers, closeSideNav, user: { users, loading } }) => {
	useEffect(() => {
		getUsers();
	}, [getUsers]);

	/* const getUsersRows = () => {
		return !loading && users !== null && users.splice(0, 2);
	};

	var rows = getUsersRows(); */
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
						<form method="get" className="col-12 search-form">
							<input
								type="text"
								name="query"
								id="search-box"
								placeholder="Search Members..."
								className="col-9 search-input posts-top-item"
							/>
							<input
								type="submit"
								value="Search"
								className="btn btn-primary col-3 posts-top-item"
							/>
						</form>
					</div>
					<div className="container profile-page">
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
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, {
	getUsers,
	closeSideNav,
})(Profiles);
