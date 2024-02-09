import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPacket = () => {
  const [user_name, setUserName] = useState("");
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price_packet, setProductPricePacket] = useState("");
  const [setProductTotal] = useState("");

  const [qty, setNewQty] = useState("");
  const [productQty, setQty] = useState("");
  const [productTaked, setTaked] = useState("");

  const [products, setProducts] = useState("");
  const [productLists, setProductLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductLists();
  }, []);

  const getProductLists = async () => {
    const response_2 = await axios.get(`http://localhost:5000/product`);
    setProducts(response_2.data);

    // 5. gunakan fungsi pada suatu pustaka yang digunakan untuk meminta data melalui http dan gunakan fungsi get untuk mengambil data itu
    const response = await axios.get("http://localhost:5000/product-menu");
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
      setProductPricePacket(selectedProduct.product_price_packet);
    }

    const selectedStockProduct = products.find(
      (products) => products.product_id === selectedProductId
    );
    if (selectedStockProduct) {
      setQty(selectedStockProduct.product_stok);
      setTaked(selectedStockProduct.product_taked);
    }
  };

  const saveTransaction = async (e) => {
    e.preventDefault();
    try {
      const userName = user_name;
      const Qty = parseInt(qty);
      const productTotal = parseInt(Qty * product_price_packet);
      const productPrice = parseInt(product_price_packet); // Parse the price
      const productStok = parseInt(productQty) - parseInt(productTaked);
      if (Qty > productStok) {
        throw new Error("Jumlah Tidak Boleh Melebihi Stok");
      }

      await axios.post("http://localhost:5000/packet/add", {
        user_id: userName,
        user_name,
        product_id,
        product_name,
        product_price: productPrice,
        product_qty: Qty,
        product_total: productTotal,
        product_taked: "0",
        trasaction_type: "beli",
      });
      navigate("/packet/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Card className="p-3 col-5 mx-auto">
        <h2>Penjualan Paket</h2>
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
            <Form.Label>Stok</Form.Label>
            <Form.Control
              disabled
              type="number"
              className="input"
              value={`${productQty}`}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Contoh: 25000"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Harga Paket</Form.Label>
            <Form.Control
              disabled
              type="number"
              className="input"
              value={product_price_packet}
              onChange={(e) => setProductPricePacket(e.target.value)}
              placeholder="Contoh: 25000"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="label">Jumlah</Form.Label>
            <Form.Control
              type="number"
              className="input"
              value={qty}
              onChange={(e) => setNewQty(e.target.value)}
              placeholder="Contoh: 25"
              min={"1"}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total</Form.Label>
            <Form.Control
              type=""
              className="input"
              value={`${product_price_packet * qty}`}
              onChange={(e) => setProductTotal(e.target.value)}
              placeholder="Contoh: Gianyar"
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
export default AddPacket;
