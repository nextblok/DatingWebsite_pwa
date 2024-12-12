"use client";

import React, { useState, useEffect, useCallback } from "react";
import AudioCallingPopup from "@/components/common/AudioCallingPopup";
import VideoCallingPopup from "@/components/common/VideoCallingPopup";
import Link from "next/link";
import { io } from "socket.io-client";
import axios from "axios";

const ChatArea = () => {
  interface UserInfo {
    fullName: string;
    role: string;
    id: string;
    profilePhoto: string;
    email: string;
  }
  interface Chat {
    sender: string;
    receiver: string;
    message: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
  }

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);

  const [opponentId, setOpponentId] = useState("");
  useEffect(() => {
    let param = new URLSearchParams(window.location.search).get("opponent_id");
    if (param) {
      setOpponentId(param);
    }
  }, []);

  const [fileOpen, setFileOpen] = useState(false);

  const socket = io("http://localhost:8080");

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [opponentInfo, setOpponentInfo] = useState<UserInfo>({} as UserInfo);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"675642fbf9873c01577f0c8e","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
      
    }
  }, []);

  const [socketInitialized, setSocketInitialized] = useState(false);
  useEffect(() => {
    if (socketInitialized) return;
    if (!userInfo.id) return;

    socket.emit("register", userInfo.id);

    socket.on("message", (data) => {
      console.log(data);
      addChat({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        read: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Chat);
    // Scroll chat area to bottom when new message arrives
    const chatWrapper = document.getElementById('chat-wrapper');
    console.log(chatWrapper)
    if (chatWrapper) {
      chatWrapper.scrollTop = 500;
    }
    });

    setSocketInitialized(true);
  }, [userInfo]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chat/get`,
          {
            user1_id: userInfo.id,
            user2_id: opponentId,
          }
        );
        if (response.data.success) {
          setChats(response.data.data);
          setOpponentInfo(response.data.user2);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    if (userInfo.id && opponentId) {
      fetchChatHistory();
    }
  }, [userInfo, opponentId]);

  const [message, setMessage] = useState("");
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emit the message to socket server
    socket.emit("message", {
      sender: userInfo.id,
      receiver: opponentId,
      message: message.trim(),
    });

    // Clear input after sending
    setMessage("");

    addChat({
      sender: userInfo.id,
      receiver: opponentId,
      message: message.trim(),
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Chat);
  };

  const singleChatItem = (
    sender: string,
    message: string,
    date: string,
    index: number
  ) => {
    return sender === userInfo.id ? (
      <>
        {/* <!-- Single Chat Item --> */}
        <div className="single-chat-item outgoing" key={index}>
          {/* <!-- User Avatar --> */}
          <div className="user-avatar mt-1">
            {/* <!-- If the user avatar isnt available, will visible the first letter of the username. --> */}
            <span className="name-first-letter">A</span>
            <img src={userInfo.profilePhoto} alt="" />
          </div>
          {/* <!-- User Message --> */}
          <div className="user-message">
            <div className="message-content">
              <div className="single-message">
                <p>{message}</p>
              </div>

              {/* <!-- Options --> */}
              <div className="dropstart">
                <button
                  className="btn btn-options dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">
                      <i className="bi bi-reply"></i>Reply
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-forward"></i>Forward
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-trash"></i>Remove
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Time and Status --> */}
            <div className="message-time-status">
              <div className="sent-time">
                {new Date(date)
                  .toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toUpperCase()}
              </div>
              {/* <div className="sent-status seen">
                <i className="bi bi-check"></i>
              </div> */}
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="single-chat-item" key={index}>
          <div className="user-avatar mt-1">
            <span className="name-first-letter">A</span>
            <img src={opponentInfo.profilePhoto} alt="" />
          </div>
          <div className="user-message">
            <div className="message-content">
              <div className="single-message">
                <p>{message}</p>
              </div>
              <div className="dropstart">
                <button
                  className="btn btn-options dropdown-toggle"
                  type="button"
                  onClick={(e) => {
                    e.currentTarget.nextElementSibling?.classList.toggle(
                      "show"
                    );
                  }}
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">
                      <i className="bi bi-reply"></i>Reply
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-forward"></i>Forward
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-trash"></i>Remove
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="message-time-status">
              <div className="sent-time">
                {new Date(date)
                  .toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const [chats, setChats] = useState<Chat[]>([]);

  const addChat = useCallback(
    (chat: Chat) => {
      setChats((currentChats) => [...currentChats, chat]);
    },
    [chats]
  );

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container">
          {/* <!-- Header Content --> */}
          <div className="header-content position-relative d-flex align-items-center justify-content-between">
            {/* <!-- Chat User Info --> */}
            <div className="chat-user--info d-flex align-items-center">
              {/* <!-- Back Button --> */}
              <div className="back-button">
                <Link href="/chat-users">
                  <i className="bi bi-arrow-left-short"></i>
                </Link>
              </div>

              {/* <!-- User Thumbnail & Name --> */}
              <div className="user-thumbnail-name">
                <img src={opponentInfo?.profilePhoto} alt="" />
                <div className="info ms-1">
                  <p>{opponentInfo?.fullName}</p>
                  {/* <span className="active-status">Active Now</span> */}
                  {/* <!-- span.offline-status.text-muted Last actived 27m ago --> */}
                </div>
              </div>
            </div>

            {/* <!-- Call & Video Wrapper --> */}
            <div className="call-video-wrapper d-flex align-items-center">
              {/* <!-- Video Icon --> */}
              <div className="video-icon me-3">
                <a
                  className="text-secondary"
                  onClick={() => setIsVideoOpen(!isVideoOpen)}
                  id="videoCallingButton"
                  href="#"
                >
                  <i className="bi bi-camera-video"></i>
                </a>
              </div>

              {/* <!-- Call Icon --> */}
              <div className="call-icon me-3">
                <a
                  className="text-secondary"
                  onClick={() => setIsAudioOpen(!isAudioOpen)}
                  id="callingButton"
                  href="#"
                >
                  <i className="bi bi-telephone"></i>
                </a>
              </div>

              {/* <!-- Info Icon --> */}
              <div className="info-icon">
                <a className="text-secondary" href="#">
                  <i className="bi bi-info-circle"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoCallingPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
      />
      <AudioCallingPopup
        isAudioOpen={isAudioOpen}
        setIsAudioOpen={setIsAudioOpen}
      />

      <div className="page-content-wrapper py-3" id="chat-wrapper">
        <div className="container">
          <div className="chat-content-wrap">
            {chats.map((chat, index) =>
              singleChatItem(chat.sender, chat.message, chat.createdAt, index)
            )}

            {/* <!-- Single Chat Item --> */}
            {!"typing chat" && (
              <div className="single-chat-item" key={chats.length}>
                {/* <!-- User Avatar --> */}
                <div className="user-avatar mt-1">
                  {/* <!-- If the user avatar isnt available, will visible the first letter of the username. --> */}
                  <span className="name-first-letter">A</span>
                  <img src={opponentInfo?.profilePhoto} alt="" />
                </div>

                {/* <!-- User Message --> */}
                <div className="user-message">
                  <div className="message-content">
                    <div className="single-message">
                      <div className="typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <div className="container h-100">
          <div className="chat-footer-content h-100 d-flex align-items-center">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* <!-- Message --> */}
              <input
                className="form-control"
                type="text"
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* <!-- Emoji --> */}
              <button className="btn btn-emoji mx-2" type="button">
                <i className="bi bi-emoji-smile"></i>
              </button>

              {/* <!-- Add File --> */}
              <div className="dropup me-2">
                <button
                  onClick={() => setFileOpen(!fileOpen)}
                  className={`btn btn-add-file dropdown-toggle ${
                    fileOpen ? "show" : ""
                  }`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-plus-circle"></i>
                </button>
                <ul
                  className={`dropdown-menu ${fileOpen ? "show" : ""}`}
                  style={{
                    position: "absolute",
                    inset: "auto auto 0px 0px",
                    margin: "0px",
                    transform: "translate(0px, -34px)",
                  }}
                >
                  <li>
                    <a href="#">
                      <i className="bi bi-files"></i>Files
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-mic"></i>Audio
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-file-earmark"></i>Document
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-file-bar-graph"></i>Pull
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-geo-alt"></i>Location
                    </a>
                  </li>
                </ul>
              </div>

              {/* <!-- Send --> */}
              <button
                className="btn btn-submit"
                type="submit"
                onClick={sendMessage}
              >
                <i className="bi bi-cursor"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatArea;
