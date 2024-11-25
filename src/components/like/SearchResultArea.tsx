"use client";
import React, { useState } from "react";
import Link from "next/link";

const shop_data: any[] = [
  {
    id: 1,
    img: "/assets/img/bg-img/user1.png",
    badge_colro: "warning",
    badge_text: "Sale",
    title: "Rajib Raj",
    new_price: 9.89,
    old_price: 13.42,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 2,
    img: "/assets/img/bg-img/user2.png",
    badge_colro: "primary",
    badge_text: "-10%",
    title: "Angel Mili",
    new_price: 3.36,
    old_price: 5.99,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 3,
    img: "/assets/img/bg-img/user3.png",
    badge_colro: "info",
    badge_text: "-15%",
    title: "Sajahan Sagor",
    new_price: 10.99,
    old_price: 12,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 1,
    img: "/assets/img/bg-img/user1.png",
    badge_colro: "warning",
    badge_text: "Sale",
    title: "Rajib Raj",
    new_price: 9.89,
    old_price: 13.42,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 2,
    img: "/assets/img/bg-img/user2.png",
    badge_colro: "primary",
    badge_text: "-10%",
    title: "Angel Mili",
    new_price: 3.36,
    old_price: 5.99,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 3,
    img: "/assets/img/bg-img/user3.png",
    badge_colro: "info",
    badge_text: "-15%",
    title: "Sajahan Sagor",
    new_price: 10.99,
    old_price: 12,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 1,
    img: "/assets/img/bg-img/user1.png",
    badge_colro: "warning",
    badge_text: "Sale",
    title: "Rajib Raj",
    new_price: 9.89,
    old_price: 13.42,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 2,
    img: "/assets/img/bg-img/user2.png",
    badge_colro: "primary",
    badge_text: "-10%",
    title: "Angel Mili",
    new_price: 3.36,
    old_price: 5.99,
    btn_color: "primary",
    btn_text: "Chat",
  },
  {
    id: 3,
    img: "/assets/img/bg-img/user3.png",
    badge_colro: "info",
    badge_text: "-15%",
    title: "Sajahan Sagor",
    new_price: 10.99,
    old_price: 12,
    btn_color: "primary",
    btn_text: "Chat",
  },
];

const SearchResultArea = () => {
  const [inputValue, setInputValue] = useState("Affan template");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="page-content-wrapper py-3">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="standard-tab">
                <ul
                  className="nav rounded-lg mb-2 p-2 shadow-sm"
                  id="affanTabs1"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="btn active"
                      id="bootstrap-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bootstrap"
                      type="button"
                      role="tab"
                      aria-controls="bootstrap"
                      aria-selected="true"
                    >
                      Likes
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="btn"
                      id="pwa-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#pwa"
                      type="button"
                      role="tab"
                      aria-controls="pwa"
                      aria-selected="false"
                    >
                      Super Likes
                    </button>
                  </li>
                </ul>

                <div className="tab-content p-3" id="affanTabs1Content">
                  <div
                    className="tab-pane fade show active"
                    id="bootstrap"
                    role="tabpanel"
                    aria-labelledby="bootstrap-tab"
                  >
                    <div className="row g-3">
                      {shop_data.map((item, i) => (
                        <div key={i} className="col-6 col-sm-4 col-lg-3">
                          <div className="card single-product-card ">
                            <div className="card-body p-3 text-center">
                              {/* <!-- Product Thumbnail --> */}
                              <Link
                                className="product-thumbnail d-block"
                                href="/member-profile"
                              >
                                <img src={item.img} alt={item.title} />
                              </Link>
                              {/* <!-- Product Title --> */}
                              <Link
                                className="product-title d-block text-truncate"
                                href="/member-profile"
                              >
                                {item.title}
                              </Link>
                              <div className="text-center">
                                <a
                                  className={`btn btn-${
                                    item.btn_color
                                  } rounded-pill btn-sm ${
                                    item.btn_color === "danger"
                                      ? "disabled"
                                      : ""
                                  }`}
                                  href="#"
                                >
                                  {item.btn_text}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pwa"
                    role="tabpanel"
                    aria-labelledby="pwa-tab"
                  >
                    <div className="row g-3">
                      {shop_data.map((item, i) => (
                        <div key={i} className="col-6 col-sm-4 col-lg-3">
                          <div className="card single-product-card">
                            <div className="card-body p-3 text-center">
                              {/* <!-- Product Thumbnail --> */}
                              <Link
                                className="product-thumbnail d-block"
                                href="/member-profile"
                              >
                                <img src={item.img} alt={item.title} />
                              </Link>
                              {/* <!-- Product Title --> */}
                              <Link
                                className="product-title d-block text-truncate"
                                href="/member-profile"
                              >
                                {item.title}
                              </Link>
                              <div className="text-center">
                                <a
                                  className={`btn btn-${
                                    item.btn_color
                                  } rounded-pill btn-sm ${
                                    item.btn_color === "danger"
                                      ? "disabled"
                                      : ""
                                  }`}
                                  href="#"
                                >
                                  {item.btn_text}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultArea;
