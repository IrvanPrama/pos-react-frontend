import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddTransaction = () => {
  const [user_name, setUserName] = useState("");
  const [product_id, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [product_price_packet, setProductPricePacket] = useState("");
  const [product_stok, setProductStok] = useState("");
  const [product_sold, setProductSold] = useState("");
  const [setProductTotal] = useState("");
  const [product_pay, setProductPay] = useState("");

  const [productQty, setQty] = useState("");
  const [productTaked, setTaked] = useState("");
  // const [status, setStatus] = useState(0);

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
      setProductStok(selectedProduct.product_stok);
      setProductSold(selectedProduct.product_sold);
      // Update other states as necessary
      setTaked(selectedProduct.product_taked);
    }

    const selectedStockProduct = products.find(
      (products) => products.product_id === selectedProductId
    );
    if (selectedStockProduct) {
      setProductStok(selectedStockProduct.product_stok);
      setProductSold(selectedStockProduct.product_sold);
      setTaked(selectedStockProduct.product_taked);
    }
  };

  const saveTransaction = async (e) => {
    e.preventDefault();
    try {
      const userName = user_name;
      const id = product_id;
      const Qty = parseInt(productQty);
      const productTotal = parseInt(Qty * product_price_packet);
      const productPrice = parseInt(product_price_packet);
      const productStok = parseInt(productQty) - parseInt(productTaked);
      const productSold = parseInt(product_sold) + parseInt(Qty);
      const trId = uuidv4();
      if (Qty > productStok) {
        throw new Error("Jumlah Tidak Boleh Melebihi Stok");
      }

      await axios.patch(`http://localhost:5000/product/update/${id}`, {
        product_sold: productSold,
      });

      await axios.post(`http://localhost:5000/transaction/add`, {
        user_id: userName,
        user_name,
        product_id,
        tr_id: trId,
        product_name,
        product_price: productPrice,
        product_qty: Qty,
        product_total: productTotal,
        product_pay,
        status: 0,
        transaction_type: "paket",
      });

      navigate("/transaction");
    } catch (error) {
      console.log(error.message);
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
              value={product_id}
              onChange={handleProductSelect}
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
              value={
                (parseInt(product_stok) || 0) - (parseInt(product_sold) || 0)
              }
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
              value={productQty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Contoh: 25"
              min={"1"}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total</Form.Label>
            <Form.Control
              type=""
              className="input"
              value={`${product_price_packet * productQty}`}
              onChange={(e) => setProductTotal(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nominal Bayar</Form.Label>
            <Form.Control
              type=""
              className="input"
              value={product_pay}
              onChange={(e) => setProductPay(e.target.value)}
              placeholder="Contoh: Gianyar"
            />
          </Form.Group>

          {/* <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              required
              className="input"
              value={status} // Use product_id for value
              onChange={(e) => setStatus(e.target.value)} // Call handleProductSelect on change
            >
              <option value="">Pilih Produk</option>
              <option value="1">Lunas</option>
              <option value="0">Hutang</option>
            </Form.Select>
          </Form.Group> */}

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
export default AddTransaction;
