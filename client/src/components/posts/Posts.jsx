import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { closeSideNav } from "../../actions/alert";
import { useHistory } from "react-router-dom";
import { getAllChannels } from "../../actions/channel";

const Posts = ({
	getPosts,
	closeSideNav,
	getAllChannels,
	post: { posts, loading },
	auth: { authUser, loadingAuth },
	match,
}) => {
	const [query, setQuery] = useState("");
	const [channels, setChannels] = useState([]);
	console.log(match.params);
	useEffect(async () => {
		closeSideNav();
		getPosts(query, match.params.channel_name);
		const result = await getAllChannels();
		setChannels(result);
	}, [match.params.channel_name]);

	const onSubmit = (e) => {
		e.preventDefault();
		getPosts(query, match.params.channel_name);
	};

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className="feed-page">
				<div className="col">
					<h1 className="large text-primary">Posts</h1>
					<p className="lead">
						<i className="fas fa-user mr-4" />
						Welcome to the community
					</p>
				</div>
				<div className="row">
					<ul className="col-md-3 sidebar">
						<li
							style={{
								color: "blue",
								paddingLeft: "2rem",
								textAlign: "left",
								borderBottom: "1px solid lightgrey",
							}}
						>
							<strong>Channels</strong>
						</li>
						{channels.map((c) => {
							return (
								<li
									key={c._id}
									className={
										match.params.channel_name === c.name
											? "selected-tab admin-side-panel-subitem"
											: "admin-side-panel-subitem"
									}
								>
									<Link
										to={`/feed/topic/${c.name}`}
										className="side-nav-channel-link"
									>
										<span>{c.name}</span>
									</Link>
								</li>
							);
						})}
					</ul>
					<div className="content col-md-9">
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
							{posts !== null && posts.length === 0 && (
								<h3 style={{ textAlign: "center" }}>
									No Posts to Display
								</h3>
							)}
							{posts !== null &&
								posts.map((pst) => {
									if (
										authUser !== null &&
										(pst.visibility.includes(
											authUser.role
										) ||
											pst.user === authUser._id ||
											authUser.isAdmin)
									) {
										return (
											<PostCard
												key={pst._id}
												post={pst}
											/>
										);
									}
								})}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	closeSideNav: PropTypes.func.isRequired,
	getAllChannels: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	getPosts,
	closeSideNav,
	getAllChannels,
})(Posts);
