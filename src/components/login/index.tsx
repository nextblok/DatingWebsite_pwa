"use client";

import HeaderThree from "@/layouts/headers/HeaderThree";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (inputName: any) => {
    setFocusedInput(inputName);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
        // Redirect to home page or dashboard
        window.location.href = "/home";
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderThree links="hero-blocks" />

      {/* <!-- Login Wrapper Area --> */}
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4">
            <img
              className="login-intro-img"
              src="/assets/img/bg-img/36.png"
              alt=""
            />
          </div>

          {/* <!-- Register Form --> */}
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">Welcome to MateMatch</h6>

            <form action="/home" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  className={`form-control ${
                    focusedInput === "email" ? "form-control-clicked" : ""
                  }`}
                  type="text"
                  id="email"
                  placeholder="Email"
                  onFocus={() => handleFocus("email")}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                />
              </div>

              <div className="form-group position-relative">
                <input
                  className={`form-control ${
                    focusedInput === "password" ? "form-control-clicked" : ""
                  }`}
                  id="psw-input"
                  placeholder="Enter Password"
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={`position-absolute ${
                    showPassword ? "active" : ""
                  }`}
                  id="password-visibility"
                  onClick={toggleShowPassword}
                  style={{
                    cursor: "pointer",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </div>
              </div>
              {error && (
                <p className="text-danger text-center mb-3">{error}</p>
              )}			  
              <button className="btn btn-primary w-100" onClick={handleLogin}>
                Sign In
              </button>
            </form>
          </div>

          {/* <!-- Login Meta --> */}
          <div className="login-meta-data text-center">
            <Link
              className="stretched-link forgot-password d-block mt-3 mb-1"
              href="/forget-password"
            >
              Forgot Password?
            </Link>
            <p className="mb-0">
              Didnt have an account?
              <Link className="stretched-link" href="/register">
                {" "}
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
