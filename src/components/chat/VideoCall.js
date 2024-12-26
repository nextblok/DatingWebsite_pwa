"use client";
import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import Rodal from "rodal";

import "rodal/lib/rodal.css";

import camera from "./Icons/camera.svg";
import camerastop from "./Icons/camera-stop.svg";
import share from "./Icons/share.svg";
import hangup from "./Icons/hang-up.svg";
import fullscreen from "./Icons/fullscreen.svg";
import minimize from "./Icons/minimize.svg";
import { useGlobalContext } from "@/app/layout";

const Watermark = React.lazy(() => import("./Components/Watermark/Watermark"));

const App = () => {
  const [yourID, setYourID] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callingFriend, setCallingFriend] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [receiverID, setReceiverID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isfullscreen, setFullscreen] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef(io(process.env.NEXT_PUBLIC_SOCKET_URL));
  // const socket = useRef(io('http://localhost:7000'));
  const myPeer = useRef();

  const { userId } = useGlobalContext();
  const [opponentId, setOpponentId] = useState("");
  useEffect(() => {
    let param = new URLSearchParams(window.location.search).get("opponent_id");
    if (param) {
      setOpponentId(param);
      setReceiverID(param);
    }

    setYourID(userId);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    socket.current.emit("register", userId);
    socket.current.on("hey", (data) => {
      console.log("heyheyheyhey");
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.current.on("receiveMessage", (text) => {
      handleReceiveMessage(text);
    });
  }, [userId]);

  function callPeer() {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        setCallingFriend(true);
        setCaller(opponentId);
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
            userToCall: opponentId,
            signalData: data,
            from: yourID,
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
          window.location.reload();
        });

        socket.current.on("rejected", () => {
          window.location.reload();
        });
      })
      .catch(() => {
        setModalMessage(
          "You cannot place/ receive a call without granting video and audio permissions! Please change your settings."
        );
        setModalVisible(true);
      });
  }

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
          window.location.reload();
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
    setStream,
    setCallAccepted,
    setModalMessage,
    setModalVisible,
    socket,
    endCall,
  ]);

  function rejectCall() {
    setCallRejected(true);
    socket.current.emit("rejected", { to: caller });
    window.location.reload();
  }

  function endCall() {
    myPeer.current.destroy();
    socket.current.emit("close", { to: caller });
    window.location.reload();
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

  function renderLanding() {
    if (!callRejected && !callAccepted && !callingFriend) return "block";
    return "none";
  }

  function renderCall() {
    // return 'block';
    if (!callRejected && !callAccepted && !callingFriend) return "none";
    return "block";
  }

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

  let incomingCall;
  if (receivingCall && !callAccepted && !callRejected) {
    incomingCall = (
      <div className="incomingCallContainer">
        <div className="incomingCall flex flex-column">
          <div>
            <span className="callerID">{caller}</span> is calling you
          </div>
          <div className="incomingCallButtons flex">
            <button
              name="accept"
              className="alertButtonPrimary"
              onClick={() => acceptCall()}
            >
              Accept
            </button>
            <button
              name="reject"
              className="alertButtonSecondary"
              onClick={() => rejectCall()}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  }

  let audioControl;
  if (audioMuted) {
    audioControl = (
      <span className="iconContainer" onClick={() => toggleMuteAudio()}>
        audioControl
        <img
          src="/assets/img/demo-img/sass.png"
          alt="Unmute audio"
          width="10px"
          height="10px"
        />
      </span>
    );
  } else {
    audioControl = (
      <span className="iconContainer" onClick={() => toggleMuteAudio()}>
        audioControl
        <img
          src="/assets/img/demo-img/npm.png"
          alt="Mute audio"
          width="10px"
          height="10px"
        />
      </span>
    );
  }

  let videoControl;
  if (videoMuted) {
    videoControl = (
      <span className="iconContainer" onClick={() => toggleMuteVideo()}>
        videoControl
        <img src={camerastop} alt="Resume video" width="10px" height="10px" />
      </span>
    );
  } else {
    videoControl = (
      <span className="iconContainer" onClick={() => toggleMuteVideo()}>
        videoControl
        <img src={camera} alt="Stop audio" />
      </span>
    );
  }

  let hangUp = (
    <span className="iconContainer" onClick={() => endCall()}>
      hangUp
      <img src={hangup} alt="End call" />
    </span>
  );

  let fullscreenButton;
  if (isfullscreen) {
    fullscreenButton = (
      <span
        className="iconContainer"
        onClick={() => {
          setFullscreen(false);
        }}
      >
        fullscreen
        <img src={minimize} alt="fullscreen" />
      </span>
    );
  } else {
    fullscreenButton = (
      <span
        className="iconContainer"
        onClick={() => {
          setFullscreen(true);
        }}
      >
        fullscreen
        <img src={fullscreen} alt="fullscreen" />
      </span>
    );
  }

  return (
    <>
      <div
        style={{
          display: renderLanding(),
          // height: "100vh",
        }}
      >
        <div>
          {/* <main style={{ minHeight: "calc(100% - 302px)" }}> */}
            <div className="u-margin-top-xxlarge u-margin-bottom-xxlarge">
              <div className="o-wrapper-l">
                <div className="hero flex flex-column">
                  {/* <div>
                    <h1>Your ID: {yourID}</h1>
                    <p>receiverID: {receiverID}</p>
                  </div> */}
                  <div className="callBox flex">
                    <button
                      onClick={() => callPeer(receiverID.toLowerCase().trim())}
                      className="primaryButton"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/* </main> */}
        </div>
        <Rodal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          width={20}
          height={5}
          measure={"em"}
          closeOnEsc={true}
        >
          <div>{modalMessage}</div>
        </Rodal>
        {incomingCall}
      </div>
      <div className="callContainer" style={{ display: renderCall() }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Watermark />
        </Suspense>

        <div className="split_left">
          <div className="partnerVideoContainer">
            {callAccepted ? (
              PartnerVideo
            ) : (
              <div className="waitingText">
                <h1>Please hold for a while to accept your call.</h1>
              </div>
            )}
          </div>
        </div>
        <div className="userVideoContainer">{UserVideo}</div>    
        <div className="controlsContainer flex">
          {audioControl}
          {videoControl}
          {fullscreenButton}
          {hangUp}
        </div>
      </div>
    </>
  );
};

export default App;
