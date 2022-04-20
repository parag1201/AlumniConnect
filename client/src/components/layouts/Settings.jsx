import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setRequirePostApproval } from "../../actions/post";

const Settings = ({
	post: {
		settings: { requireApproval },
	},
	setRequirePostApproval,
}) => {
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
							onChange={() => {
								setRequirePostApproval(!requireApproval);
							}}
							checked={requireApproval}
						/>
						{requireApproval && (
							<label
								className="custom-control-label"
								htmlFor="customSwitches"
							>
								ON
							</label>
						)}

						{!requireApproval && (
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
	post: PropTypes.object.isRequired,
	setRequirePostApproval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { setRequirePostApproval })(Settings);
