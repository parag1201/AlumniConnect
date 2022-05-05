import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	setRequirePostApproval,
	getRequirePostApproval,
} from "../../actions/post";

const Settings = ({
	setRequirePostApproval,
	getRequirePostApproval,
	post: {
		settings: { requireApproval },
	},
}) => {
	const [postApproval, setPostApproval] = useState(requireApproval);

	useEffect(async () => {
		await getRequirePostApproval();
		setPostApproval(requireApproval);
	}, []);

	useEffect(() => {
		setPostApproval(requireApproval);
	}, [requireApproval])

	const onChange = async (e) => {
		await setRequirePostApproval(!postApproval);
		setPostApproval(!postApproval);
	}

	return (
		<div className="request-list-admin-dash float-child">
			<div className="settings-types">
				<h6 style={{ marginTop: "2em", marginLeft: "0.5em" }}>
					Post Settings
				</h6>
				<div className="join-request-card">
					Require Approval for Posting
					<div className="custom-control custom-switch">
						<input
							type="checkbox"
							className="custom-control-input"
							id="customSwitches"
							onChange={(e) => onChange(e)}
							checked={postApproval}
						/>
						{postApproval && (
							<label
								className="custom-control-label"
								htmlFor="customSwitches"
							>
								ON
							</label>
						)}

						{!postApproval && (
							<label
								className="custom-control-label"
								htmlFor="customSwitches"
							>
								OFF
							</label>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

Settings.propTypes = {
	setRequirePostApproval: PropTypes.func.isRequired,
	getRequirePostApproval: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, {
	setRequirePostApproval,
	getRequirePostApproval,
})(Settings);
