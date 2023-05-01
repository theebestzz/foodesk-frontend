import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { showErrMsg, showSuccessMsg } from "../../utils/Notification";
import { isEmail, isEmpty, isLength, isMatch } from "../../utils/Validation";

import logo from "../../assets/images/logo-full.png";
import bgimage from "../../assets/images/login-img/pic-5.jpg";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Register() {
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Password did not match.",
        success: "",
      });
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container mt-0">
      <div className="row align-items-center justify-contain-center bg-login">
        <div className="col-xl-12 mt-5">
          <div className="card border-0">
            <div className="card-body login-bx">
              <div className="row mt-5">
                <div className="col-xl-8 col-md-6  text-center">
                  <img src={bgimage} className="food-img" alt="" />
                </div>
                <div className="col-xl-4 col-md-6 pe-0">
                  <div className="sign-in-your">
                    <div className="text-center mb-3">
                      <img src={logo} className="mb-3" alt="" />
                      <div></div>
                      <span className="dlab-sign-up">Sign up</span>
                    </div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Email Address</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="johndoe@mail.com"
                          value={email}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="********"
                          value={password}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Confirm Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="cf_password"
                          name="cf_password"
                          placeholder="********"
                          value={cf_password}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-4">
                      <span>
                        Do you have an account?{" "}
                        <NavLink to={"/login"} className="text-primary">
                          {" "}
                          Sign in
                        </NavLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
