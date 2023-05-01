import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  console.log(activation_token);

  return (
    <>
      <div className="container mt-5 text-white text-center p-5">
        <div className="row mt-5">
          <div className="bg-danger mt-5 p-5">{err}</div>
          <div className="bg-success mt-5 p-5">{success}</div>
          <div className="mt-5 p-5">
            <Link to={"/login"} className="p-5 bg-dark text-white">
              Return Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivationEmail;
