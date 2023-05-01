import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/Notification";
import { isLength, isMatch } from "../../utils/Validation";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../redux/actions/usersAction";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const NotificationBlog = [
  { title: "Expecting a slight delay", time: "now" },
  { title: "Your Order has been pickedup by", time: "1 min ago" },
  { title: "Your will arrive at 3:00 - 4:00pm today.", time: "1 hours ago" },
  { title: "Your will arrive at 5:00 - 6:00pm today", time: "3 hours ago" },
];

const inputBlog = [
  { title: "Moblie Apps(s)" },
  { title: "Api" },
  { title: "Moblie web" },
  { title: "Main website" },
  { title: "Tablet" },
  { title: "Other" },
];

const helpblog = [
  { title: "Check your Booking Status" },
  { title: "Checkout of FoodDesk" },
  { title: "Order Tracking Problem" },
  { title: "Login issue" },
];

const policyBlog = [
  { id: "11", title: "Email address" },
  { id: "12", title: "First name and last name" },
  { id: "13", title: "Phone number" },
  { id: "14", title: "Address,state,pin code and city" },
  { id: "15", title: "Social media profile information" },
  { id: "16", title: "Other" },
];

const Setting = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
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
      axios.post(
        "/user/reset-password",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="container">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
        <div
          className="row"
          style={{
            marginTop: "80px",
          }}
        >
          <Tab.Container defaultActiveKey="Account">
            <div className="col-xl-4 mt-5">
              <div className="card">
                <div className="card-body px-3">
                  <Nav
                    className="nav nav-tabs border-0"
                    id="nav-tab"
                    role="tablist"
                  >
                    <Nav.Link
                      className="nav-link setting-bx d-flex"
                      id="pills-account-tab"
                      eventKey="Account"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6C13.2426 6 14.25 4.99264 14.25 3.75C14.25 2.50736 13.2426 1.5 12 1.5C10.7574 1.5 9.75 2.50736 9.75 3.75C9.75 4.99264 10.7574 6 12 6Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M13.5 6.75H10.5C9.50544 6.75 8.55161 7.14509 7.84835 7.84835C7.14509 8.55161 6.75 9.50544 6.75 10.5V14.25C6.75 14.4489 6.82902 14.6397 6.96967 14.7803C7.11032 14.921 7.30109 15 7.5 15C7.69891 15 7.88968 14.921 8.03033 14.7803C8.17098 14.6397 8.25 14.4489 8.25 14.25V10.5C8.2513 10.0358 8.39616 9.58335 8.6647 9.2047C8.93325 8.82605 9.31234 8.53974 9.75 8.385V21.75C9.75 21.9489 9.82902 22.1397 9.96967 22.2803C10.1103 22.421 10.3011 22.5 10.5 22.5C10.6989 22.5 10.8897 22.421 11.0303 22.2803C11.171 22.1397 11.25 21.9489 11.25 21.75V15.615C11.7331 15.799 12.2669 15.799 12.75 15.615V21.75C12.75 21.9489 12.829 22.1397 12.9697 22.2803C13.1103 22.421 13.3011 22.5 13.5 22.5C13.6989 22.5 13.8897 22.421 14.0303 22.2803C14.171 22.1397 14.25 21.9489 14.25 21.75V8.385C14.6877 8.53974 15.0668 8.82605 15.3353 9.2047C15.6038 9.58335 15.7487 10.0358 15.75 10.5V14.25C15.75 14.4489 15.829 14.6397 15.9697 14.7803C16.1103 14.921 16.3011 15 16.5 15C16.6989 15 16.8897 14.921 17.0303 14.7803C17.171 14.6397 17.25 14.4489 17.25 14.25V10.5C17.25 10.0075 17.153 9.51991 16.9645 9.06494C16.7761 8.60997 16.4999 8.19657 16.1517 7.84835C15.8034 7.50013 15.39 7.22391 14.9351 7.03545C14.4801 6.847 13.9925 6.75 13.5 6.75Z"
                          fill="#3D4152"
                        />
                      </svg>
                      <div className="setting-info">
                        <h6>Account</h6>
                        <p className="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor.
                        </p>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link setting-bx d-flex"
                      id="pills-notification-tab"
                      eventKey="Notification"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.125 6.75C5.57475 6.75 6.75 5.57475 6.75 4.125C6.75 2.67525 5.57475 1.5 4.125 1.5C2.67525 1.5 1.5 2.67525 1.5 4.125C1.5 5.57475 2.67525 6.75 4.125 6.75Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M20.25 4.5C19.6533 4.5 19.081 4.73705 18.659 5.15901C18.2371 5.58097 18 6.15326 18 6.75C18.0003 7.17783 18.1226 7.5967 18.3525 7.9575C18.5623 8.28735 18.8544 8.55685 19.2 8.73945C19.5457 8.92205 19.9329 9.01144 20.3236 8.99883C20.7144 8.98621 21.095 8.87202 21.4282 8.66751C21.7613 8.46299 22.0354 8.17521 22.2235 7.83251C22.4116 7.48981 22.5071 7.10403 22.5007 6.71317C22.4943 6.32231 22.3862 5.93986 22.187 5.60351C21.9878 5.26715 21.7044 4.98849 21.3648 4.79499C21.0251 4.60149 20.6409 4.49982 20.25 4.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M7.5 22.5C8.74264 22.5 9.75 21.4926 9.75 20.25C9.75 19.0074 8.74264 18 7.5 18C6.25736 18 5.25 19.0074 5.25 20.25C5.25 21.4926 6.25736 22.5 7.5 22.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M10.41 11.16C10.3113 11.1606 10.2134 11.1416 10.122 11.1043C10.0307 11.067 9.94754 11.012 9.87746 10.9425L4.91996 5.99999C4.77675 5.85678 4.69629 5.66253 4.69629 5.45999C4.69629 5.25746 4.77675 5.06321 4.91996 4.91999C5.06318 4.77678 5.25743 4.69632 5.45996 4.69632C5.6625 4.69632 5.85675 4.77678 5.99996 4.91999L10.9575 9.87749C11.0632 9.9824 11.1354 10.1164 11.1647 10.2625C11.194 10.4085 11.1791 10.56 11.122 10.6976C11.0649 10.8352 10.9681 10.9526 10.8439 11.035C10.7198 11.1173 10.5739 11.1609 10.425 11.16H10.41ZM13.8975 11.5425C13.7364 11.5405 13.5802 11.4867 13.4521 11.389C13.324 11.2913 13.2307 11.155 13.1861 11.0001C13.1415 10.8453 13.148 10.6803 13.2045 10.5294C13.261 10.3785 13.3646 10.2499 13.5 10.1625L18.585 6.92249C18.753 6.81508 18.9569 6.77884 19.1517 6.82174C19.3465 6.86464 19.5163 6.98316 19.6237 7.15124C19.7311 7.31933 19.7674 7.52319 19.7245 7.718C19.6816 7.9128 19.563 8.08258 19.395 8.18999L14.31 11.43C14.1863 11.5067 14.043 11.5458 13.8975 11.5425ZM8.24996 19.68C8.1196 19.6804 7.99139 19.6467 7.87798 19.5824C7.76458 19.5181 7.66989 19.4254 7.60326 19.3133C7.53663 19.2012 7.50037 19.0738 7.49803 18.9434C7.4957 18.8131 7.52739 18.6844 7.58996 18.57L10.29 13.62C10.3894 13.445 10.5543 13.3166 10.7484 13.2631C10.9425 13.2097 11.1499 13.2355 11.325 13.335C11.5 13.4345 11.6284 13.5994 11.6818 13.7935C11.7353 13.9876 11.7094 14.195 11.61 14.37L8.90996 19.32C8.84136 19.4328 8.74421 19.5255 8.62833 19.5887C8.51244 19.6519 8.38193 19.6834 8.24996 19.68Z"
                          fill="#3D4152"
                        />
                      </svg>
                      <div className="setting-info">
                        <h6>Users</h6>
                        <p className="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor.
                        </p>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link setting-bx d-flex"
                      id="pills-security-tab"
                      eventKey="Security"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0003 22.5C11.8942 22.4995 11.7894 22.4765 11.6928 22.4325C7.55282 20.595 4.79282 17.01 3.44282 11.7675L2.25032 6.93C2.21223 6.77899 2.22209 6.61987 2.27854 6.47473C2.33498 6.32958 2.43521 6.2056 2.56532 6.12L3.12032 5.7525C5.79533 3.97063 8.69586 2.55315 11.7453 1.5375C11.8987 1.48659 12.0644 1.48659 12.2178 1.5375C15.2677 2.5555 18.1682 3.97551 20.8428 5.76L21.3978 6.1275C21.5333 6.20741 21.6402 6.32789 21.7035 6.4719C21.7668 6.61591 21.7831 6.77617 21.7503 6.93L20.5428 11.7675C19.2303 17.0175 16.4628 20.595 12.2928 22.4325C12.2009 22.4745 12.1014 22.4974 12.0003 22.5ZM3.85532 7.08L4.93532 11.4C6.09782 16.0425 8.47532 19.245 12.0003 20.925C15.5253 19.245 17.9028 16.0425 19.0653 11.4075L20.1453 7.0875L20.0328 7.0125C17.5381 5.34834 14.8381 4.01472 12.0003 3.045C9.16549 4.01281 6.46803 5.34389 3.97532 7.005L3.85532 7.08Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M12.4357 1.6425C12.3395 1.57281 12.2282 1.52695 12.1108 1.50869C11.9935 1.49044 11.8735 1.50031 11.7607 1.5375C8.71343 2.55612 5.81545 3.97611 3.14318 5.76L2.58818 6.1275C2.45543 6.20953 2.35157 6.33093 2.29107 6.47477C2.23058 6.61862 2.21646 6.77775 2.25068 6.93L3.45818 11.7675C4.77068 17.0175 7.53818 20.595 11.7082 22.4325C11.8216 22.4805 11.9451 22.4999 12.0677 22.4889C12.1904 22.4779 12.3085 22.4369 12.4115 22.3694C12.5146 22.3019 12.5994 22.2101 12.6586 22.1021C12.7177 21.9941 12.7493 21.8732 12.7507 21.75V2.25C12.7501 2.13102 12.7213 2.01387 12.6665 1.90823C12.6117 1.8026 12.5326 1.71152 12.4357 1.6425Z"
                          fill="#3D4152"
                        />
                      </svg>
                      <div className="setting-info">
                        <h6>Slider</h6>
                        <p className="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor.
                        </p>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link setting-bx d-flex"
                      id="pills-payment-tab"
                      eventKey="Payment"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 13.5C14.4853 13.5 16.5 11.4853 16.5 9C16.5 6.51472 14.4853 4.5 12 4.5C9.51472 4.5 7.5 6.51472 7.5 9C7.5 11.4853 9.51472 13.5 12 13.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M16.5 19.5C16.351 19.5009 16.2052 19.4573 16.081 19.375C15.9569 19.2926 15.8601 19.1752 15.8029 19.0376C15.7458 18.9 15.731 18.7485 15.7603 18.6025C15.7896 18.4564 15.8617 18.3224 15.9675 18.2175L20.4675 13.7175C20.7238 13.4479 20.8955 13.1092 20.9615 12.7431C21.0276 12.3771 20.985 11.9997 20.839 11.6575C20.6931 11.3154 20.4501 11.0235 20.1402 10.8178C19.8303 10.6121 19.4669 10.5016 19.095 10.5H15.675C15.4761 10.5 15.2853 10.421 15.1446 10.2803C15.004 10.1397 14.925 9.94891 14.925 9.75C14.925 9.55109 15.004 9.36032 15.1446 9.21967C15.2853 9.07902 15.4761 9 15.675 9H19.095C19.7684 9.00008 20.4266 9.19982 20.9865 9.57397C21.5464 9.94812 21.9827 10.4799 22.2404 11.102C22.4981 11.7241 22.5655 12.4087 22.4342 13.0692C22.3028 13.7296 21.9786 14.3363 21.5025 14.8125L17.0025 19.3125C16.8638 19.4348 16.6849 19.5016 16.5 19.5ZM7.49998 19.5C7.40127 19.5006 7.30343 19.4817 7.21205 19.4443C7.12067 19.407 7.03756 19.352 6.96748 19.2825L2.46748 14.7825C1.99978 14.303 1.6839 13.6962 1.55936 13.038C1.43483 12.3799 1.50719 11.6996 1.76737 11.0824C2.02755 10.4652 2.464 9.93838 3.0221 9.56797C3.5802 9.19757 4.23515 9 4.90498 9H8.32498C8.52389 9 8.71466 9.07902 8.85531 9.21967C8.99596 9.36032 9.07498 9.55109 9.07498 9.75C9.07498 9.94891 8.99596 10.1397 8.85531 10.2803C8.71466 10.421 8.52389 10.5 8.32498 10.5H4.90498C4.52952 10.5018 4.16296 10.6145 3.85135 10.8239C3.53973 11.0334 3.29696 11.3302 3.15352 11.6772C3.01008 12.0242 2.97237 12.4058 3.04513 12.7742C3.11789 13.1425 3.29788 13.4811 3.56248 13.7475L8.06248 18.2475C8.16001 18.3556 8.22399 18.4897 8.24661 18.6334C8.26924 18.7772 8.24953 18.9245 8.1899 19.0573C8.13027 19.1901 8.03328 19.3026 7.91078 19.3812C7.78827 19.4599 7.64553 19.5011 7.49998 19.5Z"
                          fill="#3D4152"
                        />
                      </svg>
                      <div className="setting-info">
                        <h6>Category</h6>
                        <p className="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor.
                        </p>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link setting-bx d-flex"
                      id="pills-help-tab"
                      eventKey="Help"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 10.5C6.15685 10.5 7.5 9.15685 7.5 7.5C7.5 5.84315 6.15685 4.5 4.5 4.5C2.84315 4.5 1.5 5.84315 1.5 7.5C1.5 9.15685 2.84315 10.5 4.5 10.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M19.5 10.5C21.1569 10.5 22.5 9.15685 22.5 7.5C22.5 5.84315 21.1569 4.5 19.5 4.5C17.8431 4.5 16.5 5.84315 16.5 7.5C16.5 9.15685 17.8431 10.5 19.5 10.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M12 10.5C13.6569 10.5 15 9.15685 15 7.5C15 5.84315 13.6569 4.5 12 4.5C10.3431 4.5 9 5.84315 9 7.5C9 9.15685 10.3431 10.5 12 10.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M4.5 19.5C6.15685 19.5 7.5 18.1569 7.5 16.5C7.5 14.8431 6.15685 13.5 4.5 13.5C2.84315 13.5 1.5 14.8431 1.5 16.5C1.5 18.1569 2.84315 19.5 4.5 19.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M19.5 19.5C21.1569 19.5 22.5 18.1569 22.5 16.5C22.5 14.8431 21.1569 13.5 19.5 13.5C17.8431 13.5 16.5 14.8431 16.5 16.5C16.5 18.1569 17.8431 19.5 19.5 19.5Z"
                          fill="#3D4152"
                        />
                        <path
                          d="M12 19.5C13.6569 19.5 15 18.1569 15 16.5C15 14.8431 13.6569 13.5 12 13.5C10.3431 13.5 9 14.8431 9 16.5C9 18.1569 10.3431 19.5 12 19.5Z"
                          fill="#3D4152"
                        />
                      </svg>
                      <div className="setting-info">
                        <h6>Product</h6>
                        <p className="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor.
                        </p>
                      </div>
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </div>
            <div className="col-xl-8 mt-5">
              <Tab.Content>
                <Tab.Pane eventKey="Account">
                  <div className="setting-right">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="mb-4">
                          {isAdmin ? "Admin Profile" : "User Profile"}
                        </h3>

                        <div className="setting-img d-flex align-items-center mb-4">
                          <div className="avatar-upload d-flex align-items-center">
                            <div className=" change position-relative d-flex">
                              <div className="avatar-preview">
                                <img
                                  id="saveImageFile"
                                  src={avatar ? avatar : user.avatar}
                                  alt=""
                                />
                              </div>
                              <div className="change-btn d-flex align-items-center flex-wrap">
                                <input
                                  type="file"
                                  name="file"
                                  id="file_up"
                                  onChange={changeAvatar}
                                />
                                <label
                                  htmlFor="file_up"
                                  className="dlab-upload"
                                >
                                  Choose File
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-sm-6">
                            <div className="setting-input">
                              <label
                                htmlFor="exampleInputtext"
                                className="form-label"
                              >
                                Username
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                defaultValue={user.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="setting-input">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                defaultValue={user.email}
                                name="email"
                                id="email"
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-sm-6">
                            <div className="setting-input">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                name="password"
                                id="password"
                                value={password}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="setting-input">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                name="cf_password"
                                id="cf_password"
                                value={cf_password}
                                onChange={handleChange}
                              />
                            </div>
                            <button
                              className="btn btn-primary float-end w-50 btn-md"
                              disabled={loading}
                              onClick={handleUpdate}
                            >
                              Save Settings
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Notification">
                  <div className="setting-right">
                    {isAdmin ? (
                      <div className="card">
                        <div className="card-header border-0 pb-0">
                          <h4>Users</h4>
                        </div>
                        <div>
                          <table className="container m-5">
                            <thead>
                              <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => (
                                <tr key={user._id}>
                                  <td>
                                    <img
                                      src={user.avatar}
                                      alt=""
                                      width={50}
                                      className="py-3"
                                    />
                                  </td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    {user.role === 1 ? (
                                      <i
                                        className="fas fa-check"
                                        title="Admin"
                                      ></i>
                                    ) : (
                                      <i
                                        className="fas fa-times"
                                        title="User"
                                      ></i>
                                    )}
                                  </td>
                                  <td>
                                    <Link to={`/edit_user/${user._id}`}>
                                      <i
                                        className="fas fa-edit"
                                        title="Edit"
                                      ></i>
                                    </Link>
                                    <i
                                      className="fas fa-trash-alt"
                                      title="Remove"
                                      onClick={() => handleDelete(user._id)}
                                    ></i>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Security">
                  <div className="setting-right">
                    {isAdmin ? (
                      <div className="card">
                        <div className="card-header border-0 pb-0">
                          <h4>Sliders</h4>
                        </div>
                        <div>
                          <table className="container m-5">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => (
                                <tr key={user._id}>
                                  <td>
                                    <img
                                      src={user.avatar}
                                      alt=""
                                      width={50}
                                      className="py-3"
                                    />
                                  </td>
                                  <td>
                                    <Link to={`/edit-slider/${user._id}`}>
                                      <i
                                        className="fas fa-edit"
                                        title="Edit"
                                      ></i>
                                    </Link>
                                    <i
                                      className="fas fa-trash-alt"
                                      title="Remove"
                                      onClick={() => handleDelete(user._id)}
                                    ></i>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Payment">Category</Tab.Pane>
                <Tab.Pane eventKey="Help">Product</Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};
export default Setting;
