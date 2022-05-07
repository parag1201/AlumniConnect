import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box } from "@mui/material";
import UserCardModal from "./UserCardModal";

const UsersByType = ({ users, label }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 500,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	};

	return (
		<React.Fragment>
			<li
				className="profile-stat-count user-type-count"
				onClick={handleOpen}
			>
				<span className="profile-stat-count">{label} </span>
				<span>{users.length}</span>
			</li>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{users.map((user) => {
						return <UserCardModal profile={user} />;
					})}
				</Box>
			</Modal>
		</React.Fragment>
	);
};

UsersByType.propTypes = {
	users: PropTypes.array.isRequired,
};

export default UsersByType;
