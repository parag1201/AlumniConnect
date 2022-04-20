import React, { Fragment } from "react";

const NotFound = () => {
	return (
		<Fragment>
			<h1 className="x-large text-danger">
				<i className="fas fa-exclamation-triangle" style={{marginRight: "1em"}}/>
				Page Not Found
			</h1>
			<p className="large">Sorry, this page does not exist</p>
		</Fragment>
	);
};

export default NotFound;
