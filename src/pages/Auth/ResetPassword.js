import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../utils/Notification";
import { isLength, isMatch } from "../../utils/Validation";
import logo from "../../assets/images/logo-full.png";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const resetPassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Password did not match.",
        success: "",
      });
    try {
      const res = await axios.post(
        "/user/reset-password",
        { password },
        { headers: { Authorization: token } }
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        className="form-control"
                        placeholder="*********"
                        onChange={handleChangeInput}
                      />
                      <label className="">
                        <strong>Confirm Password</strong>
                      </label>
                      <input
                        type="password"
                        name="cf_password"
                        id="cf_password"
                        value={cf_password}
                        className="form-control"
                        placeholder="*********"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="text-center mt-5">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={resetPassword}
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

export default ResetPassword;
