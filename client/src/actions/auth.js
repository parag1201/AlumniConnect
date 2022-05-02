import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOG_OUT,
	CLEAR_USER,
	CLEAR_USERS,
	CLEAR_POSTS,
	CLEAR_REQUESTS,
} from "./types";

// Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get("/api/auth");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Login
export const login =
	({ email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ email, password });
		try {
			const res = await axios.post("/api/auth", body, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (e) {
			console.log(e.response);
			const errors = e.response.data.errors;
			if (errors) {
				errors.forEach((err) => {
					dispatch(setAlert(err.msg, "danger"));
				});
			}
			dispatch({
				type: LOGIN_FAIL,
			});
		}
	};

//Register user
export const register =
	({
		name,
		email,
		password,
		role,
		program,
		starting_year,
		passing_year,
		designation,
		organisation,
		location,
		department,
		working_area,
	}) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		let body = null;
		if (role === "student") {
			body = JSON.stringify({
				name,
				email,
				password,
				role,
				program,
				starting_year,
				passing_year,
			});
		} else if (role === "alumni") {
			body = JSON.stringify({
				name,
				email,
				password,
				role,
				program,
				starting_year,
				passing_year,
				organisation,
				designation,
				working_area,
				location,
			});
		} else if (role === "faculty") {
			body = JSON.stringify({
				name,
				email,
				password,
				role,
				department,
				designation,
			});
		}
		try {
			const res = await axios.post("/api/users/register", body, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			dispatch(setAlert("Join Request sent to Admin", "safe"));
			dispatch(loadUser());
			return 1;
		} catch (e) {
			const errors = e.response.data.errors;
			if (errors) {
				errors.forEach((err) => {
					dispatch(setAlert(err.msg, "danger"));
				});
			}
			dispatch({
				type: REGISTER_FAIL,
			});
			return 0;
		}
	};

export const forgotPassword = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post(
			"/api/auth/forgot-password",
			formData,
			config
		);

		dispatch(setAlert("Check your email for Reset Link", "safe"));
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const resetPassword = (formInput, user_id, reset_token) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const { password, password_confirm } = formInput;
	const body = { password, password_confirm, user_id, reset_token };
	try {
		const res = await axios.post(
			"/api/auth/reset-password",
			body,
			config
		);
		dispatch(setAlert("Password changed", "safe"));
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}
	}
};

export const verifyResetLink = (user_id, reset_token) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = { user_id, reset_token };

	try {
		const res = await axios.post("/api/auth/verify-reset-link", body, config);
		return 1;
	} catch (e) {
		const errors = e.response.data.errors;
		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}
		return 0;
	}
}

// log out
export const logOut = () => (dispatch) => {
	dispatch({ type: LOG_OUT });
	dispatch({ type: CLEAR_USER });
	dispatch({ type: CLEAR_USERS });
	dispatch({ type: CLEAR_POSTS });
	dispatch({ type: CLEAR_REQUESTS });
};
