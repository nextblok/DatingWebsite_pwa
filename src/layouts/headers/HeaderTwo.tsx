"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/layout";

const HeaderTwo = () => {
  if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
  }
  const { userInfo, clearNotifications, notifications } = useGlobalContext();

  const [showPopup, setShowPopup] = useState(false);
  const handleShowSetting = () => {
    setShowPopup(!showPopup);
  };

  const handleClearNotifications = () => {
    clearNotifications();
    setShowPopup(false);
  };
  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container">
          <div className="header-content header-style-five position-relative d-flex align-items-center">
            <div className="logo-wrapper">
              <Link href="/home">
                <img src="/assets/img/core-img/logo.png" alt="" />
              </Link>
            </div>

            <div className="ms-auto d-flex align-items-center">
              <div
                className="setting-wrapper"
                onClick={handleShowSetting}
                style={{ marginRight: "10px" }}
              >
                <div
                  className={
                    notifications.length > 0 ? "setting-trigger-btn" : ""
                  }
                  id="settingTriggerBtn"
                >
                  <i className="bi bi-bell"></i>
                  <span
                    className="badge bg-success rounded-pill "
                    onClick={handleShowSetting}
                    style={{ cursor: "pointer" }}
                  >
                    3+
                  </span>
                </div>
              </div>

              <div
                className="navbar--toggler ms-2"
                id="affanNavbarToggler"
                data-bs-toggle="offcanvas"
                data-bs-target="#affanOffcanvas"
                aria-controls="affanOffcanvas"
              >
                <span className="d-block"></span>
                <span className="d-block"></span>
                <span className="d-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        id="affanOffcanvas"
        data-bs-scroll="true"
        tabIndex={-1}
        aria-labelledby="affanOffcanvsLabel"
      >
        <button
          className="btn-close btn-close-white text-reset"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <div className="offcanvas-body p-0">
          <div className="sidenav-wrapper">
            <div className="sidenav-profile bg-gradient">
              <div className="sidenav-style1"></div>

              <div className="user-profile">
                <img src={userInfo.profilePhoto} alt="photo" />
              </div>

              <div className="user-info">
                <h6 className="user-name mb-0">{userInfo.fullName}</h6>
                {/* <span>CEO, Designing World</span> */}
              </div>
            </div>

            <ul className="sidenav-nav ps-0">
              <li>
                <Link href="/home">
                  <i className="bi bi-house-door"></i> Home
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <i className="bi bi-search"></i> Search
                </Link>
              </li>
              <li>
                <Link href="/chat-users">
                  <i className="bi bi-chat"></i> Chat
                  {/* <span className="badge bg-success rounded-pill ms-2">
										100+
									</span> */}
                </Link>
              </li>
              <li>
                <Link href="/likes">
                  <i className="bi bi-heart"></i> Likes
                </Link>
              </li>
              <li>
                <Link href="/membership">
                  <i className="bi bi-cash-coin"></i> Membership
                </Link>
              </li>
              <li>
                <Link href="/user-profile">
                  <i className="bi bi-person"></i> My profile
                </Link>
              </li>

              {/* <li>
								<div className="night-mode-nav">
									<i className="bi bi-moon"></i> 
									{theme === "dark" ? "Light" : "Dark"} Mode
									<div className="form-check form-switch">
										<input
											className="form-check-input form-check-success"
											id="darkSwitch"
											type="checkbox"
											checked={theme === "dark"}
											onChange={handleDarkModeToggle}
										/>
									</div>
								</div>
							</li> */}
              <li>
                <Link href="/login">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <NotificationPopup
        showSetting={showPopup}
        handleShowSetting={handleShowSetting}
        notifications={notifications}
        handleClearNotifications={handleClearNotifications}
      />
    </>
  );
};

export default HeaderTwo;

const NotificationPopup = ({
  handleShowSetting,
  showSetting,
  notifications,
  handleClearNotifications,
}: any) => {
  interface DataType {
    icon: string;
    sm_info: string;
  }

  const [notification__data, setNotification__data] = useState<DataType[]>([]);

  useEffect(() => {
    const mappedData = notifications.map((notification: any) => ({
      icon: notification.type === "chat" ? "chat-dots" : "star",
      sm_info: notification.message,
    }));
    setNotification__data(mappedData);
  }, [notifications]);

  return (
    <>
      <div
        id="setting-popup-overlay"
        className={showSetting ? "active" : ""}
        onClick={handleShowSetting}
      ></div>
      <div
        className={`card setting-popup-card shadow-lg ${
          showSetting ? "active" : ""
        }`}
        id="settingCard"
      >
        <div className="card-body">
          <div className="container">
            <div className="setting-heading d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0">Notifications</p>
              <div
                onClick={handleClearNotifications}
                className="btn-close"
                id="settingCardClose"
              ></div>
            </div>
            <div className="container">
              {notification__data.map((item, i) => (
                <Link key={i} href="/notification-details">
                  <div
                    className={`alert custom-alert-3 alert-primary`}
                    role="alert"
                  >
                    <i className={`bi bi-${item.icon} mt-0`}></i>
                    <div className="alert-text w-75 mt-1">
                      <span className="text-truncate">{item.sm_info}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
