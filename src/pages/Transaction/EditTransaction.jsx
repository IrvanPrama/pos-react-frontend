import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditTransaction = () => {
  const [user_name, setUserName] = useState("");
  // const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_qty, setProductQty] = useState("");
  const [product_taked, setProductTaked] = useState("");
  const [product_pay, setProductPay] = useState("");
  // const [product_total, setProductTotal] = useState("");
  // const [transaction_type, setTransactionType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTransactionById();
  }, []);

  // Fungsi untuk mengirim data ke controller product agar bisa dilakukan penyimpanan
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/packet/update/${id}`, {
        user_name,
        // product_id,
        product_name,
        product_price,
        product_qty,
        product_taked,
        product_pay,
        // product_taked,
        // product_total,
        // transaction_type,
      });

      await axios.patch(`http://localhost:5000/transaction/update/${id}`, {
        user_name,
        product_name,
        product_price,
        product_qty,
        product_taked,
        product_pay,
      });
      navigate("/packet");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTransactionById = async () => {
    const response = await axios.get(`http://localhost:5000/transaction/${id}`);
    setUserName(response.data.user_name);
    setProductName(response.data.product_name);
    setProductQty(response.data.product_qty);
    setProductPrice(response.data.product_price);
    setProductTaked(response.data.product_taked);
    setProductPay(response.data.product_pay);
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} className="p-3 col-5 mx-auto">
        <h2>Edit Packet</h2>
        <Form onSubmit={saveProduct}>
          <Form.Group>
            <Form.Label className="label">Nama Pelanggan</Form.Label>
            <Form.Control
              required
              type="text"
              className="input"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Contoh: Made"
            />
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
            <Form.Label>Dibayar</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={product_pay}
              onChange={(e) => setProductPay(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Jumlah Pembelian</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={product_qty}
              onChange={(e) => setProductQty(e.target.value)}
              placeholder="Contoh: 20"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Diambil</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={product_taked}
              onChange={(e) => setProductTaked(e.target.value)}
              placeholder="Contoh: 20"
            />
          </Form.Group>
          <Button className="my-3" type="submit" variant="warning">
            Simpan
          </Button>
          <Link
            to={"/transaction"}
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
export default EditTransaction;
