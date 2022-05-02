import "./messenger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
import { closeSideNav } from "../../actions/alert";
import { getConversations, getMessages, sendMessage } from "../../actions/chat";

const Messenger = ({
	auth: { authUser, loadingAuth },
	chat: { conversations, messages },
	getConversations,
	getMessages,
	sendMessage,
	closeSideNav,
}) => {
	// const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messagesLocal, setMessages] = useState(messages);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const socket = useRef();
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io("http://localhost:5000");
		socket.current.on("getMessage", (data) => {
			// console.log(data);
			// console.log("hello get message socket")
			// const message = {
			// 	sender: data.senderId,
			// 	text: data.text,
			// 	conversationId: currentChat._id,
			// 	createdAt: Date.now(),
			// };

			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
			// scrollRef.current?.scrollIntoView({ behavior: "smooth"});
		});
	}, []);

	useEffect(() => {
		setMessages(messages);
	}, [messages]);
	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		if (authUser !== null) {
			socket.current.emit("addUser", authUser._id);
			socket.current.on("getUsers", (users) => {
				const usersOnline = authUser.followings.filter((f) =>
					users.some((u) => u.userId === f)
				);
				
				setOnlineUsers(usersOnline);
			});
		}
	}, [authUser]);

	useEffect(() => {
		// if (authUser !== null) {
			// const getConversations = async () => {
			// 	try {
			// 		const res = await axios.get("localhost:5000/api/conversations/" + authUser._id
			// 		);
			// 		setConversations(res.data);
			// 	} catch (err) {
			// 		console.log(err);
			// 	}
			// };
			getConversations(authUser);
		// }
	}, [authUser]);

	useEffect(() => {
		// const getMessages = async () => {
		// 	try {
		// 		const res = await axios.get("/messages/" + currentChat?._id);
		// 		setMessages(res.data);
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// };
		getMessages(currentChat);
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (authUser !== null) {
			const message = {
				sender: authUser._id,
				text: newMessage,
				conversationId: currentChat._id,
			};

			const receiverId = currentChat.members.find(
				(member) => member !== authUser._id
			);

			sendMessage(message);
			setNewMessage("");
			socket.current.emit("sendMessage", {
				senderId: authUser._id,
				receiverId,
				text: newMessage,
			});
			scrollRef.current?.scrollIntoView({ behavior: "smooth" });

			// try {
			// 	const res = await axios.post("/messages", message);
			// 	// setMessages([...messages, res.data]);
			// 	setNewMessage("");
			// } catch (err) {
			// 	console.log(err);
			// }
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, arrivalMessage]);

	console.log(conversations);
	console.log(process.env)
	return (
		<React.Fragment>
			{/* <Topbar /> */}
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							placeholder="Search for friends"
							className="chatMenuInput"
						/>
						{conversations.map((c) => (
							<div onClick={() => setCurrentChat(c)}>
								<Conversation
									key={c._id}
									conversation={c}
									currentUser={authUser}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<React.Fragment>
								<div className="chatBoxTop">
									{messagesLocal.map((m) => (
										<div ref={scrollRef}>
											<Message
												key={m._id}
												message={m}
												own={m.sender === authUser._id}
											/>
										</div>
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										className="chatMessageInput"
										placeholder="write something..."
										onChange={(e) =>
											setNewMessage(e.target.value)
										}
										value={newMessage}
									></textarea>
									<button
										className="chatSubmitButton"
										onClick={handleSubmit}
									>
										Send
									</button>
								</div>
							</React.Fragment>
						) : (
							<span className="noConversationText">
								Open a conversation to start a chat.
							</span>
						)}
					</div>
				</div>
				{!loadingAuth && (
					<div className="chatOnline">
						<div className="chatOnlineWrapper">
							<ChatOnline
								onlineUsers={onlineUsers}
								currentId={authUser._id}
								setCurrentChat={setCurrentChat}
							/>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

Messenger.propTypes = {
	closeSideNav: PropTypes.func.isRequired,
	getConversations: PropTypes.func.isRequired,
	getMessages: PropTypes.func.isRequired,
	sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	chat: state.chat,
});

export default connect(mapStateToProps, {
	closeSideNav,
	getConversations,
	getMessages,
	sendMessage,
})(Messenger);
