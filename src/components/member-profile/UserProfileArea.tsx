"use client";
import React, { useState } from "react";

const UserProfileArea = () => {
  const [formData, setFormData] = useState({
    username: "@designing-world",
    fullname: "Jamil Rayhan",
    email: "care@example.com",
    job: "UX/UI Designer",
    portfolio: "https://themeforest.net/user/rk_theme",
    address: "28/C Green Road, BD",
    bio: "Working as UX/UI Designer at Designing World since 2016.",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className="page-content-wrapper py-3">
        <div className="container">
          {/* <!-- User Meta Data--> */}
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* avatar */}
                <div className="card team-member-card">
                  <div className="card-body">
                    <div className="team-member-img shadow-sm">
                      <img src="/assets/img/bg-img/2.jpg" alt="" />
                    </div>
                    <div className="team-info">
                      <h4 className="mb-1">Jone Dae</h4>
                      <p className="mb-0">Dating specialist</p>
                    </div>
                    <span className="badge bg-success ms-2 rounded-pill">
                      Verified
                    </span>
                    <span className="badge bg-warning ms-2 rounded-pill">
                      Hot
                    </span>
                  </div>
                </div>
                {/* info */}
                <div className="mb-4">
                  <h6>Bio</h6>
                  <p>
                    Adventurous foodie who loves exploring new places and trying
                    out unique cuisines. Always up for spontaneous road trips
                    and deep conversations over coffee.
                  </p>
                </div>

                {/* photos */}
                <div className="mb-4">
                  <h6>Photos</h6>
                  <div className="row">
                    <div className="col-3">
                      <img src="/assets/img/bg-img/1.jpg" alt="" />
                    </div>
                    <div className="col-3">
                      <img src="/assets/img/bg-img/3.jpg" alt="" />
                    </div>
                    <div className="col-3">
                      <img src="/assets/img/bg-img/8.jpg" alt="" />
                    </div>
                    <div className="col-3">
                      <img src="/assets/img/bg-img/5.jpg" alt="" />
                    </div>
                    <div className="col-3">
                      <img src="/assets/img/bg-img/9.jpg" alt="" />
                    </div>
                    <div className="col-3">
                      <img src="/assets/img/bg-img/7.jpg" alt="" />
                    </div>
                  </div>
                </div>
                {/* checkbox */}
                <div className="mb-4">
                  <h6>Preferences and Answers</h6>
                  <div className="mb-3"></div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="preferenceCheckbox1"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceCheckbox1"
                    >
                      Looking for a serious relationship
                    </label>
                  </div>

                  <div className="mb-2"></div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="preferenceCheckbox2"
                      type="checkbox"
                      value=""
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceCheckbox2"
                    >
                      Prefer outdoor activities and adventures
                    </label>
                  </div>

                  <div className="mb-2"></div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="preferenceCheckbox3"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceCheckbox3"
                    >
                      Enjoy quiet nights in and relaxing at home
                    </label>
                  </div>

                  <div className="mb-2"></div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="preferenceCheckbox4"
                      type="checkbox"
                      value=""
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceCheckbox4"
                    >
                      Interested in meeting new friends and connections
                    </label>
                  </div>

                  <div className="mb-2"></div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="preferenceCheckbox5"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="preferenceCheckbox5"
                    >
                      Value good communication and deep conversations
                    </label>
                  </div>

                  <div className="mb-2"></div>
                </div>

                {/* actions */}
                <div
                  className="row text-center mb-3"
                  style={{ padding: "0 25% 0 25%" }}
                >
                  <div className="col-4">
                    <a href="#" className="mr-3">
                      <i
                        className="bi bi-arrow-through-heart"
                        style={{ color: "#f1b10f", fontSize: "40px" }}
                      ></i>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="#">
                      <i
                        className="bi bi-hand-thumbs-up"
                        style={{ color: "#f1b10f", fontSize: "40px" }}
                      ></i>
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="#">
                      <i
                        className="bi bi-chat-dots"
                        style={{ color: "#f1b10f", fontSize: "40px" }}
                      ></i>
                    </a>
                  </div>
                </div>

                {/* compatitable */}
                <div className="card">
                  <div className="card-body">
                    <div className="rating-card-one text-center">
                      <h6 className="mb-3">How much compatitable with you?</h6>
                      <p>80%, 40/50 questions matched</p>

                      <div className="rating">
                        <a href="#">
                          <i className="bi bi-star-fill"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-star-fill"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-star-fill"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-star-fill"></i>
                        </a>
                        <a href="#">
                          <i className="bi bi-star-half"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-success w-100" type="submit">
                  Follow
                </button>

                <p>
                  I sent email to you Fred Marshall fred.l.marshall30093@gmail.com
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileArea;
