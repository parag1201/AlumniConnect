import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import { getPost, addComment } from "../../actions/post";
import SingleComment from "./SingleComment";
import parse from "html-react-parser";
import NotAuthorized from "../layouts/NotAuthorized";

const PostDisplay = ({
	getPost,
	addComment,
	post: { post, loading },
	auth: { authUser },
	match,
}) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match.params.id]);

	const [text, setText] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		var success = await addComment(match.params.id, { text });
		if (success) {
			setText("");
		}
	};
	return (
		<Fragment>
			{loading || post === null || authUser === null ? (
				<Spinner />
			) : post.visibility.includes(authUser.role) ? (
				<Fragment>
					<div
						className="container my-container"
						style={{ marginTop: "1em", marginBottom: "1em" }}
					>
						<div className="row heading-area">
							<Link
								to="/feed"
								className="btn btn-light"
								style={{
									borderRadius: "50% 50%",
									marginRight: "1em",
								}}
							>
								<i className="fas fa-chevron-left ml-2 mr-2"></i>
							</Link>
							<h4>
								<strong>{post.heading}</strong>
							</h4>
						</div>
						<div className="row post-text-area">
							{parse(post.text)}
						</div>
						<div className="row comments-section">
							<div className="add-comment">
								<div
									className="col-md-1"
									style={{ textAlign: "center" }}
								>
									<img
										src={authUser.avatar}
										alt=""
										className="avatar avatar-sm rounded-circle"
									/>
								</div>
								<div className="col-md-11">
									<input
										type="text"
										placeholder="Add Comment..."
										name="text"
										value={text}
										className="input-comment"
										required
										onChange={(e) => {
											setText(e.target.value);
										}}
									/>
									<a onClick={(e) => onSubmit(e)}>
										<svg
											focusable="true"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											className="comment-submit-button"
										>
											<path d="M2 3v18l20-9L2 3zm2 11l9-2-9-2V6.09L17.13 12 4 17.91V14z"></path>
										</svg>
									</a>
								</div>
							</div>
							<div className="comment-display">
								{post.comments.map((com) => (
									<SingleComment
										key={com._id}
										comment={com}
									/>
								))}
							</div>
						</div>
					</div>
				</Fragment>
			) : (
				<NotAuthorized />
			)}
		</Fragment>
	);
};

PostDisplay.propTypes = {
	getPost: PropTypes.func.isRequired,
	addComment: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	post: state.post,
});

export default connect(mapStateToProps, { getPost, addComment })(PostDisplay);
