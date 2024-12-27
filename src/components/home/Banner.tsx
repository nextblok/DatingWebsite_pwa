import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <>
      <div className="container">
        <div
          className="card bg-primary mb-3 bg-img"
          style={{ backgroundImage: `url(/assets/img/core-img/1.png)` }}
        >
          <div className="card-body direction-rtl p-4">
            <h2 className="text-white">Ready to Connect</h2>
            <p className="mb-4 text-white">
              We've created all the tools you need: from chat features to
              profile customization and search filters. Start your journey to
              meaningful connections today.
            </p>
            {/* <Link className="btn btn-warning" href="/privacy-policy"> */}
            <Link className="btn btn-warning" href="/terms">
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
