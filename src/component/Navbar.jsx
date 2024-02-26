import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/authSlice";

const Navbar = () => {
  // const dispatch = useDispatch(); // dipakai untuk menggunakan Dispatch
  // const navigate = useNavigate(); // dipakai untuk menggunakan navigasi
  // const { user } = useSelector((state) => state.auth); // dipakai untuk menggunakan Selector, untuk memilih fungsi yang digunakan dala file ./features/authSlide.js

  // MEMBUAT FUNGSI LOGOUT
  //1 Lihat variabel logout di nomor 2
  // - masukan fungsi:
  // - dispatch(Logout());
  // - dispatch(reset());
  // - navigate("/login");

  const logout = () => {
    //2. masukan semua fungsi diatas kedalam variabel logout ini
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item"></NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* 3. Panggil fungsi logout di dalam onClick */}
                <button onClick="" className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
