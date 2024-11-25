"use client";

import Image from "next/image";
import Count from "../common/Count";
import React, { useState } from "react";
import ImagePopup from "@/modals/ImagePopup";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


const count_data = [
	{ id: 1, icon: "basket", color: "success", number: 1400, symble: "+" },
	{ id: 2, icon: "cup", color: "primary", number: 16, symble: "k" },
	{ id: 3, icon: "emoji-smile", color: "danger", number: 963, symble: "+" },
];

import masonary_img_1 from "../../../public/assets/img/bg-img/4.jpg";
import masonary_img_2 from "../../../public/assets/img/bg-img/5.jpg";
import masonary_img_3 from "../../../public/assets/img/bg-img/7.jpg";
import masonary_img_4 from "../../../public/assets/img/bg-img/6.jpg";

const masonry_data = [
	{ id: 1, img: masonary_img_1 },
	{ id: 2, img: masonary_img_2 },
	{ id: 3, img: masonary_img_3 },
	{ id: 4, img: masonary_img_4 },
];

const AboutArea = () => {
	// photoIndex
	const [photoIndex, setPhotoIndex] = useState(null);
	// image open state
	const [isOpen, setIsOpen] = useState(false);
	// handleImagePopup
	const handleImagePopup = (i: any) => {
		setPhotoIndex(i);
		setIsOpen(true);
	};

	const image = masonry_data.map((item) => item.img.src);

	return (
		<>
			<div className="page-content-wrapper py-3">
				<div className="container">
					<div className="card image-gallery-card direction-rtl">
						<div className="card-body">
							<img
								className="mb-3 rounded"
								src="/assets/img/bg-img/13.jpg"
								alt=""
							/>
							<h5>About Us – Matematch</h5>
							<p>
							Welcome to Matematch, where love finds its true equation! We are more than just a dating and matching website; we’re a community dedicated to helping you discover meaningful connections and relationships that matter.
							</p>
							<p>
							At Matematch, we believe that compatibility goes beyond just physical attraction or common interests. We use a unique, science-driven approach to match you with your ideal partner, combining the power of personalized algorithms and human insight. Our goal is to give you the most authentic and genuine experience in your journey to find that special someone.
							</p>
							{/* <a className="btn btn-primary mb-4" href="#">
								Get A Quote
							</a> */}

							<ResponsiveMasonry
								className="masonry-content-wrapper gallery-img mb-3"
								columnsCountBreakPoints={{ 0: 2, 750: 2, 992: 2 }}
							>
								<Masonry gutter="20px">
									{masonry_data.map((item, i) => (
										<a
											key={i}
											className="portfolio-item large single-gallery-item image-zooming-in-out"
											title="Gallery One"
											data-gall="gallery01"
											style={{ cursor: "pointer" }}
											onClick={() => handleImagePopup(i)}
										>
											<Image src={item.img} alt="" />

											{/* <!-- Fav Icon --> */}
											<div className="fav-icon shadow">
												<i className="bi bi-heart-fill"></i>
											</div>
										</a>
									))}
								</Masonry>
							</ResponsiveMasonry>

							<h5>Our Mission</h5>
							<p>
							Our mission is simple: to bring people together in a meaningful way. We understand that in today’s fast-paced world, finding the right partner can be challenging. Matematch was designed to simplify that search, bringing like-minded souls closer and creating the perfect conditions for lasting love.
							</p>						

							

							<div className="row">
								{count_data.map((item, i) => (
									<div key={i} className="col-4">
										<div className="single-counter-wrap text-center mb-4">
											<i
												className={`bi bi-${item.icon} mb-1 text-${item.color}`}
											></i>
											<h4 className={`mb-0 text-${item.color}`}>
												<span className="counter">
													<Count number={item.number} />
												</span>
												{item.symble}
											</h4>
										</div>
									</div>
								))}
							</div>

							<p className="mb-4">
							Whether you’re searching for a lifelong partner or hoping to meet new friends who share your passions, Matematch is here to make every connection count. Join our ever-growing community today and let us help you find your perfect match—because love, when it’s real, is worth the wait.

							</p>
							<p className="mb-0">
								
Let’s create love stories together, one match at a time. Welcome to Matematch!
							</p>

							<a href="#" className="btn btn-primary mt-3 w-100">
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* image light box start */}
			{isOpen && (
				<ImagePopup
					images={image}
					setIsOpen={setIsOpen}
					photoIndex={photoIndex}
					setPhotoIndex={setPhotoIndex}
				/>
			)}
			{/* image light box end */}
		</>
	);
};

export default AboutArea;
