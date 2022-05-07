import axios from "axios";
import {} from "./types";
import { setAlert } from "./alert";

export const getAllChannels = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/channels/all");
		return res.data;
	} catch (err) {
		// dispatch({
		// 	type: POST_ERROR,
		// 	payload: {
		// 		msg: err.response.statusText,
		// 		status: err.response.status,
		// 	},
		// });
		console.log(err);
	}
};

export const createChannel = (new_channel_name) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/api/channels/create-channel", {
			new_channel_name,
		}, config);
        dispatch(setAlert("Channel Created", "safe"));
	} catch (err) {
        console.log(err);
    }
};
