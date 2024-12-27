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
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [formData, setFormData] = useState({});
  const [opponentId, setOpponentId] = useState("");
  const [matchingScore, setMatchingScore] = useState(0); // 0-100
  useEffect(() => {
    let opponent_id = new URLSearchParams(window.location.search).get(
      "opponent_id"
    );
    if (opponent_id) {
      setOpponentId(opponent_id);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/get`,
          {
            user_id: opponentId,
            watcher_id: userInfo.id,
          }
        );
        if (response.data.success) {
          console.log(response.data.data);
          setFormData(response.data.data);
          setMatchingScore(response.data.data.matchingscore);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchUserData();
  }, [userInfo.id, opponentId]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"6755930441cec5459c77e680","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
    }

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

  
  const handleLikeUser = async (likee_id: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/like/create`,
        {
          liker_id: userInfo.id,
          likee_id: likee_id,
        }
      );
      if (response.data.result) {
        setFormData(prev => ({...prev, likeStatus: {...prev.likeStatus, liked: true}}));
      } else {
        console.log(response.data.message);
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  };

  const handleUnLikeUser = async (likee_id: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/like/delete`,
        {
          liker_id: userInfo.id,
          likee_id: likee_id,
        }
      );
      if (response.data.result) {
        setFormData(prev => ({...prev, likeStatus: {...prev.likeStatus, liked: false}}));
      } else {
        console.log(response.data.message);
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <>
      <div className="page-content-wrapper py-3">
        <div className="container">
          {/* <!-- User Meta Data--> */}
          <div className="card user-data-card">
            <div className="card-body">
                <form>
                {/* avatar */}
                <div className="card team-member-card">
                  <div className="card-body">
                    <div className="team-member-img shadow-sm">
                      <img src={formData?.profilePhoto} alt="" width="300" height="300"/>
                    </div>
                    <div className="team-info">
                      <h4 className="mb-1">{formData?.fullName}</h4>
                      <p className="mb-0">{formData?.email}</p>
                      <p className="mb-0">
                        {formData?.gender} / {formData?.age}
                      </p>
                    </div>
                  </div>
                </div>
                {/* info */}
                <div className="mb-4">
                  <h6>Bio</h6>
                  <p>{formData?.bio}</p>
                </div>

                {/* photos */}
                {/* <div className="mb-4">
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
                </div> */}

                {/* About you */}
                <div className="search-form-wrapper m-3 mt-5">
                  <div className="mb-3 pb-4 border-bottom">
                    <h4 className="mb-3">About him/her</h4>
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
                                checked={
                                  formData?.criteria?.[criteria._id] === i
                                }
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

                {/* actions */}
                <div
                  className="row text-center mb-3"
                  style={{ padding: "0 35% 0 35%" }}
                >
                  {formData?.likeStatus?.liked &&
                    formData?.likeStatus?.mutual && (
                      <div className="col-6">
                        <a href="#" className="mr-3" onClick={()=>handleUnLikeUser(opponentId)}>
                          <i
                            className="bi bi-arrow-through-heart-fill"
                            style={{ color: "#f1b10f", fontSize: "40px" }}
                          ></i>
                        </a>
                      </div>
                    )}
                  {formData?.likeStatus?.liked &&
                    !formData?.likeStatus?.mutual && (
                      <div className="col-6">
                        <a href="#" className="mr-3" onClick={()=>handleUnLikeUser(opponentId)}>
                          <i
                            className="bi bi-heart-fill"
                            style={{ color: "#f1b10f", fontSize: "40px" }}
                          ></i>
                        </a>
                      </div>
                    )}
                  {!formData?.likeStatus?.liked && (
                    <div className="col-6">
                      <a href="#" className="mr-3" onClick={()=>handleLikeUser(opponentId)}>
                        <i
                          className="bi bi-heart"
                          style={{ color: "#f1b10f", fontSize: "40px" }}
                        ></i>
                      </a>
                    </div>
                  )}

                  <div className="col-6">
                    <a
                      href="#"
                      onClick={() =>
                        (window.location.href =
                          "/chat?opponent_id=" + opponentId)
                      }
                    >
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

                      <h5 className="text-center fw-bold text-success">
                        {matchingScore}%,{" "}
                        {(matchingScore * features.length) / 100}/
                        {features.length} questions matched
                      </h5>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileArea;
