"use client";

import "../styles/index.scss";
import "../styles/index.css";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

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

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"675642fbf9873c01577f0c8e","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
    }
  }, []);

  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

  const [socketInitialized, setSocketInitialized] = useState(false);

  // Initialize socket connection with user id
  useEffect(() => {
    if (socketInitialized) return;
    if (!userInfo.id) return;

    socket.emit("register", userInfo.id);

    socket.on("notification", (data: Notification) => {
      addNotification(data);
    });

    setSocketInitialized(true);
  }, [userInfo]);

  // Global state object
  const globalState = {
    userInfo,
    socket,
  };

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

  // Add notification functions to global state
  Object.assign(globalState, {
    notifications,
    clearNotifications,
  });

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
          {children}
        </GlobalContext.Provider>
      </body>
    </html>
  );
}
