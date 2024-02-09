// Login.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// Tambahkan LINK
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Step 13, tambahkan fungsi berikut untuk kirim data login
    // Step 14, ada di File AuthRoutes
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        credentials
      );

      console.log(response.data);

      // Step 18, Ketik berjalan lancar arahkan ke /dashboard
      if (response.data.message === "Login successful") {
        // Redirect ke Dasboard
        navigate("/dashboard");
      } else {
        //Ketika gagal
        // Handle other success scenarios or display an error message
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.message || "An unexpected error occurred"
      );
      // Handle different types of errors (e.g., display error messages to the user)
    }
  };

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>

              {/* Step 12, tambahkan LINK */}
              <p>
                Belum punya akun? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
