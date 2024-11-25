"use client";
import React from "react";
import NiceSelect from "../ui/NiceSelect";
import Link from "next/link";

const shop_data: any[] = [
  {
    id: 2,
    img: "/assets/img/bg-img/p2.jpg",
    badge_colro: "primary",
    badge_text: "-10%",
    title: "Basic",
    new_price: 2,
    old_price: 4,
    btn_color: "primary",
    btn_text: "Select",
  },
  {
    id: 3,
    img: "/assets/img/bg-img/p3.jpg",
    badge_colro: "info",
    badge_text: "-15%",
    title: "Plus",
    new_price: 10,
    old_price: 12,
    btn_color: "primary",
    btn_text: "Select",
  },
  {
    id: 4,
    img: "/assets/img/bg-img/p4.jpg",
    badge_colro: "primary",
    badge_text: "Sale",
    title: "Professional",
    new_price: 50,
    old_price: 60,
    btn_color: "danger",
    btn_text: "Current Plan",
  },
  {
    id: 5,
    img: "/assets/img/bg-img/p5.jpg",
    badge_colro: "danger",
    badge_text: "Sale",
    title: "Premier",
    new_price: 78,
    old_price: 112,
    btn_color: "primary",
    btn_text: "Select",
  },
];

const MembershipArea = () => {
  const selectHandler = (e: any) => {};

  return (
    <>
      <div className="page-content-wrapper py-3">
        {/* <!-- Top Products--> */}
        <div className="top-products-area product-list-wrap">
          <div className="container">
            <div className="row g-3">
              {shop_data.slice(0, 6).map((item, i) => (
                <div key={i} className="col-12">
                  <div className="card single-product-card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="card-content px-4 py-2">
                          {/* <!-- Product Title --> */}
                          <h5>{item.title}</h5>
                          {/* <!-- Product Price --> */}
                          <p className="sale-price">
                            ${item.new_price}
                            <span>${item.old_price}</span>
                          </p>
                          <ul className="mb-3 mt-3">
                            <li>- Limited profile views per day</li>
                            <li>- Send up to 5 messages per day</li>
                            <li>- Basic matching algorithm</li>
                            <li>- Access to public photos only</li>
                          </ul>
                          {/* <!-- Select Button --> */}
                          <a
                            className={`btn btn-${
                              item.btn_color
                            } rounded-pill btn-sm ${
                              item.btn_color === "danger" ? "disabled" : ""
                            }`}
                            href="#"
                          >
                            {item.btn_text}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipArea;
