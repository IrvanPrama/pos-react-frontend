import React, { useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/authSlice";
import { getMe } from "../features/authSlice";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  console.log("User:", user); // Tambahkan log untuk user di sini

  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top shadow-sm bg-body-tertiary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            {/* Your logo */}
          </NavLink>

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
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <img
                  className="profile-img"
                  src={`http://localhost:5000/public/images/${
                    user && user.user_profile
                  }`}
                  alt=""
                  srcset=""
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" className="text-capitalize">
                  {user && user.user_name}
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
