import React, { Fragment } from "react";

const NotAuthorized = () => {
	return (
		<Fragment>
			<h1 className="x-large text-danger">
				<i className="fas fa-exclamation-triangle" style={{marginRight: "1em"}}/>
				Not Authorized
			</h1>
			<p className="large">You do not have permission to access this page</p>
		</Fragment>
	);
};

export default NotAuthorized;