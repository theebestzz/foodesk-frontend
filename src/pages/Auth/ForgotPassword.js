import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-full.png";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/Notification";
import { isEmail } from "../../utils/Validation";

const initialState = {
  email: "",
  err: "",
  success: "",
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/user/forgot-password", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="authincation h-100 p-meddle mt-5">
      <div className="container h-100 mt-5">
        <div className="row justify-content-center h-100 align-items-center mt-5">
          <div className="col-md-6 mt-5">
            <div className="authincation-content mt-5">
              <div className="row no-gutters mt-5">
                <div className="col-xl-12 mt-5">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4">Forgot Password</h4>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <div className="form-group">
                      <label className="">
                        <strong>Email</strong>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        className="form-control"
                        placeholder="example@example.com"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="text-center mt-5">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={forgotPassword}
                      >
                        Verify your email
                      </button>
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
};

export default ForgotPassword;
