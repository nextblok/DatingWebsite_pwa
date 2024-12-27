"use client"
import React, {
	useEffect,
	useState,
	useRef,
	Suspense,
	useCallback,
	useMemo,
} from "react";
import ChatAreaNew from "./ChatAreaNew";
import './index.css';

import { io } from "socket.io-client";
import Peer from "simple-peer";
import Rodal from "rodal";
import Link from "next/link";

import "rodal/lib/rodal.css";

import { useGlobalContext } from "@/app/layout";
import VideoCallingPopup from "@/components/common/VideoCallingPopup";


const Chat = () => {
	const [stream, setStream] = useState();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callingFriend, setCallingFriend] = useState(false);
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [callRejected, setCallRejected] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [audioMuted, setAudioMuted] = useState(false);
	const [videoMuted, setVideoMuted] = useState(false);
	const [isfullscreen, setFullscreen] = useState(true);

	const refreshCallStatus = () => {
		setCallAccepted(false);
		setCallRejected(false);
		setReceivingCall(false);
		setCallingFriend(false);
	}

	const userVideo = useRef();
	const partnerVideo = useRef();
	const socket = useRef(io(process.env.NEXT_PUBLIC_SOCKET_URL));
	const myPeer = useRef();

	const { userId } = useGlobalContext();

	useEffect(() => {
		if (!userId) return;

		socket.current.emit("register", userId);
		socket.current.on("hey", (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setCallerSignal(data.signal);
		});
	}, [userId]);

	const callUser = useCallback((callerId: any) => {
		window.navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				setCallingFriend(true);
				setCaller(callerId);
				if (userVideo.current) {
					userVideo.current.srcObject = stream;
				}
				const peer = new Peer({
					initiator: true,
					trickle: false,
					config: {
						iceServers: [
							{ url: "stun:stun01.sipphone.com" },
							{ url: "stun:stun.ekiga.net" },
							{ url: "stun:stun.fwdnet.net" },
							{ url: "stun:stun.ideasip.com" },
							{ url: "stun:stun.iptel.org" },
							{ url: "stun:stun.rixtelecom.se" },
							{ url: "stun:stun.schlund.de" },
							{ url: "stun:stun.l.google.com:19302" },
							{ url: "stun:stun1.l.google.com:19302" },
							{ url: "stun:stun2.l.google.com:19302" },
							{ url: "stun:stun3.l.google.com:19302" },
							{ url: "stun:stun4.l.google.com:19302" },
							{ url: "stun:stunserver.org" },
							{ url: "stun:stun.softjoys.com" },
							{ url: "stun:stun.voiparound.com" },
							{ url: "stun:stun.voipbuster.com" },
							{ url: "stun:stun.voipstunt.com" },
							{ url: "stun:stun.voxgratia.org" },
							{ url: "stun:stun.xten.com" },
							{
								url: "turn:numb.viagenie.ca",
								credential: "muazkh",
								username: "webrtc@live.com",
							},
							{
								url: "turn:192.158.29.39:3478?transport=udp",
								credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
								username: "28224511:1379330808",
							},
							{
								url: "turn:192.158.29.39:3478?transport=tcp",
								credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
								username: "28224511:1379330808",
							},
						],
					},
					stream: stream,
				});

				myPeer.current = peer;

				peer.on("signal", (data) => {
					socket.current.emit("callUser", {
						userToCall: callerId,
						signalData: data,
						from: userId,
					});
				});

				peer.on("stream", (stream) => {
					if (partnerVideo.current) {
						partnerVideo.current.srcObject = stream;
					}
				});

				peer.on("error", (err) => {
					endCall();
				});

				socket.current.on("callAccepted", (signal) => {
					console.log("callaccepted");
					setCallAccepted(true);
					peer.signal(signal);
				});

				socket.current.on("close", () => {
					refreshCallStatus();
				});

				socket.current.on("rejected", () => {
					refreshCallStatus();
				});
			})
			.catch(() => {
				setModalMessage(
					"You cannot place/ receive a call without granting video and audio permissions!"
				);
				setModalVisible(true);
			});
	}, [userId,
		callerSignal,
		socket,
	]);

	const acceptCall = useCallback(() => {
		window.navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				if (userVideo.current) {
					userVideo.current.srcObject = stream;
				}
				setCallAccepted(true);
				const peer = new Peer({
					initiator: false,
					trickle: false,
					stream: stream,
				});

				myPeer.current = peer;

				peer.on("signal", (data) => {
					socket.current.emit("acceptCall", { signal: data, to: caller });
				});

				peer.on("stream", (stream) => {
					partnerVideo.current.srcObject = stream;
				});

				peer.on("error", (err) => {
					endCall();
				});

				peer.signal(callerSignal);

				socket.current.on("close", () => {
					refreshCallStatus();
				});
			})
			.catch(() => {
				setModalMessage(
					"You cannot place/ receive a call without granting video and audio permissions! Please change your settings."
				);
				setModalVisible(true);
			});
	}, [
		caller,
		callerSignal,
		socket,
	]);

	function rejectCall() {
		setCallRejected(true);
		socket.current.emit("rejected", { to: caller });
		refreshCallStatus();
	}

	function endCall() {
		myPeer.current.destroy();
		socket.current.emit("close", { to: caller });
		refreshCallStatus();
	}

	function toggleMuteAudio() {
		if (stream) {
			setAudioMuted(!audioMuted);
			stream.getAudioTracks()[0].enabled = audioMuted;
		}
	}

	function toggleMuteVideo() {
		if (stream) {
			setVideoMuted(!videoMuted);
			stream.getVideoTracks()[0].enabled = videoMuted;
		}
	}
	
	const renderCall = useMemo(() => {
		return (!callRejected) && (callAccepted || callingFriend);
	}, [callRejected, callAccepted, callingFriend]);

	let UserVideo;
	if (stream) {
		UserVideo = (
			<video className="userVideo" playsInline muted ref={userVideo} autoPlay />
		);
	}

	let PartnerVideo;
	if (callAccepted && isfullscreen) {
		PartnerVideo = (
			<video
				className="partnerVideo cover"
				playsInline
				ref={partnerVideo}
				autoPlay
			/>
		);
	} else if (callAccepted && !isfullscreen) {
		PartnerVideo = (
			<video className="partnerVideo" playsInline ref={partnerVideo} autoPlay />
		);
	}

	const showingCallPopup = useMemo(() => {
		return receivingCall && !callAccepted && !callRejected;
	}, [receivingCall, callAccepted, callRejected]);


	return (
		<>
			{!renderCall && <>
				<VideoCallingPopup
					isVideoOpen={showingCallPopup}
					acceptCall={acceptCall}
					rejectCall={rejectCall}
				/>
				<ChatAreaNew callUser={callUser} />
				<Rodal
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
					width={20}
					height={7}
					measure={"em"}
					closeOnEsc={true}
				>
					<div>{modalMessage}</div>
				</Rodal>
			</>}


			{renderCall &&
				<div
					className="video-call-screen"
					style={callAccepted ? {} : { backgroundImage: `url(/assets/img/bg-img/36.jpg)` }}
				>
					{/* <!-- Video Streaming Code Goes Here --> */}
					{callAccepted && <div className="partnerVideoContainer">
						{PartnerVideo}
					</div>}


					{/* <!-- Back Button--> */}
					{/* <div className="call-back-button">
						<Link href="/chat">
							<i className="bi bi-arrow-left-short"></i>
						</Link>
					</div> */}

					{/* <!-- Button Group--> */}
					<div className="call-btn-group">
						<Link className="btn btn-dark btn-circle" href="#" onClick={toggleMuteVideo}>
							{videoMuted ? <i className="bi bi-camera"></i> : <i className="bi bi-camera"></i>}
						</Link>

						<a className="btn btn-lg btn-danger p-4 btn-call-cancel" href="#" onClick={endCall}>
							<i className="bi bi-telephone"></i>
						</a>

						<a className="btn btn-dark btn-circle" href="#" onClick={toggleMuteAudio}>
							{audioMuted ? <i className="bi bi-mic-mute"></i> : <i className="bi bi-mic"></i>}
						</a>
					</div>
				</div>}
		</>
	);
};

export default Chat;
