"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import Link from "next/link";
import React from "react";

const HeaderTwo = () => {
	if (typeof window !== "undefined") {
		require("bootstrap/dist/js/bootstrap");
	}

	const { theme, handleDarkModeToggle } = useDarkMode();

	return (
		<>
		
			<div className="header-area" id="headerArea">
				<div className="container">
					<div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
						<div className="logo-wrapper">
							<Link href="/home">
								<img src="/assets/img/core-img/logo.png" alt="" />
							</Link>
						</div>

						<div
							className="navbar--toggler"
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
								<img src="/assets/img/bg-img/2.jpg" alt="" />
							</div>

							<div className="user-info">
								<h6 className="user-name mb-0">Affan Islam</h6>
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
									<i className="bi bi-star"></i> Likes
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

		</>
	);
};

export default HeaderTwo;
