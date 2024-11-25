"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlider = () => {
  return (
    <>
      <div className="tiny-slider-one-wrapper">
        <div
          className="tns-controls"
          aria-label="Carousel Navigation"
          tabIndex={-1}
        >
          <button
            type="button"
            className="prev-button"
            data-controls="prev"
            tabIndex={-1}
            aria-controls="tns1"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            type="button"
            className="next-button"
            data-controls="next"
            tabIndex={-1}
            aria-controls="tns1"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <div className="tns-nav"></div>

        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            el: ".tns-nav",
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          navigation={{
            nextEl: ".next-button",
            prevEl: ".prev-button",
          }}
          className="tiny-slider-one"
        >
          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/31.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">Find Your Perfect Match</h3>
                  <p className="text-white mb-4">
                    Discover meaningful connections with our smart search
                    features.
                  </p>

                  <a className="btn btn-creative btn-warning" href="#">
                    Search Now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/33.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">Start a Conversation</h3>
                  <p className="text-white mb-4">
                    Connect instantly and enjoy engaging chats with people who
                    match your vibe.
                  </p>

                  <a className="btn btn-creative btn-warning" href="#">
                    Send Message
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/32.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">Upgrade Your Experience</h3>
                  <p className="text-white mb-4">
                    Unlock premium features and enhance your journey to find
                    meaningful connections.
                  </p>
                  <a className="btn btn-creative btn-warning" href="#">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/33.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">Lots of Elements & Pages</h3>
                  <p className="text-white mb-4">
                    Create your website in days, not months.
                  </p>
                  <a className="btn btn-creative btn-warning" href="#">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/1.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">Dark & RTL Ready</h3>
                  <p className="text-white mb-4">
                    You can use the Dark or <br /> RTL mode of your choice.
                  </p>
                  <a className="btn btn-creative btn-warning" href="#">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HeroSlider;
