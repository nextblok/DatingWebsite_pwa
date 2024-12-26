import HeaderFive from "@/layouts/headers/HeaderFive";
import React from "react";
import ChatAreaNew from "./ChatAreaNew";
import VideoCall from "./VideoCall";
import './index.css';

const Chat = () => {
	return (
		<>
			<ChatAreaNew />
			<VideoCall />
		</>
	);
};

export default Chat;
