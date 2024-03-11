import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";

const TakePacket = () => {
  const [user_id, setUserId] = useState("");
  const [user_name, setUserName] = useState("");
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_qty, setQty] = useState("");
  const [product_total, setProductTotal] = useState("");
  const [product_taked, setProductTaked] = useState("");
  const [error, setError] = useState(null); // State untuk menangani error
  const [taked, setTaked] = useState("0");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line
    getPacketById();
  }, []);

  // eslint-disable-next-line
  const getPacketById = async () => {
    const response = await axios.get(`http://localhost:5000/packet/take/${id}`);
    setUserId(response.data.user_id);
    setUserName(response.data.user_name);
    setProductId(response.data.product_id);
    setProductName(response.data.product_name);
    setProductPrice(response.data.product_price);
    setQty(response.data.product_qty);
    setProductTaked(response.data.product_taked);
    setProductTotal(response.data.product_total);
    // setTransactionType(response.data.transaction_type);
  };

  const saveTransaction = async (e) => {
    e.preventDefault();
    try {
      const newProductTaked = parseInt(product_taked) + parseInt(taked); // Calculate the new product_taked value
      if (newProductTaked < 1) {
        throw new Error("Jumlah Diambil harus minimal 1");
      }
      await axios.patch(`http://localhost:5000/packet/update/${id}`, {
        product_taked: newProductTaked, // Update product_taked with the new value
      });

      const newTaked = parseInt(taked); // Calculate the new product_taked value
      if (newTaked < 1) {
        throw new Error("Minimal ambil 1");
      }

      // Check again if the newTaked value is valid after parsing it
      if (isNaN(newTaked)) {
        throw new Error("Jumlah Diambil harus angka dan minimal 1");
      }

      if (newTaked == product_qty - product_taked - taked) {
        throw new Error("Jumlah Diambil tidak boleh lebih dari stok sisa");
      }

      await axios.post(`http://localhost:5000/packet/add`, {
        user_id,
        user_name,
        product_id,
        product_name,
        product_price,
        product_qty: product_taked,
        product_taked: newTaked,
        product_total,
        status: "1",
        transaction_type: "ambil",
      });

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <Card className="p-3">
        <h2>Ambil Paket</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={saveTransaction}>
          <Form.Group>
            <Form.Label className="label">Pelanggan</Form.Label>
            <Form.Control
              required
              disabled
              type="text"
              className="input"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Contoh: Made"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label" disabled>
              Nama Produk
            </Form.Label>
            <Form.Control
              required
              disabled
              type="text"
              className="input"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Contoh: Made"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Sisa</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={`${product_qty - product_taked - taked}`} // Use product_taked here
              onChange={(e) => setProductTaked(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Jumlah Diambil</Form.Label>
            <Form.Control
              type="number"
              className="input"
              placeholder="Contoh: 20"
              onChange={(e) => setTaked(e.target.value)}
              min="1"
            />
          </Form.Group>
          <Button className="my-3" type="submit" variant="warning">
            Ambil
          </Button>
          <Link
            to={"/packet"}
            className="btn btn-danger m-3"
            type="submit"
            variant="warning"
          >
            Batal
          </Link>
        </Form>
      </Card>
    </div>
  );
};

export default TakePacket;
