"use client";

import VideoPopup from "@/modals/VideoPopup";
import Link from "next/link";
import React, { useState } from "react";

const Preview = () => {
	const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

	return (
		<>
			<div className="preview-hero-area">
				<span className="big-shadow-text">Affan</span>
				<div className="container demo-container direction-rtl">
					<div className="row g-2 align-items-center justify-content-between">
						<div className="col-12 col-lg-3">
							<h6 className="version-number bg-white shadow-sm border d-inline-block px-3 py-2 rounded-pill mb-3 lh-1">
								Current version - v 1.0.0
							</h6>
							<h2 className="demo-title mb-3">
								<span>Affan </span> - PWA Mobile <span> Next js </span> Template
							</h2>

							<ul className="demo-desc ps-0 mb-5">
								<li>
									<i className="bi bi-check-lg"></i> Next js
								</li>
								<li>
									<i className="bi bi-check-lg"></i> App Directory v 14.2.4
								</li>
								<li>
									<i className="bi bi-check-lg"></i> PWA Ready
								</li>
								<li>
									<i className="bi bi-check-lg"></i> Bootstrap 5.2.3
								</li>
								<li>
									<i className="bi bi-check-lg"></i> Creative Design
								</li>
								<li>
									<i className="bi bi-check-lg"></i> Dark Mode
								</li>
								<li>
									<i className="bi bi-check-lg"></i> Right to Left (RTL)
								</li>
								<li>
									<i className="bi bi-check-lg"></i> Easy & Professional Code
								</li>
							</ul>

							<div className="promotionVideo">
								<a
									data-autoplay="true"
									data-vbtype="video"
									className="btn btn-danger btn-lg promo-video rounded-pill"
									onClick={() => setIsVideoOpen(true)}
									style={{ cursor: "pointer" }}
									data-maxwidth="680px"
								>
									Watch promo video
								</a>
							</div>
						</div>

						<div className="col-12 col-lg-5">
							<div className="text-center">
								<iframe className="shadow-lg" src="/hero-blocks"></iframe>
							</div>
						</div>

						<div className="col-12 col-lg-3">
							<div className="text-lg-end">
								<div className="live-preview-btn mb-3">
									<Link
										className="btn btn-primary btn-lg d-lg-none mb-5 rounded-pill"
										href="hero-blocks"
										target="_blank"
									>
										Click the button to live preview
									</Link>
								</div>

								<div className="qr-code-wrapper shadow border">
									<img src="/assets/img/demo-img/qr-code.png" alt="" />
									<h6 className="mb-0">
										Scan this QR code to view <br /> on your mobile device.
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* video modal start */}
			<VideoPopup
				isVideoOpen={isVideoOpen}
				setIsVideoOpen={setIsVideoOpen}
				videoId={"-D6QFpH7zCA"}
			/>
			{/* video modal end  */}
		</>
	);
};

export default Preview;
