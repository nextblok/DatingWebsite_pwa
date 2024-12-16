"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfileArea = () => {
  interface UserInfo {
    fullName: string;
    role: string;
    id: string;
    profilePhoto: string;
    email: string;
  }

  const [features, setFeatures] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    // fullname: "Jamil Rayhan",
    // email: "care@example.com",
    // age: "35",
    // portfolio: "https://themeforest.net/user/rk_theme",
    // address: "28/C Green Road, BD",
    // bio: "Hi, I'm Alex! I love exploring new places, great food, and creative adventures. Looking for someone genuine, who loves to laugh and is up for spontaneous moments and meaningful conversations. Let's make life unforgettable together!",
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"6755930441cec5459c77e680","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/get`,
          {
            user_id: userInfo.id,
          }
        );
        if (response.data.success) {
          console.log(response.data.data);
          setFormData(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchUserData();

    const fetchFeatures = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/feature/get`,
          {}
        );
        if (response.data.result) {
          setFeatures(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchFeatures();

    const fetchCriteria = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/criteria/get`,
          {}
        );
        if (response.data.result) {
          setCriteria(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchCriteria();
  }, []);

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
    (async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
          {
            user_id: userInfo.id,
            ...formData,
          }
        );
        if (response.data.success) {
          console.log(response.data.message);
          setSuccess(true);
          setError(false);
        } else {
          console.log(response.data.message);
          setSuccess(false);
          setError(true);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
        setSuccess(false);
        setError(true);
      }
    })();
  };

  const handleUpdateAvatar = async (e: any) => {
    e.preventDefault();
    console.log("xxxx");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("user_id", userInfo.id);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appuser/updateAvatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.result) {
        console.log(response.data.message);
        window.location.reload();
        setSuccess(true);
        setError(false);
      } else {
        console.log(response.data.message);
        setSuccess(false);
        setError(true);
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="page-content-wrapper py-3">
        <div className="container">
          {/* <!-- User Information--> */}
          <div className="card user-info-card mb-3">
            <div className="card-body d-flex align-items-center">
              <div className="user-profile me-3">
                <img src={formData?.profilePhoto} alt="" />
                <i className="bi bi-pencil"></i>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleUpdateAvatar}
                  />
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
                    value={formData?.fullName}
                    placeholder="Full Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="age">
                    Gender
                  </label>
                  <div className="row px-3">
                    {["male", "female", "transgender "].map((item, i) => (
                      <div className="form-check col-3">
                        <input
                          className="form-check-input"
                          id="defaultCheckbox"
                          type="checkbox"
                          checked={formData?.gender === item}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              gender: item,
                            }));
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheckbox"
                        >
                          {["Male", "Female", "Transgender "][i]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="age">
                    Age
                  </label>
                  <input
                    className="form-control"
                    id="age"
                    type="text"
                    value={formData?.age}
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
                    value={formData?.bio}
                    placeholder="Bio"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Criteria */}
                <div className="search-form-wrapper m-3 mt-5">
                  <div
                    className="mb-3 pb-4 border-bottom"
                  >
                    <h4 className="mb-3">Criteria</h4>
                    {criteria.map((criteria, i) => (
                      <>
                        <h6>{criteria?.question} </h6>
                        <div className="row mb-4">
                          {criteria?.answers.map((item, i) => (
                            <div className="form-check col-6 col-sm-4 col-md-3 col-lg-2">
                              <input
                                className="form-check-input"
                                id={`checkbox-${criteria.question}-${i}`}
                                type="checkbox"
                                checked={formData?.criteria?.[criteria._id] === i}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      criteria: {
                                        ...prev.criteria,
                                        [criteria._id]: i,
                                      },
                                    }));
                                  }
                                }}
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
                      </>
                    ))}
                  </div>
                </div>

                {/* preference box */}
                <div className="search-form-wrapper m-3 mt-5">
                  <div
                    className="mb-3 pb-4 border-bottom"
                  >
                    <h4 className="mb-3">Preference</h4>
                    {features.map((feature, i) => (
                      <>
                        <h6>{feature?.question} </h6>
                        <div className="row mb-4">
                          {feature?.answers.map((item, i) => (
                            <div className="form-check col-6 col-sm-4 col-md-3 col-lg-2">
                              <input
                                className="form-check-input"
                                id={`checkbox-${feature.question}-${i}`}
                                type="checkbox"
                                checked={
                                  formData?.preference?.[feature._id] === i
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      preference: {
                                        ...prev.preference,
                                        [feature._id]: i,
                                      },
                                    }));
                                  }
                                }}
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
                      </>
                    ))}
                  </div>
                </div>
                {success && (
                  <div
                    className="alert custom-alert-1 alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="bi bi-check-circle"></i>
                    Profile updated successfully!
                    <button
                      className="btn btn-close position-relative p-1 ms-auto"
                      type="button"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {error && (
                  <div
                    className="alert custom-alert-1 alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="bi bi-x-circle"></i>
                    Profile update failed!
                  </div>
                )}

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
