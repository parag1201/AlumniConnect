import Icon from "awesome-react-icons";
import React, { useState, useEffect } from "react";
import JoinRequestCard from "../requests/JoinRequestCard";
import PostRequestCard from "../requests/PostRequestCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { getJoinRequests, getPostRequests } from "../../actions/request";
import Spinner from "../layouts/Spinner";
import AchievementCard from "../extras/AchievementCard";
import FeedbackCard from "../extras/FeedbackCard";
import Settings from "../layouts/Settings";
import Footer from "../layouts/Footer";

import {
	getAchievements,
	getFeedbacks,
	deleteAllAchievements,
	deleteAllFeedbacks,
} from "../../actions/extras";

const AdminDash = ({
	getJoinRequests,
	getPostRequests,
	getAchievements,
	getFeedbacks,
	deleteAllAchievements,
	deleteAllFeedbacks,
	request: { joinRequests, postRequests, loading },
	auth: { authUser },
	extras,
}) => {
	useEffect(() => {
		getJoinRequests();
		getPostRequests();
		getAchievements();
		getFeedbacks();
	}, []);

	// data and set data
	const [studentJoin, setStudentJoin] = useState(false);
	const [alumniJoin, setAlumniJoin] = useState(false);
	const [professorJoin, setProfessorJoin] = useState(false);
	const [studentPost, setStudentPost] = useState(false);
	const [alumniPost, setAlumniPost] = useState(false);
	const [professorPost, setProfessorPost] = useState(false);

	//show and not show
	const [showAllJoin, setShowAllJoin] = useState(true);
	const [showAllPost, setShowAllPost] = useState(false);
	const [showStudentJoin, setShowStudentJoin] = useState(false);
	const [showAlumniJoin, setShowAlumniJoin] = useState(false);
	const [showProfessorJoin, setShowProfessorJoin] = useState(false);
	const [showStudentPost, setShowStudentPost] = useState(false);
	const [showAlumniPost, setShowAlumniPost] = useState(false);
	const [showProfessorPost, setShowProfessorPost] = useState(false);
	const [showAchievements, setShowAchievements] = useState(false);
	const [showFeedbacks, setShowFeedbacks] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	const fields = [
		{ label: "ID", key: "_id" },
		{ label: "Name", key: "name" },
		{ label: "Enrollment number", key: "enrollment_number" },
		{ label: "Program", key: "program" },
		{ label: "Passing year", key: "passing_year" },
		{ label: "Awards", key: "rewards" },
		{ label: "Image Link", key: "imgUrl" },
		{ label: "Certificate Link", key: "proofUrl" },
	];

	const csvReport = {
		data: extras.achievements,
		headers: fields,
		filename: "achievements.csv",
	};

	// make 6 to 7 states stating that if current element is active or not if true then render with one class else render with another class and make css for both of those classes

	// handle loading state and spinner
	const [joinTabOpen, setJoinTabOpen] = useState(true);
	const [postTabOpen, setPostTabopen] = useState(false);

	const fillJoinRequests = (filter) => {
		if (joinRequests !== null) {
			const filteredRequests = joinRequests.filter(
				(req) => req.role === filter
			);

			switch (filter) {
				case "student":
					setStudentJoin(filteredRequests);
				case "alumni":
					setAlumniJoin(filteredRequests);
				case "professor":
					setProfessorJoin(filteredRequests);
			}
		}
	};

	const fillPostRequests = (filter) => {
		if (postRequests !== null) {
			const filteredRequests = postRequests.filter(
				(req) => req.role === filter
			);

			switch (filter) {
				case "student":
					setStudentPost(filteredRequests);
				case "alumni":
					setAlumniPost(filteredRequests);
				case "professor":
					setProfessorPost(filteredRequests);
			}
		}
	};

	const closeAllTabs = () => {
		setShowAllJoin(false);
		setShowAllPost(false);
		setShowAlumniJoin(false);
		setShowStudentJoin(false);
		setShowProfessorJoin(false);
		setShowAlumniPost(false);
		setShowStudentPost(false);
		setShowProfessorPost(false);
		setShowAchievements(false);
		setShowFeedbacks(false);
		setShowSettings(false);
	};

	return (
		<React.Fragment>
			<div className="my-container">
				<div
					className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0
				border-r-2 lg:translate-x-0 lg:static lg:inset-0 ease-out translate-x-0 col-3 admin-side-nav float-child"
				>
					<ul>
						<li
							className="admin-side-panel-subitem"
							onClick={() => {
								setJoinTabOpen(!joinTabOpen);
								closeAllTabs();
								setShowAllJoin(true);
							}}
						>
							<Icon name="user" />
							Join Requests
						</li>
						{joinTabOpen && (
							<React.Fragment>
								<li
									className="admin-side-panel-subitem panel-subsubitem"
									onClick={() => {
										fillJoinRequests("student");
										closeAllTabs();
										setShowStudentJoin(true);
									}}
								>
									Students
								</li>
								<li
									className="admin-side-panel-subitem panel-subsubitem"
									onClick={() => {
										fillJoinRequests("alumni");
										closeAllTabs();
										setShowAlumniJoin(true);
									}}
								>
									Alumni
								</li>
								<li
									className="admin-side-panel-subitem panel-subsubitem"
									onClick={() => {
										fillJoinRequests("professor");
										closeAllTabs();
										setShowProfessorJoin(true);
									}}
								>
									Professors
								</li>
							</React.Fragment>
						)}
					</ul>
					<ul>
						<li
							className="admin-side-panel-subitem"
							onClick={() => {
								setPostTabopen(!postTabOpen);
								closeAllTabs();
								setShowAllPost(true);
							}}
						>
							<Icon name="message-square" />
							Post Requests
						</li>
						{postTabOpen && (
							<React.Fragment>
								<li
									className="admin-side-panel-subitem panel-subsubitem"
									onClick={() => {
										fillPostRequests("student");
										closeAllTabs();
										setShowStudentPost(true);
									}}
								>
									Students
								</li>
								<li
									className="admin-side-panel-subitem panel-subsubitem"
									onClick={() => {
										fillPostRequests("alumni");
										closeAllTabs();
										setShowAlumniPost(true);
									}}
								>
									Alumni
								</li>
								<li
									className="admin-side-panel-subitem panel-subsubitem"
									onClick={() => {
										fillPostRequests("professor");
										closeAllTabs();
										setShowProfessorPost(true);
									}}
								>
									Professors
								</li>
							</React.Fragment>
						)}
					</ul>
					<ul>
						<li
							className="admin-side-panel-subitem"
							onClick={() => {
								closeAllTabs();
								setShowAchievements(true);
							}}
						>
							<Icon name="book" />
							Achievemnets
						</li>
					</ul>
					<ul>
						<li
							className="admin-side-panel-subitem"
							onClick={() => {
								closeAllTabs();
								setShowFeedbacks(true);
							}}
						>
							<Icon name="edit-pencil-simple" />
							Feedbacks/Queries
						</li>
					</ul>
					{authUser.adminType === "head" && (
						<ul>
							<li
								className="admin-side-panel-subitem"
								onClick={() => {
									closeAllTabs();
									setShowSettings(true);
								}}
							>
								<Icon name="settings" />
								Settings
							</li>
						</ul>
					)}
				</div>
				{showAllJoin ? (
					loading ? (
						<Spinner />
					) : (
						<React.Fragment>
							{joinRequests !== null &&
								joinRequests.length === 0 && (
									<div className="no-data-page">
										Nothing to show here
									</div>
								)}
							<div className="request-list-admin-dash float-child">
								{joinRequests !== null &&
									joinRequests.map((item) => {
										return (
											<JoinRequestCard
												key={item._id}
												request={item}
											/>
										);
									})}
							</div>
						</React.Fragment>
					)
				) : (
					<React.Fragment />
				)}

				{showStudentJoin && (
					<React.Fragment>
						{studentJoin.length === 0 && (
							<div className="request-list-admin-dash float-child no-data-page">
								Nothing to show here
							</div>
						)}
						<div className="request-list-admin-dash float-child">
							{studentJoin.map((item) => {
								return (
									<JoinRequestCard
										key={item._id}
										request={item}
									/>
								);
							})}
						</div>
					</React.Fragment>
				)}

				{showProfessorJoin && (
					<React.Fragment>
						{professorJoin.length === 0 && (
							<div className="request-list-admin-dash float-child no-data-page">
								Nothing to show here
							</div>
						)}
						<div className="request-list-admin-dash float-child">
							{professorJoin.map((item) => {
								return (
									<JoinRequestCard
										key={item._id}
										request={item}
									/>
								);
							})}
						</div>
					</React.Fragment>
				)}

				{showAlumniJoin && (
					<React.Fragment>
						{alumniJoin.length === 0 && (
							<div className="request-list-admin-dash float-child no-data-page">
								Nothing to show here
							</div>
						)}
						<div className="request-list-admin-dash float-child">
							{alumniJoin.map((item) => {
								return (
									<JoinRequestCard
										key={item._id}
										request={item}
									/>
								);
							})}
						</div>
					</React.Fragment>
				)}

				{showAllPost ? (
					loading ? (
						<Spinner />
					) : (
						<React.Fragment>
							{postRequests.length === 0 && (
								<div className="no-data-page">
									Nothing to show here
								</div>
							)}
							<div className="request-list-admin-dash float-child">
								{postRequests.map((item) => {
									return (
										<PostRequestCard
											key={item._id}
											request={item}
										/>
									);
								})}
							</div>
						</React.Fragment>
					)
				) : (
					<React.Fragment />
				)}

				{showStudentPost && (
					<React.Fragment>
						{studentPost.length === 0 && (
							<div className="request-list-admin-dash float-child no-data-page">
								Nothing to show here
							</div>
						)}
						<div className="request-list-admin-dash float-child">
							{studentPost.map((item) => {
								return (
									<PostRequestCard
										key={item._id}
										request={item}
									/>
								);
							})}
						</div>
					</React.Fragment>
				)}

				{showProfessorPost && (
					<React.Fragment>
						{professorPost.length === 0 && (
							<div className="request-list-admin-dash float-child no-data-page">
								Nothing to show here
							</div>
						)}
						<div className="request-list-admin-dash float-child">
							{professorPost.map((item) => {
								return (
									<PostRequestCard
										key={item._id}
										request={item}
									/>
								);
							})}
						</div>
					</React.Fragment>
				)}

				{showAlumniPost && (
					<React.Fragment>
						{alumniPost.length === 0 && (
							<div className="request-list-admin-dash float-child no-data-page">
								Nothing to show here
							</div>
						)}
						<div className="request-list-admin-dash float-child">
							{alumniPost.map((item) => {
								return (
									<PostRequestCard
										key={item._id}
										request={item}
									/>
								);
							})}
						</div>
					</React.Fragment>
				)}

				{showAchievements ? (
					extras.loading ? (
						<Spinner />
					) : (
						<React.Fragment>
							{extras.achievements.length === 0 && (
								<div className="no-data-page">
									Nothing to show here
								</div>
							)}

							<div className="request-list-admin-dash float-child">
								{extras.achievements.length > 0 && (
									<div style={{ marginTop: "1em" }}>
										<CSVLink
											{...csvReport}
											className="btn btn btn-secondary btn-light mr-2"
										>
											Export All
											<Icon name="arrow-right" />
										</CSVLink>
										<button
											className="btn btn-danger ml-2"
											onClick={() =>
												deleteAllAchievements()
											}
										>
											Delete All
											<Icon name="trash" />
										</button>
									</div>
								)}
								{extras.achievements.map((item) => {
									return (
										<AchievementCard
											key={item._id}
											data={item}
										/>
									);
								})}
							</div>
						</React.Fragment>
					)
				) : (
					<React.Fragment />
				)}

				{showFeedbacks ? (
					extras.loading ? (
						<Spinner />
					) : (
						<React.Fragment>
							{extras.feedbacks.length === 0 && (
								<div className="no-data-page">
									Nothing to show here
								</div>
							)}
							<div className="request-list-admin-dash float-child">
								{extras.feedbacks.length > 0 && (
									<div style={{ marginTop: "1em" }}>
										<button
											className="btn btn-danger ml-2"
											onClick={() => deleteAllFeedbacks()}
										>
											Delete All
											<Icon name="trash" />
										</button>
									</div>
								)}
								{extras.feedbacks.map((item) => {
									return (
										<FeedbackCard
											key={item._id}
											data={item}
										/>
									);
								})}
							</div>
						</React.Fragment>
					)
				) : (
					<React.Fragment />
				)}

				{showSettings && <Settings/>}
			</div>
			{/* <Footer/> */}
		</React.Fragment>
	);
};

AdminDash.propTypes = {
	request: PropTypes.object.isRequired,
	extras: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	getJoinRequests: PropTypes.func.isRequired,
	getPostRequests: PropTypes.func.isRequired,
	getAchievements: PropTypes.func.isRequired,
	getFeedbacks: PropTypes.func.isRequired,
	deleteAllAchievements: PropTypes.func.isRequired,
	deleteAllFeedbacks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	request: state.request,
	extras: state.extras,
	auth: state.auth,
	post: state.post,
});

export default connect(mapStateToProps, {
	getJoinRequests,
	getPostRequests,
	getAchievements,
	getFeedbacks,
	deleteAllAchievements,
	deleteAllFeedbacks,
})(AdminDash);
