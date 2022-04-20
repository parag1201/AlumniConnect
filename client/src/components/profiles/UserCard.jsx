import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
	makeAdmin,
	removeAdmin,
	blockUser,
	unblockUser,
} from "../../actions/users";
import { connect } from "react-redux";

const UserCard = ({
	auth: { authUser, loadingAuth },
	profile,
	makeAdmin,
	removeAdmin,
	blockUser,
	unblockUser,
}) => {
	return (
		<div className="profile-card bg-light">
			<div className="col-2 profile-card-img">
				<img src={profile.avatar} alt="" className="round-img" />
				{profile.isAdmin && (
					<span className="tag">{profile.adminType} Admin</span>
				)}
			</div>
			<div className="col-4">
				<h2>{profile.name}</h2>
				<h5 className="tag">{profile.role}</h5>
				{!profile.isAdmin &&
					!loadingAuth &&
					authUser.isAdmin &&
					authUser.adminType === "head" && (
						<button
							className="btn btn-secondary"
							onClick={() => makeAdmin(profile._id)}
						>
							Make Admin
						</button>
					)}
				{profile.isAdmin &&
					profile.adminType === "sub" &&
					!loadingAuth &&
					authUser.isAdmin &&
					authUser.adminType === "head" && (
						<button
							className="btn btn-secondary"
							onClick={() => removeAdmin(profile._id)}
						>
							Remove Admin
						</button>
					)}
				{!loadingAuth &&
					authUser.isAdmin &&
					authUser.adminType === "head" &&
					!profile.blocked && profile.adminType !== "head" && (
						<button
							className="btn btn-danger"
							onClick={() => blockUser(profile._id)}
						>
							Block
						</button>
					)}

				{!loadingAuth &&
					authUser.isAdmin &&
					authUser.adminType === "head" &&
					profile.blocked && (
						<button
							className="btn btn-primary"
							onClick={() => unblockUser(profile._id)}
						>
							UnBlock
						</button>
					)}

				{/* <p>
					{status} {company && <span> at {company}</span>}
				</p> */}
				{/* <p className="my-1">{location && <span>{location}</span>}</p> */}
				{/* <Link to={`/profile/${_id}`} className="btn btn-primary">
					View Profile
				</Link> */}
			</div>
			{/* <div className="col-3">
				<ul className="skills-list">
					{skills.map((skill, index) => (
						<li key={index} className="text-primary">
							<i className="fas fa-check"></i> {skill}
						</li>
					))}
				</ul>
			</div> */}

			<div className="col-3"></div>
		</div>
		// <div className="col-xl-6 col-lg-7 col-md-12">
		// 	<div className="card profile-header">
		// 		<div className="body">
		// 			<div className="row">
		// 				<div className="col-lg-4 col-md-4 col-12">
		// 					<div className="profile-image float-md-right">
		// 						{" "}
		// 						<img src={profile.avatar} alt="" />{" "}
		// 					</div>
		// 				</div>
		// 				<div className="col-lg-8 col-md-8 col-12">
		// 					<h4 className="m-t-0 m-b-0">
		// 						<strong>{profile.name}</strong>
		// 					</h4>
		// 					<span className="job_post">Ui UX Designer</span>
		// 					<p>
		// 						795 Folsom Ave, Suite 600 San Francisco, CADGE
		// 						94107
		// 					</p>
		// 					<div>
		// 						<button className="btn btn-primary btn-round">
		// 							Follow
		// 						</button>
		// 						<button className="btn btn-primary btn-round btn-simple">
		// 							Message
		// 						</button>
		// 					</div>
		// 					<p className="social-icon m-t-5 m-b-0">
		// 						<a title="Twitter">
		// 							<i className="fa fa-twitter"></i>
		// 						</a>
		// 						<a title="Facebook">
		// 							<i className="fa fa-facebook"></i>
		// 						</a>
		// 						<a
		// 							title="Google-plus"
		// 						>
		// 							<i className="fa fa-twitter"></i>
		// 						</a>
		// 						<a title="Behance">
		// 							<i className="fa fa-behance"></i>
		// 						</a>
		// 						<a title="Instagram">
		// 							<i className="fa fa-instagram "></i>
		// 						</a>
		// 					</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

UserCard.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	makeAdmin: PropTypes.func.isRequired,
	removeAdmin: PropTypes.func.isRequired,
	blockUser: PropTypes.func.isRequired,
	unblockUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	makeAdmin,
	removeAdmin,
	blockUser,
	unblockUser,
})(UserCard);
