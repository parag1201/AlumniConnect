import axios from "axios";
import { GET_CHANNELS, CHANNELS_ERROR } from "./types";
import { setAlert } from "./alert";

export const getAllChannels = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/channels/all");
		dispatch({
			type: GET_CHANNELS,
			payload: res.data,
		});
		console.log("inside actions file");
		console.log(res.data);
	} catch (err) {
		dispatch({
			type: CHANNELS_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const createChannel = (new_channel_name) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		await axios.post(
			"/api/channels/create-channel",
			{
				new_channel_name,
			},
			config
		);
		dispatch(setAlert("Channel Created", "safe"));
	} catch (err) {
		console.log(err);
	}
};
