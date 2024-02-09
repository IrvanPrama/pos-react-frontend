import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProductMenu = () => {
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("Pakan Finisher");
  const [product_price, setProductPrice] = useState("0");
  const [product_price_packet, setProductPricePacket] = useState("0");
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State untuk menangani error

  // Fungsi untuk mengirim data ke controller product agar bisa dilakukan penyimpanan
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product-menu/send", {
        product_id,
        product_name,
        product_price,
        product_price_packet,
      });
      navigate("/product-menu");
    } catch (error) {
      console.log(error.message);
      setError("ID yang anda pilih sudah ada, silahkan pilih ID lain.");
    }
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} className="p-3 col-5 mx-auto">
        <h2>Masukan Produk Baru</h2>
        <Form onSubmit={saveProduct}>
          <Form.Group>
            <Form.Label className="label">Produk ID</Form.Label>
            <Form.Select
              required
              type="text"
              className="input"
              value={product_id} // Gunakan product_id untuk nilai
              onChange={(e) => setProductId(e.target.value)} // Panggil handleProductSelect pada perubahan
            >
              <option value="">Pilih ID</option>
              {/* Loop sebanyak 20 kali */}
              {[...Array(20)].map((_, index) => (
                <option
                  key={index}
                  value={index < 9 ? `0${index + 1}` : `${index + 1}`}
                >
                  {index < 9 ? `0${index + 1}` : `${index + 1}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

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
            <Form.Label>Harga Paketan</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={product_price_packet}
              onChange={(e) => setProductPricePacket(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>
          <Button className="my-3" type="submit" variant="warning">
            Simpan
          </Button>
        </Form>
      </Card>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default AddProductMenu;
