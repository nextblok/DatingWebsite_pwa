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

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    //{"fullName":"Sarah Johnson","role":"user","id":"675642fbf9873c01577f0c8e","profilePhoto":"https://randomuser.me/api/portraits/women/31.jpg","email":"sarah@gmail.com"}
    let userInfo: UserInfo = {} as UserInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUserInfo(userInfo);
    }

    const fetchUserList = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/appuser/get`,
          {
            user_id: userInfo.id,
          }
        );
        if (response.data.result) {
          setUserList(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchUserList();

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
                      <div
                        className="form-check col-6 col-sm-4 col-md-3 col-lg-2"
                        key={i}
                      >
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
                    <div className="form-check col-6 col-sm-4 col-md-3 col-lg-2">
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
                        18 ~ 30
                      </label>
                    </div>
                    <div className="form-check col-6 col-sm-4 col-md-3 col-lg-2">
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
                        30 ~ 50
                      </label>
                    </div>
                    <div className="form-check col-6 col-sm-4 col-md-3 col-lg-2">
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
                        50 ~ 99
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
                      <div
                        className="form-check col-6 col-sm-4 col-md-3 col-lg-2"
                        key={i}
                      >
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
                      <div
                        className="form-check col-6 col-sm-4 col-md-3 col-lg-2"
                        key={i}
                      >
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
                    {userList
                      .filter((item) => item._id !== userInfo.id)
                      .map((item, i) => (
                        <div key={i} className="col-6 col-sm-4 col-lg-3">
                          <div className="card single-product-card shadow">
                            <div className="card-body p-3 text-center">
                              {/* <!-- Product Thumbnail --> */}
                              <Link
                                className="product-thumbnail d-block"
                                href="/member-profile"
                              >
                                <img src={item.profilePhoto} />
                              </Link>
                              {/* <!-- Product Title --> */}
                              <Link
                                className="product-title d-block text-truncate"
                                href="/member-profile"
                              >
                                {item.fullName}
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
                                  <a href={`/chat?opponent_id=${item._id}`}>
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
                                  {likees.includes(item._id) ? (
                                    likers.includes(item._id) ? (
                                      <a
                                        href="#"
                                        className="mr-3"
                                        onClick={() =>
                                          handleUnLikeUser(item._id)
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
                                          handleUnLikeUser(item._id)
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
                                      onClick={() => handleLikeUser(item._id)}
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
