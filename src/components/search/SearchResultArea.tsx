"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

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

interface UserInfo {
  fullName: string;
  role: string;
  id: string;
  profilePhoto: string;
  email: string;
}

const SearchResultArea = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [userList, setUserList] = useState<any[]>([]);
  const [likers, setLikers] = useState<any[]>([]); // users who liked me
  const [likees, setLikees] = useState<any[]>([]); // users who i liked
  const [criteria, setCriteria] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"675642fbf9873c01577f0c8e","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
    }  

    const fetchLikers = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/like/get/likers`,
          {
            likee_id: userInfo.id,
          }
        );
        if (response.data.success) {
          let data = response.data.data;
          let likers_ids = data.map((item: any) => item.liker?.id);
          setLikers(likers_ids);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchLikers();

    const fetchLikees = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/like/get/likees`,
          {
            liker_id: userInfo.id,
          }
        );
        if (response.data.success) {
          let data = response.data.data;
          let likees_ids = data.map((item: any) => item.likee?.id);
          setLikees(likees_ids);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchLikees();

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
        setLikees((prevLikees) => [...prevLikees, likee_id]);
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
        setLikees((prevLikees) => prevLikees.filter((id) => id !== likee_id));
      } else {
        console.log(response.data.message);
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/search`,
        formData
      );
      if (response.data.success) {
        setUserList(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  }

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
                    {["Male", "Female", "Transgender"].map((item, i) => (
                      <div
                        className="form-check col-6 col-sm-4 col-md-3 col-lg-2"
                        key={i}
                      >
                        <input
                          className="form-check-input"
                          id={`checkbox-gender-${i}`}
                          type="checkbox"
                          checked={formData?.gender?.includes(item)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev: any) => ({
                                ...prev,
                                gender: [...(prev.gender || []), item]
                              }));
                            } else {
                              setFormData((prev: any) => ({
                                ...prev,
                                gender: prev.gender?.filter((g: string) => g !== item) || []
                              }));
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox-gender-${i}`}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h6>Age: </h6>
                  <div className="row mb-4">
                    {[
                      { min: 18, max: 30 },
                      { min: 30, max: 50 },
                      { min: 50, max: 99 }
                    ].map((range, i) => (
                      <div className="form-check col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
                        <input
                          className="form-check-input"
                          id={`checkbox-age-${i}`}
                          type="checkbox"
                          checked={formData?.age?.some(a => a.min === range.min && a.max === range.max)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev: any) => ({
                                ...prev,
                                age: [...(prev.age || []), range]
                              }));
                            } else {
                              setFormData((prev: any) => ({
                                ...prev,
                                age: prev.age?.filter((a: any) => !(a.min === range.min && a.max === range.max)) || []
                              }));
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox-age-${i}`}
                        >
                          {range.min} ~ {range.max}
                        </label>
                      </div>
                    ))}
                  </div>

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
                              checked={formData?.criteria?.[criteria._id]?.includes(i)}
                              onChange={(e) => {
                                let criteria_answer = formData?.criteria?.[criteria._id] || [];
                                if (e.target.checked) {                                 
                                  if (!criteria_answer.includes(i)) {
                                    criteria_answer.push(i);
                                  }
                                  
                                  setFormData((prev: any) => ({
                                    ...prev,
                                    criteria: {
                                      ...prev.criteria,
                                      [criteria._id]: criteria_answer
                                    }
                                  }));
                                } else {
                                  if (criteria_answer.includes(i)) {
                                    criteria_answer = criteria_answer.filter((val) => val !== i);
                                  }
                                  setFormData((prev: any) => ({
                                    ...prev,
                                    criteria: {
                                      ...prev.criteria,
                                      [criteria._id]: criteria_answer
                                    }
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
                      <div className="d-flex justify-content-end mb-2 px-5">
                        <button 
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            const allAnswerIndexes = criteria?.answers.map((_, index) => index);
                            setFormData((prev: any) => ({
                              ...prev,
                              criteria: {
                                ...prev.criteria,
                                [criteria._id]: allAnswerIndexes
                              }
                            }));
                          }}
                        >
                          Select All
                        </button>
                        <button
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setFormData((prev: any) => ({
                              ...prev,
                              criteria: {
                                ...prev.criteria,
                                [criteria._id]: []
                              }
                            }));
                          }}
                        >
                          Clear All
                        </button>
                      </div>
                    </>
                  ))}              

                  <a className={`btn btn-primary rounded-pill`} onClick={handleSearch}>
                    Search
                  </a>
                </form>
              </div>

              <div className="top-products-area">
                <div className="container mb-3">
                  {userList.length > 0 ?                   
                      <p className="mb-2 fz-12">{userList.length} candidates found</p>:
                      <p className="mb-2 fz-12">No candidates found</p>
                  }
                  <div className="row g-3">
                    {userList
                      .filter((user) => user.id !== userInfo.id)
                      .map((user, i) => (
                        <div key={i} className="col-6 col-sm-4 col-lg-3">
                          <div className="card single-product-card shadow">
                            <div className="card-body p-3 text-center">
                              {/* <!-- Product Thumbnail --> */}
                              <Link
                                className="product-thumbnail d-block"
                                href={`/member-profile?opponent_id=${user.id}`}
                              >
                                <img src={user.profilePhoto} />
                              </Link>
                              {/* <!-- Product Title --> */}
                              <Link
                                className="product-title d-block text-truncate"
                                href={`/member-profile?opponent_id=${user.id}`}
                              >
                                {user.fullName}
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
                                  <a href={`/chat?opponent_id=${user.id}`}>
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
                                  {likees.includes(user.id) ? (
                                    likers.includes(user.id) ? (
                                      <a
                                        href="#"
                                        className="mr-3"
                                        onClick={() =>
                                          handleUnLikeUser(user.id)
                                        }
                                      >
                                        <i
                                          className="bi-arrow-through-heart-fill"
                                          style={{
                                            color: "#f1b10f",
                                            fontSize: "20px",
                                          }}
                                        ></i>
                                      </a>
                                    ) : (
                                      <a
                                        href="#"
                                        className="mr-3"
                                        onClick={() =>
                                          handleUnLikeUser(user.id)
                                        }
                                      >
                                        <i
                                          className="bi bi-heart-fill"
                                          style={{
                                            color: "#f1b10f",
                                            fontSize: "20px",
                                          }}
                                        ></i>
                                      </a>
                                    )
                                  ) : (
                                    <a
                                      href="#"
                                      onClick={() => handleLikeUser(user.id)}
                                      className="mr-3"
                                    >
                                      <i
                                        className="bi bi-heart"
                                        style={{
                                          color: "#f1b10f",
                                          fontSize: "20px",
                                        }}
                                      ></i>
                                    </a>
                                  )}
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
              {false && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultArea;
