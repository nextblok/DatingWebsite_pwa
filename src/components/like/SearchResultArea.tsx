"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/app/layout";
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

const SearchResultArea = () => {
  const { userId } = useGlobalContext();
  const [likees, setLikees] = useState<any[]>([]); // users who i liked

  useEffect(() => {
    const fetchLikees = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/like/get/likees`,
          {
            liker_id: userId,
          }
        );
        if (response.data.success) {
          let data = response.data.data;
          setLikees(data);
        } else {
          console.log(response.data.message);
        }
      } catch (err: any) {
        console.log(err.response?.data?.message);
      }
    };
    fetchLikees();
  }, [userId]);

  const handleUnLikeUser = async (likee_id: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/like/delete`,
        {
          liker_id: userId,
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
                      Mutual Likes
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
                      {likees
                        .filter((item) => !item.mutual)
                        .map((item, i) => (
                          <div key={i} className="col-6 col-sm-4 col-lg-3">
                            <div className="card single-product-card ">
                              <div className="card-body p-3 text-center">
                                {/* <!-- Product Thumbnail --> */}
                                <Link
                                  className="product-thumbnail d-block"
                                  href={`/member-profile?opponent_id=${item.likee?._id}`}
                                >
                                  <img
                                    src={item.likee?.profilePhoto}
                                    alt={item.likee?.fullName}
                                  />
                                </Link>
                                {/* <!-- Product Title --> */}
                                <Link
                                  className="product-title d-block text-truncate"
                                  href={`/member-profile?opponent_id=${item.likee?._id}`}
                                >
                                  {item.likee?.fullName}
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
                                    onClick={() =>
                                      (window.location.href = `/chat?opponent_id=${item.likee?._id}`)
                                    }
                                  >
                                    <i
                                      className="bi bi-chat-dots mr-5"
                                      style={{
                                        color: "#f1b10f",
                                        fontSize: "20px",
                                      }}
                                    ></i>
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
                      {likees
                        .filter((item) => item.mutual)
                        .map((item, i) => (
                          <div key={i} className="col-6 col-sm-4 col-lg-3">
                            <div className="card single-product-card ">
                              <div className="card-body p-3 text-center">
                                {/* <!-- Product Thumbnail --> */}
                                <Link
                                  className="product-thumbnail d-block"
                                  href={`/member-profile?opponent_id=${item.likee?._id}`}
                                >
                                  <img
                                    src={item.likee?.profilePhoto}
                                    alt={item.likee?.fullName}
                                  />
                                </Link>
                                {/* <!-- Product Title --> */}
                                <Link
                                  className="product-title d-block text-truncate"
                                  href={`/member-profile?opponent_id=${item.likee?._id}`}
                                >
                                  {item.likee?.fullName}
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
                                    onClick={() =>
                                      (window.location.href = `/chat?opponent_id=${item.likee?._id}`)
                                    }
                                  >
                                    <i
                                      className="bi bi-chat-dots mr-5"
                                      style={{
                                        color: "#f1b10f",
                                        fontSize: "20px",
                                      }}
                                    ></i>
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
