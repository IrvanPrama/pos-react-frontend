import React from "react";
import axios from "axios";
import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user_name, setName] = useState("Gede");
  const [user_password, setPassword] = useState("u389hfh");
  const [user_nohp, setNohp] = useState("0823928398");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      // Kirim data pengguna dan userId ke server
      await axios.post("http://localhost:5000/user/add", {
        user_name,
        user_password,
        user_nohp,
      });
      navigate("/users/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Card className="p-3">
        <h2>Add User</h2>
        <Form onSubmit={saveUser}>
          <Form.Group>
            <Form.Label className="label">Nama</Form.Label>
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
              placeholder="Contoh: GIanyar"
            />
          </Form.Group>

          <Button className="my-3" type="submit" variant="warning">
            Save
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;
