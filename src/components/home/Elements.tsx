import Link from "next/link";
import React from "react";

const Elements = () => {
  return (
    <>
      <div className="container mt-3">
        <div
          className="card card-bg-img bg-img bg-overlay mb-3"
          style={{ backgroundImage: `url(/assets/img/bg-img/3.jpg)` }}
        >
          <div className="card-body direction-rtl p-4">
            <h2 className="text-white">MateMatch</h2>

            <p className="mb-4 text-white">
              Access exclusive features designed to make your dating experience
              seamless and enjoyable. Upgrade your profile and stand out!
            </p>
            <Link className="btn btn-warning" href="/about-us">
              About US
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Elements;
