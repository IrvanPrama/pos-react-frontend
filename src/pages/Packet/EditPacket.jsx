import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditPacket = () => {
  const [user_name, setUserName] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_qty, setQty] = useState("");
  const [product_taked, setTaked] = useState("");
  const [setProductId] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDataById();
  }, []);

  const updatePacket = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/packet/update/${id}`, {
        product_qty,
        product_taked,
      });
      navigate("/packet");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataById = async () => {
    const response = await axios.get(`http://localhost:5000/packet/take/${id}`);
    setUserName(response.data.user_name);
    setProductId(response.data.product_id);
    setProductName(response.data.product_name);
    setProductPrice(response.data.product_price);
    setQty(response.data.product_qty);
    setTaked(response.data.product_taked);
  };

  return (
    <div>
      <Card className="p-3 col-5 mx-auto">
        <h2>Update Paket</h2>
        <Form onSubmit={updatePacket}>
          <Form.Group>
            <Form.Label className="label">Nama</Form.Label>
            <Form.Control
              disabled
              type="text"
              className="input"
              value={user_name}
              placeholder="Contoh: Made"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Product</Form.Label>
            <Form.Control
              disabled
              type="text"
              className="input"
              value={product_name}
              placeholder="Contoh: ABC123"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Harga</Form.Label>
            <Form.Control
              disabled
              type="text"
              className="input"
              value={product_price}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stok Dibeli</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={product_qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Diambil</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={product_taked}
              onChange={(e) => setTaked(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>

          <Button className="my-3" type="submit" variant="warning">
            Perbaharui
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EditPacket;
