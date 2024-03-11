import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [product_name, setProductName] = useState("Nama Produk");
  const [product_price, setProductPrice] = useState("0");
  const [product_stok, setStok] = useState("1");
  const navigate = useNavigate();

  // Fungsi untuk mengirim data ke controller product agar bisa dilakukan penyimpanan
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product/send", {
        product_name,
        product_price,
        product_stok,
      });
      navigate("/product");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} className="p-3 col-5 mx-auto">
        <h2>Masukan Data Produk</h2>
        <Form onSubmit={saveProduct}>
          <Form.Group>
            <Form.Label className="label">Nama Produk</Form.Label>
            <Form.Control
              required
              type="text"
              className="input"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Contoh: Made"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Harga Satuan</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={product_price}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Stok</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={product_stok}
              onChange={(e) => setStok(e.target.value)}
              placeholder="Contoh: 20"
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

export default EditProduct;
