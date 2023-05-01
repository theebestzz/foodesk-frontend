import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { showSuccessMsg, showErrMsg } from "../../utils/Notification";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      navigate.push("/profile");
    }
  }, [users, id, navigate]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    <div className="container">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="row">
        <button onClick={() => navigate.goBack()} className="go_back">
          <i className="fas fa-long-arrow-alt-left"></i> Go Back
        </button>
      </div>

      <div className="container">
        <h2>Edit User</h2>

        <div className="form-group m-3">
          <label htmlFor="name" className="px-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="form-group m-3">
          <label htmlFor="email" className="px-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group m-3">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          />
          <label htmlFor="isAdmin" className="px-2">
            isAdmin
          </label>
        </div>

        <button className="btn btn-success" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditUser;
