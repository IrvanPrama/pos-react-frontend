import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [user_name, setUserName] = useState("");
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_qty, setQty] = useState("");
  const [status, setStatus] = useState("");
  const [setProductTotal] = useState("");

  // Add state variables for input field validity and error messages
  const [userNameValid, setUserNameValid] = useState(true);
  const [productQtyValid, setProductQtyValid] = useState(true);
  const [productPriceValid, setProductPriceValid] = useState(true);
  const [productTotalValid, setProductTotalValid] = useState(true);

  const [productLists, setProductLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductLists();
  }, []);

  const getProductLists = async () => {
    // 5. gunakan fungsi pada suatu pustaka yang digunakan untuk meminta data melalui http dan gunakan fungsi get untuk mengambil data itu
    const response = await axios.get("http://localhost:5000/product");
    setProductLists(response.data);
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = productLists.find(
      (product) => product.product_id === selectedProductId
    );
    if (selectedProduct) {
      setProductId(selectedProductId);
      setProductName(selectedProduct.product_name);
    }
  };

  const validateUserName = () => {
    // Add validation logic here
    // For example, check if the user_name is not empty
    setUserNameValid(user_name !== "");
  };

  const validateProductQty = () => {
    // Add validation logic here
    // For example, check if the product_qty is a positive number
    setProductQtyValid(parseInt(product_qty) > 0);
  };

  const validateProductPrice = () => {
    // Add validation logic here
    // For example, check if the product_price is a positive number
    setProductPriceValid(parseFloat(product_price) > 0);
  };

  const saveTransaction = async (e) => {
    e.preventDefault();

    // Validate input fields
    validateUserName();
    validateProductQty();
    validateProductPrice();

    // Check if all fields are valid
    if (
      userNameValid &&
      productQtyValid &&
      productPriceValid &&
      productTotalValid
    ) {
      try {
        const userName = user_name;
        const productTot = parseInt(product_price) * parseInt(product_qty); // Mengonversi ke angka
        // console.log(productTot);
        await axios.post("http://localhost:5000/transaction/add", {
          user_id: userName,
          user_name,
          product_id,
          product_name,
          product_price,
          product_qty,
          status: "1",
          product_total: productTot,
          product_taked: "0",
        });
        navigate("/transaction");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <Card className="p-3 col-5 mx-auto">
        <h2>Catat Penjualan</h2>
        <Form onSubmit={saveTransaction}>
          <Form.Group>
            <Form.Label className="label">Pemesan</Form.Label>
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
            <Form.Label className="label">Produk</Form.Label>
            <Form.Select
              required
              className="input"
              value={product_id} // Use product_id for value
              onChange={handleProductSelect} // Call handleProductSelect on change
            >
              <option value="">Pilih Produk</option>
              {productLists.map((product) => (
                <option key={product.id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="label">Jumlah</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={product_qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Contoh: 25"
              min={"1"}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Harga Satuan</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={product_price}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Contoh: 25000"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={`${product_price * product_qty}`}
              onChange={(e) => setProductTotal(e.target.value)}
              placeholder=""
            />
          </Form.Group>

          <Button className="my-3" type="submit" variant="warning">
            Simpan
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default AddTransaction;
