import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ActivationEmail from "../Auth/ActivationEmail";
import NotFound from "../../utils/NotFound";

import ForgotPass from "../Auth/ForgotPassword";
import ResetPass from "../Auth/ResetPassword";

import Profile from "../Profile/Profile";
import EditUser from "../Profile/EditUser";

import Home from "../Home/Dashboard/Home";

import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
        <Route
          path="/register"
          element={isLogged ? <NotFound /> : <Register />}
        />

        <Route
          path="/forgot-password"
          element={isLogged ? <NotFound /> : <ForgotPass />}
        />
        <Route
          path="/user/reset/:token"
          element={isLogged ? <NotFound /> : <ResetPass />}
        />

        <Route
          path="/user/activate/:activation_token"
          element={<ActivationEmail />}
        />

        <Route
          path="/profile"
          element={isLogged ? <Profile /> : <NotFound />}
        />
        <Route
          path="/edit_user/:id"
          element={isAdmin ? <EditUser /> : <NotFound />}
        />
      </Routes>
    </section>
  );
}

export default Body;
