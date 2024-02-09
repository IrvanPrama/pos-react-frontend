import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [user_id] = useState();
  const [user_profile] = useState("");
  const [user_name, setName] = useState("");
  const [user_password, setPassword] = useState("1234");
  const [user_nohp, setNohp] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/user/update/${id}`, {
        user_profile, //tambahakan ini
        user_name,
        user_password,
        user_nohp,
      });
      navigate("/users/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/user/edit/${id}`);
    setName(response.data.user_name);
    setPassword(response.data.user_password);
    setNohp(response.data.user_nohp);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("userId", user_id); // Pastikan Anda memiliki user_id dalam state

    try {
      await axios.post(`http://localhost:5000/upload/profile/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        user_profile,
      });
      alert("Upload berhasil");
      navigate("/users/");
    } catch (error) {
      console.error("Upload gagal:", error);
    }
  };

  return (
    <div>
      <Card className="p-3 mx-auto" style={{ width: "30rem" }}>
        <h2>Update User</h2>
        <Form onSubmit={updateUser}>
          <Form.Group>
            <Form.Group>
              <div>
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
                  className="img-thumbnail"
                  alt=""
                />
              </div>
              <Form.Label htmlFor="formFile" className="label">
                Profile
              </Form.Label>
              <Form.Control
                required
                id="formFile"
                type="file"
                accept="image/*"
                className="input"
                onChange={handleFileChange}
              />
              <Button onClick={handleUpload} className="btn btn-primary mt-2">
                Simpan Foto
              </Button>
            </Form.Group>
            <Form.Label className="label">Nama</Form.Label>
            <Form.Control
              required
              type="text"
              className="input"
              value={user_name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Made"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Nama</Form.Label>
            <Form.Control
              required
              type="text"
              className="input"
              value={user_name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Made"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contoh: ABC123"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nomor HP</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={user_nohp}
              onChange={(e) => setNohp(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>

          <Button className="my-3" type="submit" variant="warning">
            Update
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EditUser;
