import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import request from "./request";
import post from "./post";
import user from "./users";
import extras from "./extras";

export default combineReducers({ alert, auth, request, post, user, extras });
