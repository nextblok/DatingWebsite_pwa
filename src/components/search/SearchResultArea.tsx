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
            <div className="card-body direction-rtl">
              {/* preference box */}
              <div className="search-form-wrapper m-3">
                <form
                  className="mb-3 pb-4 border-bottom"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <h6>Gender: </h6>
                  <div className="row mb-4">
                    {["Male", "Female", "Transgender "].map((item, i) => (
                      <div className="form-check col-3">
                        <input
                          className="form-check-input"
                          id="defaultCheckbox"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheckbox"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h6>Age: </h6>
                  <div className="row mb-4">
                    <div className="form-check col-3">
                      <input
                        className="form-check-input"
                        id="defaultCheckbox"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheckbox"
                      >
                        18 ~ 25
                      </label>
                    </div>
                    <div className="form-check col-3">
                      <input
                        className="form-check-input"
                        id="defaultCheckbox"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheckbox"
                      >
                        25~ 35
                      </label>
                    </div>
                    <div className="form-check col-3">
                      <input
                        className="form-check-input"
                        id="defaultCheckbox"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheckbox"
                      >
                        35 ~ 45
                      </label>
                    </div>
                  </div>

                  <h6>ZODIAC SIGNS: </h6>
                  <div className="row mb-4">
                    {[
                      "Aries",
                      "Taurus",
                      "Gemini",
                      "Cancer",
                      "Leo",
                      "Virgo",
                      "Libra",
                      "Scorpio",
                      "Sagittarius",
                      "Capricorn",
                      "Aquarius",
                      "Pisces",
                    ].map((item, i) => (
                      <div className="form-check col-3">
                        <input
                          className="form-check-input"
                          id="defaultCheckbox"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheckbox"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h6>BODY TYPE: </h6>
                  <div className="row mb-4">
                    {[
                      "Athletic",
                      "Normal",
                      "Other",
                      "Stout",
                      "Superfluous",
                      "Thin",
                    ].map((item, i) => (
                      <div className="form-check col-3">
                        <input
                          className="form-check-input"
                          id="defaultCheckbox"
                          type="checkbox"
                          value=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheckbox"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  <a className={`btn btn-primary rounded-pill`} href="#">
                    Search
                  </a>
                </form>
              </div>

              <div className="top-products-area">
                <div className="container mb-3">
                  <p className="mb-2 fz-12">37+ candidates found</p>
                  <div className="row g-3">
                    {shop_data.map((item, i) => (
                      <div key={i} className="col-6 col-sm-4 col-lg-3">
                        <div className="card single-product-card shadow">
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
                            <div className="text-center row">
                              {/* <a
                                className={`btn btn-${
                                  item.btn_color
                                } rounded-pill btn-sm ${
                                  item.btn_color === "danger" ? "disabled" : ""
                                }`}
                                href="#"
                              >
                                {item.btn_text}
                              </a> */}
                              <div className="col-3"></div>
                              <div className="col-3">
                                <a href="#">
                                  <i
                                    className="bi bi-chat-dots mr-5"
                                    style={{
                                      color: "#f1b10f",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </a>
                              </div>
                              <div className="col-3">
                                <a href="#" className="mr-3">
                                  <i
                                    className="bi bi-heart"
                                    style={{
                                      color: "#f1b10f",
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </a>
                              </div>
                              <div className="col-3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <!-- Pagination --> */}
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-two justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <i className="bi bi-chevron-left"></i>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      9
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <i className="bi bi-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultArea;
