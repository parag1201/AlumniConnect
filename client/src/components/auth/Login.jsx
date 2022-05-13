import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { closeSideNav } from "../../actions/alert";

const Login = ({ login, isAuthenticated, closeSideNav }) => {
	useEffect(() => {
		closeSideNav();
	}, []);

	const [formInput, setFormInput] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formInput;

	const onChange = (e) =>
		setFormInput({ ...formInput, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	if (isAuthenticated) {
		return <Redirect to="/feed/topic/Placements?search=" />;
	}

	return (
		<div className="form-container">
			<h1>Login</h1>
			<p className="lead"> Login To Your Account</p>

			<form
				className="form auth-form"
				onSubmit={(e) => onSubmit(e)}
			>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email address"
						name="email"
						value={email}
						autoComplete="true"
						onChange={(event) => onChange(event)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						autoComplete="true"
						onChange={(event) => onChange(event)}
						minLength="6"
					/>
				</div>
				<input
					type="submit"
					className="btn btn-primary"
					value="Login"
				/>
			</form>
			<p className="my-1">
				Forgot Password ?{" "}
				<Link to="/forgotPassword">Reset Password</Link>
			</p>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	closeSideNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, closeSideNav })(Login);
