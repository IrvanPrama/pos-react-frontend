// Login.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//Step 1 import LINK, Form, Button
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// Step 2, copy code front-end dari AddUser.jsx
const Signup = () => {
  const [user_name, setName] = useState("");
  const [user_password, setPassword] = useState("");
<<<<<<< HEAD
  const [role, setRole] = useState("");
=======
  const [user_nohp, setNohp] = useState("");
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8
  const navigate = useNavigate();

  // Step 9, tambahkan fitur hide & show password line: 16-21
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Step 10, tambahkan hadle untuk kirim data signup line: 24 - 38
  // Step 11, ada di Login.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data pengguna dan userId ke server
      await axios.post("http://localhost:5000/user/add", {
        user_name,
        user_password,
<<<<<<< HEAD
        role,
=======
        user_nohp,
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8
      });
      navigate("/users/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Signup</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className="label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    className="input"
                    value={user_name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: ABC123"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label">Password</Form.Label>
                  {/* Step 3, tambahkan div class input-group */}
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"} //Step 4, tambahkan type
                      className="input"
                      value={user_password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contoh: ABC123"
                    />
                    <button //Step 5, tambahkan button show or hide password
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </Form.Group>
                <Form.Group>
<<<<<<< HEAD
                  <Form.Label>Daftar sebagai</Form.Label>
                  <div className="input">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
=======
                  <Form.Label>Nomor HP</Form.Label>
                  <Form.Control
                    type="text"
                    className="input"
                    value={user_nohp}
                    onChange={(e) => setNohp(e.target.value)}
                    placeholder="Contoh: GIanyar"
                  />
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8
                </Form.Group>

                <Button className="my-3" type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
              {/* Step 6, tambahkan link redirect ke signup */}
              <p>
<<<<<<< HEAD
                Sudah punya akun? <Link to="/login">Login</Link>
=======
                Sudah punya akun? <Link to="/signup">Signup</Link>
>>>>>>> 135ef67907117b9cbc29fde041ae00c36f9d07b8
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Step 7, ganti export Login menjadi Signup
// Next Step 8, di App.js
export default Signup;
