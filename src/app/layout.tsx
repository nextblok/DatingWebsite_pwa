"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";


import { io } from "socket.io-client";
import Peer from "simple-peer";
import Rodal from "rodal";
import Link from "next/link";

import "rodal/lib/rodal.css";

import VideoCallingPopup from "@/components/common/VideoCallingPopup";

import "../styles/index.scss";
import "../styles/index.css";
import "../styles/videocall.css";

interface UserInfo {
  fullName: string;
  role: string;
  id: string;
  profilePhoto: string;
  email: string;
}

interface Notification {
  type: "chat" | "like";
  message: string;
}

// Create context for global state
export const GlobalContext = createContext<any>(null);

// Custom hook to use global context
export const useGlobalContext = () => useContext(GlobalContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define global state variables
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"675642fbf9873c01577f0c8e","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
      setUserId(userInfo.id);
    }
  }, []);


  const socket = useRef(io(process.env.NEXT_PUBLIC_SOCKET_URL));

  const [socketInitialized, setSocketInitialized] = useState(false);

  // Initialize socket connection with user id
  useEffect(() => {
    if (socketInitialized) return;
    if (!userInfo.id) return;

    socket.current.emit("register", userInfo.id);

    socket.current.on("notification", (data: Notification) => {
      addNotification(data);
    });

    setSocketInitialized(true);
  }, [userInfo]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to add a new notification
  const addNotification = (notification: Notification) => {
    const notifications = getNotifications();
    notifications.unshift(notification);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    setNotifications(notifications);
  };

  // Function to get all notifications
  const getNotifications = () => {
    const notificationsString = localStorage.getItem("notifications");
    return notificationsString ? JSON.parse(notificationsString) : [];
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    localStorage.setItem("notifications", JSON.stringify([]));
    setNotifications([]);
  };



  /**
   * Video call
   */

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
  const myPeer = useRef();

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

  // Global state object
  const globalState = {
    userInfo,
    userId,
    socket,
    notifications,
    clearNotifications,
    callUser
  };

  return (
    <html id="previewPage" data-theme="light" lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundImage: `url(/assets/img/bg-img/0.png)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
        }}
      >
        <GlobalContext.Provider value={globalState}>
          {!renderCall && <>
            <VideoCallingPopup
              isVideoOpen={showingCallPopup}
              acceptCall={acceptCall}
              rejectCall={rejectCall}
            />
            {children}
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


        </GlobalContext.Provider>
      </body>
    </html>
  );
}
