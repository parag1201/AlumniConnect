import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../../actions/auth";
import { openSideNav, closeSideNav } from "../../actions/alert";

const Navbar = ({
	auth: { isAuthenticated, loadingAuth, authUser },
	logOut,
	openSideNav,
	closeSideNav,
	sideNavOpen,
}) => {
	useEffect(() => {
		// if(sideNavOpen) closeSideNav()
	}, []);
	const authLinksAdmin = (
		<Fragment>
			<li>
				<Link to="/add-achievement" className="navbar-link">
					<span className="hide-sm">Achievements/Awards</span>
				</Link>
			</li>
			<li>
				<Link to="/messenger" className="navbar-link">
					<span className="hide-sm">Messenger</span>
				</Link>
			</li>
			<li>
				<Link to="/profiles?query=" className="navbar-link">
					<span className="hide-sm">Members</span>
				</Link>
			</li>
			<li>
				<Link to="/userprofile" className="navbar-link">
					<i className="fas fa-user"></i>{" "}
					{/* <span className="hide-sm">Profile</span> */}
					{authUser !== null && authUser.isAdmin && authUser.adminType==="head" && <span className="user-role-tag">Head Admin</span>}
					{authUser !== null && authUser.isAdmin && authUser.adminType==="sub" && <span className="user-role-tag">{authUser.role} Admin</span>}
				</Link>
			</li>
			<li>
				<Link to="/dashboard" className="navbar-link">
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/feed" className="navbar-link">
					<span className="hide-sm">Feed</span>
				</Link>
			</li>
			<li>
				<Link to="/help" className="navbar-link">
					<span className="hide-sm">Help</span>
				</Link>
			</li>
			<li>
				<Link
					onClick={() => {
						logOut();
					}}
					to="/"
					className="navbar-link"
				>
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Log Out</span>
				</Link>
			</li>
		</Fragment>
	);

	const authLinksOther = (
		<Fragment>
			<li>
				<Link to="/add-achievement" className="navbar-link">
					<span className="hide-sm">Achievements/Awards</span>
				</Link>
			</li>
			<li>
				<Link to="/profiles?query=" className="navbar-link">
					<span className="hide-sm">Members</span>
				</Link>
			</li>
			<li>
				<Link to="/userprofile" className="navbar-link">
					<i className="fas fa-user"></i>{" "}
					{/* <span className="hide-sm">Profile</span> */}
					{authUser !== null && <span className="user-role-tag">{authUser.role}</span>}
				</Link>
			</li>
			<li>
				<Link to="/feed" className="navbar-link">
					<span className="hide-sm">Feed</span>
				</Link>
			</li>
			<li>
				<Link to="/help" className="navbar-link">
					<span className="hide-sm">Help</span>
				</Link>
			</li>
			<li>
				<Link
					onClick={() => {
						logOut();
					}}
					to="/"
					className="navbar-link"
				>
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Log Out</span>
				</Link>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/add-achievement" className="navbar-link">
					<span className="hide-sm">Achievements/Awards</span>
				</Link>
			</li>
			<li>
				<Link to="/help" className="navbar-link">
					<span className="hide-sm">Help</span>
				</Link>
			</li>
			<li>
				<Link to="/register" className="navbar-link">
					Register
				</Link>
			</li>

			<li>
				<Link to="/login" className="navbar-link">
					Login
				</Link>
			</li>
		</Fragment>
	);

	const authLinksSideBarClosedOthers = (
		<ul>
			<li>
				<a
					className="navbar-link hamburger-icon"
					style={{ fontSize: "1.5em" }}
					onClick={() => openSideNav()}
				>
					<i className="fas fa-bars"></i>
				</a>
			</li>
			<ul className="nav-links">{authLinksOther}</ul>
		</ul>
	);

	const authLinksSideBarClosedAdmin = (
		<ul>
			<li>
				<a
					className="navbar-link hamburger-icon"
					style={{ fontSize: "1.5em" }}
					onClick={() => openSideNav()}
				>
					<i className="fas fa-bars"></i>
				</a>
			</li>
			<ul className="nav-links">{authLinksAdmin}</ul>
		</ul>
	);

	const guestLinksSideBarClosed = (
		<ul>
			<li>
				<a
					className="navbar-link hamburger-icon"
					style={{ fontSize: "1.5em" }}
					onClick={() => openSideNav()}
				>
					<i className="fas fa-bars"></i>
				</a>
			</li>
			<ul className="nav-links">{guestLinks}</ul>
		</ul>
	);
	return (
		<div>
			<nav className="navbar">
				<Link to="/" className="logo navbar-link">
					Alumni Connect
				</Link>
				{!loadingAuth && (
					<Fragment>
						{isAuthenticated && authUser !== null
							? authUser.isAdmin
								? authLinksSideBarClosedAdmin
								: authLinksSideBarClosedOthers
							: guestLinksSideBarClosed}
					</Fragment>
				)}
			</nav>
			<Fragment>
				{sideNavOpen && (
					<div className="side-panel">
						<a
							style={{ fontSize: "1.5em" }}
							className="navbar-link nav-close-icon"
							onClick={() => closeSideNav()}
						>
							<i className="fas fa-times"></i>
						</a>
						{!loadingAuth && (
							<ul className="side-panel-links">
								<React.Fragment>
									{isAuthenticated
										? authUser.isAdmin
											? authLinksAdmin
											: authLinksOther
										: guestLinks}
								</React.Fragment>
							</ul>
						)}
					</div>
				)}
			</Fragment>
		</div>
	);
};

Navbar.propTypes = {
	logOut: PropTypes.func.isRequired,
	openSideNav: PropTypes.func.isRequired,
	closeSideNav: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	sideNavOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	sideNavOpen: state.alert.sideNavOpen,
});

export default connect(mapStateToProps, { logOut, openSideNav, closeSideNav })(
	Navbar
);
