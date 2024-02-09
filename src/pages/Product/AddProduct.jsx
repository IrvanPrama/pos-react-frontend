import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [products, setProducts] = useState([]); // State untuk daftar produk
  const [product_name, setProductName] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [product_stok, setStok] = useState("1");
  const navigate = useNavigate();

  const handleProductSelect = (e) => {
    const selectedProductName = e.target.value;

    // Cari data produk yang sesuai berdasarkan nama
    const selectedProduct = products.find(
      (product) => product.product_name === selectedProductName
    );

    if (selectedProduct) {
      setProductName(selectedProduct.product_name);
      setSelectedProductPrice(selectedProduct.product_price); // Set harga satuan yang dipilih
      setSelectedProductId(selectedProduct.product_id); // Set harga satuan yang dipilih
    }
  };

  // Fungsi untuk mengirim data ke controller product agar bisa dilakukan penyimpanan
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product/send", {
        product_id: selectedProductId,
        product_name,
        product_price: selectedProductPrice,
        product_stok,
      });
      navigate("/product");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Panggil API untuk mengambil data produk
    axios.get("http://localhost:5000/product-menu").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <Card style={{ width: "18rem" }} className="p-3 col-5 mx-auto">
        <h2>Tambah Stok Produk</h2>
        <Form onSubmit={saveProduct}>
          <Form.Group>
            <Form.Label className="label">Nama Produk</Form.Label>
            <Form.Select
              required
              className="input"
              value={product_name}
              onChange={handleProductSelect}
            >
              <option value="">Pilih Produk</option>
              {products.map((product) => (
                <option key={product.id} value={product.product_name}>
                  {product.product_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Harga Satuan</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={selectedProductPrice}
              onChange={(e) => setSelectedProductPrice(e.target.value)}
              readOnly
              placeholder="Harga Satuan"
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

export default AddProduct;
