import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import HeaderSlider from "./HeaderSlider";

const LocationIcon = <i className="fa-solid fa-location-dot mx-2 " />;

function AddSearchSlider() {
  let SearchBlog = document.getElementById("Search-Blog");
  let BoxTab = document.getElementById("close-searchbox");
  setTimeout(() => {
    if (BoxTab.classList.contains("active")) {
      return (
        BoxTab.classList.remove("active"), SearchBlog.classList.remove("active")
      );
    } else {
      return BoxTab.classList.add("active"), SearchBlog.classList.add("active");
    }
  }, 100);
}

function Header() {
  const [selectCountry, setSelectCountry] = useState([LocationIcon, "India"]);
  const [headerFix, setheaderFix] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      const dropbtn = document.getElementById("droptoggle1");
      function toggledrop() {
        return dropbtn.classList.toggle("show");
      }
      dropbtn.addEventListener("click", toggledrop);
    }, 500);

    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li>
        <Dropdown className="header-profile2">
          <Dropdown.Toggle
            as="a"
            className={`nav-link i-false cursor-pointer `}
            id="droptoggle1"
          >
            <div className="header-info2 d-flex align-items-center">
              <img src={user.avatar} alt="" />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <h6 className="font-w500 mb-0 ms-2">{user.name}</h6>
                </div>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-end">
            <Link to="/profile" className="dropdown-item ai-icon ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="ms-2">Profile</span>
            </Link>
            <Link
              onClick={handleLogout}
              to="/logout"
              className="dropdown-item ai-icon "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                className="svg-main-icon"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path
                    d="M18.6225,9.75 L18.75,9.75 C19.9926407,9.75 21,10.7573593 21,12 C21,13.2426407 19.9926407,14.25 18.75,14.25 L18.6854912,14.249994 C18.4911876,14.250769 18.3158978,14.366855 18.2393549,14.5454486 C18.1556809,14.7351461 18.1942911,14.948087 18.3278301,15.0846699 L18.372535,15.129375 C18.7950334,15.5514036 19.03243,16.1240792 19.03243,16.72125 C19.03243,17.3184208 18.7950334,17.8910964 18.373125,18.312535 C17.9510964,18.7350334 17.3784208,18.97243 16.78125,18.97243 C16.1840792,18.97243 15.6114036,18.7350334 15.1896699,18.3128301 L15.1505513,18.2736469 C15.008087,18.1342911 14.7951461,18.0956809 14.6054486,18.1793549 C14.426855,18.2558978 14.310769,18.4311876 14.31,18.6225 L14.31,18.75 C14.31,19.9926407 13.3026407,21 12.06,21 C10.8173593,21 9.81,19.9926407 9.81,18.75 C9.80552409,18.4999185 9.67898539,18.3229986 9.44717599,18.2361469 C9.26485393,18.1556809 9.05191298,18.1942911 8.91533009,18.3278301 L8.870625,18.372535 C8.44859642,18.7950334 7.87592081,19.03243 7.27875,19.03243 C6.68157919,19.03243 6.10890358,18.7950334 5.68746499,18.373125 C5.26496665,17.9510964 5.02757002,17.3784208 5.02757002,16.78125 C5.02757002,16.1840792 5.26496665,15.6114036 5.68716991,15.1896699 L5.72635306,15.1505513 C5.86570889,15.008087 5.90431906,14.7951461 5.82064513,14.6054486 C5.74410223,14.426855 5.56881236,14.310769 5.3775,14.31 L5.25,14.31 C4.00735931,14.31 3,13.3026407 3,12.06 C3,10.8173593 4.00735931,9.81 5.25,9.81 C5.50008154,9.80552409 5.67700139,9.67898539 5.76385306,9.44717599 C5.84431906,9.26485393 5.80570889,9.05191298 5.67216991,8.91533009 L5.62746499,8.870625 C5.20496665,8.44859642 4.96757002,7.87592081 4.96757002,7.27875 C4.96757002,6.68157919 5.20496665,6.10890358 5.626875,5.68746499 C6.04890358,5.26496665 6.62157919,5.02757002 7.21875,5.02757002 C7.81592081,5.02757002 8.38859642,5.26496665 8.81033009,5.68716991 L8.84944872,5.72635306 C8.99191298,5.86570889 9.20485393,5.90431906 9.38717599,5.82385306 L9.49484664,5.80114977 C9.65041313,5.71688974 9.7492905,5.55401473 9.75,5.3775 L9.75,5.25 C9.75,4.00735931 10.7573593,3 12,3 C13.2426407,3 14.25,4.00735931 14.25,5.25 L14.249994,5.31450877 C14.250769,5.50881236 14.366855,5.68410223 14.552824,5.76385306 C14.7351461,5.84431906 14.948087,5.80570889 15.0846699,5.67216991 L15.129375,5.62746499 C15.5514036,5.20496665 16.1240792,4.96757002 16.72125,4.96757002 C17.3184208,4.96757002 17.8910964,5.20496665 18.312535,5.626875 C18.7350334,6.04890358 18.97243,6.62157919 18.97243,7.21875 C18.97243,7.81592081 18.7350334,8.38859642 18.3128301,8.81033009 L18.2736469,8.84944872 C18.1342911,8.99191298 18.0956809,9.20485393 18.1761469,9.38717599 L18.1988502,9.49484664 C18.2831103,9.65041313 18.4459853,9.7492905 18.6225,9.75 Z"
                    fill="var(--primary)"
                    fillRule="nonzero"
                    opacity="0.3"
                  />
                  <path
                    d="M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z"
                    fill="var(--primary)"
                  />
                </g>
              </svg>
              <span className="ms-2">Logout</span>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  };

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="bg-white">
            <Link to="/" className="brand-logo">
              <svg
                className="logo-abbr"
                width="39"
                height="31"
                viewBox="0 0 39 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.125 21.125L26.9952 23.2623C27.6771 24.0417 28.8616 24.1206 29.6409 23.4387C29.7036 23.3839 29.7625 23.325 29.8173 23.2623L31.6875 21.125H36.375C35.2848 26.5762 30.4985 30.5 24.9393 30.5H14.0607C8.5015 30.5 3.71523 26.5762 2.625 21.125H25.125Z"
                  fill="var(--primary)"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M36.375 9.875H2.625C3.71523 4.4238 8.5015 0.5 14.0607 0.5H24.9393C30.4985 0.5 35.2848 4.4238 36.375 9.875Z"
                  fill="var(--primary)"
                ></path>
                <path
                  opacity="0.3"
                  d="M36.375 13.625H2.625C1.58947 13.625 0.75 14.4645 0.75 15.5C0.75 16.5355 1.58947 17.375 2.625 17.375H36.375C37.4105 17.375 38.25 16.5355 38.25 15.5C38.25 14.4645 37.4105 13.625 36.375 13.625Z"
                  fill="var(--primary)"
                ></path>
              </svg>
              <svg
                className="brand-title"
                width="147"
                height="22"
                viewBox="0 0 147 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.532 1.344V5.18H5.524V9.324H11.516V13.048H5.524V21H0.736V1.344H13.532ZM23.1605 21.224C21.6298 21.224 20.2485 20.8973 19.0165 20.244C17.8032 19.5907 16.8418 18.6573 16.1325 17.444C15.4418 16.2307 15.0965 14.812 15.0965 13.188C15.0965 11.5827 15.4512 10.1733 16.1605 8.96C16.8698 7.728 17.8405 6.78533 19.0725 6.132C20.3045 5.47867 21.6858 5.152 23.2165 5.152C24.7472 5.152 26.1285 5.47867 27.3605 6.132C28.5925 6.78533 29.5632 7.728 30.2725 8.96C30.9818 10.1733 31.3365 11.5827 31.3365 13.188C31.3365 14.7933 30.9725 16.212 30.2445 17.444C29.5352 18.6573 28.5552 19.5907 27.3045 20.244C26.0725 20.8973 24.6912 21.224 23.1605 21.224ZM23.1605 17.08C24.0752 17.08 24.8498 16.744 25.4845 16.072C26.1378 15.4 26.4645 14.4387 26.4645 13.188C26.4645 11.9373 26.1472 10.976 25.5125 10.304C24.8965 9.632 24.1312 9.296 23.2165 9.296C22.2832 9.296 21.5085 9.632 20.8925 10.304C20.2765 10.9573 19.9685 11.9187 19.9685 13.188C19.9685 14.4387 20.2672 15.4 20.8645 16.072C21.4805 16.744 22.2458 17.08 23.1605 17.08ZM40.9886 21.224C39.458 21.224 38.0766 20.8973 36.8446 20.244C35.6313 19.5907 34.67 18.6573 33.9606 17.444C33.27 16.2307 32.9246 14.812 32.9246 13.188C32.9246 11.5827 33.2793 10.1733 33.9886 8.96C34.698 7.728 35.6686 6.78533 36.9006 6.132C38.1326 5.47867 39.514 5.152 41.0446 5.152C42.5753 5.152 43.9566 5.47867 45.1886 6.132C46.4206 6.78533 47.3913 7.728 48.1006 8.96C48.81 10.1733 49.1646 11.5827 49.1646 13.188C49.1646 14.7933 48.8006 16.212 48.0726 17.444C47.3633 18.6573 46.3833 19.5907 45.1326 20.244C43.9006 20.8973 42.5193 21.224 40.9886 21.224ZM40.9886 17.08C41.9033 17.08 42.678 16.744 43.3126 16.072C43.966 15.4 44.2926 14.4387 44.2926 13.188C44.2926 11.9373 43.9753 10.976 43.3406 10.304C42.7246 9.632 41.9593 9.296 41.0446 9.296C40.1113 9.296 39.3366 9.632 38.7206 10.304C38.1046 10.9573 37.7966 11.9187 37.7966 13.188C37.7966 14.4387 38.0953 15.4 38.6926 16.072C39.3086 16.744 40.074 17.08 40.9886 17.08ZM50.7528 13.16C50.7528 11.5547 51.0514 10.1453 51.6488 8.932C52.2648 7.71867 53.0954 6.78533 54.1408 6.132C55.1861 5.47867 56.3528 5.152 57.6408 5.152C58.6674 5.152 59.6008 5.36667 60.4408 5.796C61.2994 6.22533 61.9714 6.804 62.4568 7.532V0.28H67.2448V21H62.4568V18.76C62.0088 19.5067 61.3648 20.104 60.5248 20.552C59.7034 21 58.7421 21.224 57.6408 21.224C56.3528 21.224 55.1861 20.8973 54.1408 20.244C53.0954 19.572 52.2648 18.6293 51.6488 17.416C51.0514 16.184 50.7528 14.7653 50.7528 13.16ZM62.4568 13.188C62.4568 11.9933 62.1208 11.0507 61.4488 10.36C60.7954 9.66933 59.9928 9.324 59.0408 9.324C58.0888 9.324 57.2768 9.66933 56.6048 10.36C55.9514 11.032 55.6248 11.9653 55.6248 13.16C55.6248 14.3547 55.9514 15.3067 56.6048 16.016C57.2768 16.7067 58.0888 17.052 59.0408 17.052C59.9928 17.052 60.7954 16.7067 61.4488 16.016C62.1208 15.3253 62.4568 14.3827 62.4568 13.188ZM78.0727 1.344C80.1447 1.344 81.9553 1.75467 83.5047 2.576C85.054 3.39733 86.2487 4.55467 87.0887 6.048C87.9473 7.52267 88.3767 9.23067 88.3767 11.172C88.3767 13.0947 87.9473 14.8027 87.0887 16.296C86.2487 17.7893 85.0447 18.9467 83.4767 19.768C81.9273 20.5893 80.126 21 78.0727 21H70.7087V1.344H78.0727ZM77.7647 16.856C79.5753 16.856 80.9847 16.3613 81.9927 15.372C83.0007 14.3827 83.5047 12.9827 83.5047 11.172C83.5047 9.36133 83.0007 7.952 81.9927 6.944C80.9847 5.936 79.5753 5.432 77.7647 5.432H75.4967V16.856H77.7647ZM105.78 12.936C105.78 13.384 105.752 13.8507 105.696 14.336H94.8604C94.9351 15.3067 95.2431 16.0533 95.7844 16.576C96.3444 17.08 97.0257 17.332 97.8284 17.332C99.0231 17.332 99.8537 16.828 100.32 15.82H105.416C105.155 16.8467 104.679 17.7707 103.988 18.592C103.316 19.4133 102.467 20.0573 101.44 20.524C100.414 20.9907 99.2657 21.224 97.9964 21.224C96.4657 21.224 95.1031 20.8973 93.9084 20.244C92.7137 19.5907 91.7804 18.6573 91.1084 17.444C90.4364 16.2307 90.1004 14.812 90.1004 13.188C90.1004 11.564 90.4271 10.1453 91.0804 8.932C91.7524 7.71867 92.6857 6.78533 93.8804 6.132C95.0751 5.47867 96.4471 5.152 97.9964 5.152C99.5084 5.152 100.852 5.46933 102.028 6.104C103.204 6.73867 104.119 7.644 104.772 8.82C105.444 9.996 105.78 11.368 105.78 12.936ZM100.88 11.676C100.88 10.8547 100.6 10.2013 100.04 9.716C99.4804 9.23067 98.7804 8.988 97.9404 8.988C97.1377 8.988 96.4564 9.22133 95.8964 9.688C95.3551 10.1547 95.0191 10.8173 94.8884 11.676H100.88ZM114.662 21.224C113.3 21.224 112.086 20.9907 111.022 20.524C109.958 20.0573 109.118 19.4227 108.502 18.62C107.886 17.7987 107.541 16.884 107.466 15.876H112.198C112.254 16.4173 112.506 16.856 112.954 17.192C113.402 17.528 113.953 17.696 114.606 17.696C115.204 17.696 115.661 17.584 115.978 17.36C116.314 17.1173 116.482 16.8093 116.482 16.436C116.482 15.988 116.249 15.6613 115.782 15.456C115.316 15.232 114.56 14.9893 113.514 14.728C112.394 14.4667 111.461 14.196 110.714 13.916C109.968 13.6173 109.324 13.16 108.782 12.544C108.241 11.9093 107.97 11.06 107.97 9.996C107.97 9.1 108.213 8.288 108.698 7.56C109.202 6.81333 109.93 6.22533 110.882 5.796C111.853 5.36667 113.001 5.152 114.326 5.152C116.286 5.152 117.826 5.63733 118.946 6.608C120.085 7.57867 120.738 8.86667 120.906 10.472H116.482C116.408 9.93067 116.165 9.50133 115.754 9.184C115.362 8.86667 114.84 8.708 114.186 8.708C113.626 8.708 113.197 8.82 112.898 9.044C112.6 9.24933 112.45 9.53867 112.45 9.912C112.45 10.36 112.684 10.696 113.15 10.92C113.636 11.144 114.382 11.368 115.39 11.592C116.548 11.8907 117.49 12.1893 118.218 12.488C118.946 12.768 119.581 13.2347 120.122 13.888C120.682 14.5227 120.972 15.3813 120.99 16.464C120.99 17.3787 120.729 18.2 120.206 18.928C119.702 19.6373 118.965 20.1973 117.994 20.608C117.042 21.0187 115.932 21.224 114.662 21.224ZM133.468 21L128.708 14.448V21H123.92V0.28H128.708V11.732L133.44 5.376H139.348L132.852 13.216L139.404 21H133.468ZM143.468 21.224C142.628 21.224 141.938 20.9813 141.396 20.496C140.874 19.992 140.612 19.376 140.612 18.648C140.612 17.9013 140.874 17.276 141.396 16.772C141.938 16.268 142.628 16.016 143.468 16.016C144.29 16.016 144.962 16.268 145.484 16.772C146.026 17.276 146.296 17.9013 146.296 18.648C146.296 19.376 146.026 19.992 145.484 20.496C144.962 20.9813 144.29 21.224 143.468 21.224Z"
                  fill="var(--primary)"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="container d-block my-0">
            <div className="d-flex align-items-center justify-content-sm-between justify-content-end">
              <div className="header-left">
                <div className="nav-item d-flex align-items-center">
                  <div className="d-flex header-bx" id="Search-Blog">
                    <Dropdown className="bootstrap-select">
                      <Dropdown.Toggle
                        className="header-select-toggle btn btn-light i-false"
                        as="div"
                      >
                        {selectCountry}{" "}
                        <i className="header-select-icon fa-solid fa-sort-down"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="">
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "India"])
                          }
                        >
                          {LocationIcon} India
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Nepal"])
                          }
                        >
                          {LocationIcon} Nepal
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Bangladesh"])
                          }
                        >
                          {LocationIcon} Bangladesh
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Brazil"])
                          }
                        >
                          {LocationIcon} Brazil
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "China"])
                          }
                        >
                          {LocationIcon} China
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Denmark"])
                          }
                        >
                          {LocationIcon} Denmark
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Germany"])
                          }
                        >
                          {LocationIcon} Germany
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Japan"])
                          }
                        >
                          {LocationIcon} Japan
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            setSelectCountry([LocationIcon, "Lithuania"])
                          }
                        >
                          {LocationIcon} Lithuania
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div
                      className="input-group search-area2 ps-3"
                      id="Serach-bar"
                      onClick={() => AddSearchSlider()}
                    >
                      <span className="input-group-text h-search">
                        <Link to={"#"}>
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.3"
                              d="M16.6751 19.4916C16.2195 19.036 16.2195 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9917 22.5084C23.4473 22.964 23.4473 23.7027 22.9917 24.1583C22.5361 24.6139 21.7974 24.6139 21.3417 24.1583L16.6751 19.4916Z"
                              fill="var(--primary)"
                            />
                            <path
                              d="M12.8333 18.6667C16.055 18.6667 18.6666 16.055 18.6666 12.8333C18.6666 9.61168 16.055 7 12.8333 7C9.61163 7 6.99996 9.61168 6.99996 12.8333C6.99996 16.055 9.61163 18.6667 12.8333 18.6667ZM12.8333 21C8.32297 21 4.66663 17.3437 4.66663 12.8333C4.66663 8.32301 8.32297 4.66667 12.8333 4.66667C17.3436 4.66667 21 8.32301 21 12.8333C21 17.3437 17.3436 21 12.8333 21Z"
                              fill="var(--primary)"
                            />
                          </svg>
                        </Link>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What do you want eat today"
                      />
                    </div>
                    <div className="search-drop">
                      <div className="card tag-bx">
                        <div className="card-header d-block border-0">
                          <h4>Recently Searched</h4>
                          <ul className="d-flex align-items-center flex-wrap">
                            <li>
                              <Link
                                to={"#"}
                                className="btn btn-outline-light btn-rounded me-2"
                              >
                                Bakery
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"#"}
                                className="btn btn-outline-light btn-rounded me-2"
                              >
                                Burger
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"#"}
                                className="btn btn-outline-light btn-rounded me-2"
                              >
                                Beverage
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"#"}
                                className="btn btn-outline-light btn-rounded me-2"
                              >
                                Chicken
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"#"}
                                className="btn btn-outline-light btn-rounded mt-3 mt-xl-0"
                              >
                                Pizza
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body pt-0">
                          <h4>popular Cuisines</h4>
                          <div className="swiper mySwiper-4">
                            <HeaderSlider />
                          </div>
                        </div>
                      </div>
                      <div
                        id="close-searchbox"
                        onClick={() => AddSearchSlider()}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="navbar-nav header-right">
                {isLogged ? (
                  userLink()
                ) : (
                  <>
                    <li>
                      <Link to={"/login"} className="btn btn-primary">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"} className="btn btn-primary">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default Header;
