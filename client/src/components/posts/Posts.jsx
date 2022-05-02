import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { closeSideNav } from "../../actions/alert";
import { useHistory } from "react-router-dom";

const Posts = ({
	getPosts,
	closeSideNav,
	post: { posts, loading },
	auth: { authUser, loadingAuth },
}) => {
	const [query, setQuery] = useState("");

	useEffect(() => {
		closeSideNav();
		getPosts(query);
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		getPosts(query);
	};

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className="feed-page">
				<h1 className="large text-primary">Posts</h1>
				<p className="lead">
					<i className="fas fa-user mr-4" />
					Welcome to the community
				</p>
				<div className="search-div">
					<Link
						to="/create-post"
						className="btn btn-light col-3 posts-top-item"
						style={{ width: "100%" }}
					>
						<i
							className="fas fa-edit"
							style={{ marginRight: "0.5em" }}
						></i>
						Create Post
					</Link>
					<form
						method="get"
						className="col-9 search-form"
						onSubmit={(e) => onSubmit(e)}
					>
						<input
							type="text"
							name="query"
							id="search"
							placeholder="Search here..."
							className="col-9 search-input posts-top-item"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<input
							type="submit"
							value="Search"
							className="btn btn-primary col-3 posts-top-item"
						/>
					</form>
				</div>

				<div className="posts-list">
					{posts !== null &&
						posts.map((pst) => {
							if (
								authUser !== null &&
								(pst.visibility.includes(authUser.role) ||
									pst.user === authUser._id || authUser.isAdmin)
							) {
								return <PostCard key={pst._id} post={pst} />;
							}
						})}
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	closeSideNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, closeSideNav })(Posts);
