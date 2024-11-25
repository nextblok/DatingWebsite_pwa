"use client";
import React, { useState } from "react";

const UserProfileArea = () => {
  const [formData, setFormData] = useState({
    username: "@designing-world",
    fullname: "Jamil Rayhan",
    email: "care@example.com",
    job: "35",
    portfolio: "https://themeforest.net/user/rk_theme",
    address: "28/C Green Road, BD",
    bio: "Hi, I’m Alex! I love exploring new places, great food, and creative adventures. Looking for someone genuine, who loves to laugh and is up for spontaneous moments and meaningful conversations. Let’s make life unforgettable together!",
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
          {/* <!-- User Information--> */}
          <div className="card user-info-card mb-3">
            <div className="card-body d-flex align-items-center">
              <div className="user-profile me-3">
                <img src="/assets/img/bg-img/2.jpg" alt="" />
                <i className="bi bi-pencil"></i>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input className="form-control" type="file" />
                </form>
              </div>
              <div className="user-info">
                <div className="d-flex align-items-center">
                  <h6 className="mb-1">Update Avatar</h6>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- User Meta Data--> */}
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    className="form-control"
                    id="fullname"
                    type="text"
                    value={formData.fullname}
                    placeholder="Full Name"
                  />{" "}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="job">
                    Age
                  </label>
                  <input
                    className="form-control"
                    id="job"
                    type="text"
                    value={formData.job}
                    placeholder="35"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    cols={30}
                    rows={10}
                    value={formData.bio}
                    placeholder="Bio"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* preference box */}
                <div className="search-form-wrapper m-3 mt-5">
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
                          checked
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
                            checked={i == 2}
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
                            checked={i == 1 || i == 2}
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
                  </form>
                </div>

                <button className="btn btn-success w-100" type="submit">
                  Update Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileArea;
