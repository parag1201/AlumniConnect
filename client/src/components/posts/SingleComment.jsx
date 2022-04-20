import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SingleComment = ({
	comment: {text, name, avatar, user},
}) => {
	return (
		<div className="row single-comment-display" style={{marginTop:"0.5em"}}>
			<div
				className="col-md-1"
				style={{ textAlign: "center"}}
			>
				<div className="">
					<img
						alt=""
						src={avatar}
						className="avatar avatar-sm rounded-circle"
					/>
				</div>
				<div className="">
					<Link to={`/profile/${user}`}>{name}</Link>
				</div>
			</div>

			<div className="col-md-11">{text}</div>
		</div>
	);
};

SingleComment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default SingleComment;
