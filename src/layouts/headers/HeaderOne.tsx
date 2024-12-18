"use client";

import SettingPopup from "@/components/common/SettingPopup";
import Link from "next/link";
import React, { useState } from "react";

const HeaderOne = () => {
	const [showSetting, setShowSetting] = useState(false);
	const handleShowSetting = () => setShowSetting(!showSetting);

	return (
		<>
			<div className="demo-header-wrapper">
				<div className="container demo-container">
					<div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
						<div className="logo-wrapper">
							<Link href="/home">
								<img src="/assets/img/core-img/logo.png" alt="" />
							</Link>
						</div>

						<div className="setting-wrapper" onClick={handleShowSetting}>
							<div className="setting-trigger-btn" id="settingTriggerBtn">
								<i className="bi bi-gear"></i>
								<span></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<SettingPopup
				showSetting={showSetting}
				handleShowSetting={handleShowSetting}
			/>
		</>
	);
};

export default HeaderOne;



const SettingPopup = ({ handleShowSetting, showSetting }: any) => {
	const { theme, handleDarkModeToggle } = useDarkMode();
	const { viewMode, handleRTLToggling } = useRTLMode();

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
							<p className="mb-0">Settings</p>
							<div
								onClick={handleShowSetting}
								className="btn-close"
								id="settingCardClose"
							></div>
						</div>

						<div className="single-setting-panel">
							<div className="form-check form-switch mb-2">
								<input
									className="form-check-input"
									type="checkbox"
									id="availabilityStatus"
									defaultChecked
								/>
								<label
									className="form-check-label"
									htmlFor="availabilityStatus"
								>
									Availability status
								</label>
							</div>
						</div>

						<div className="single-setting-panel">
							<div className="form-check form-switch mb-2">
								<input
									className="form-check-input"
									type="checkbox"
									id="sendMeNotifications"
									defaultChecked
								/>
								<label
									className="form-check-label"
									htmlFor="sendMeNotifications"
								>
									Send me notifications
								</label>
							</div>
						</div>

						<div className="single-setting-panel">
							<div className="form-check form-switch mb-2">
								<input
									className="form-check-input"
									type="checkbox"
									id="darkSwitch"
									checked={theme === "dark"}
									onChange={handleDarkModeToggle}
								/>
								<label className="form-check-label" htmlFor="darkSwitch">
									{theme === "dark" ? "Light" : "Dark"} mode
								</label>
							</div>
						</div>

						<div className="single-setting-panel">
							<div className="form-check form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									id="rtlSwitch"
									checked={viewMode === "rtl"}
									onChange={handleRTLToggling}
								/>
								<label className="form-check-label" htmlFor="rtlSwitch">
									
									{viewMode === "rtl" ? "LTR" : "RTL"} mode
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
