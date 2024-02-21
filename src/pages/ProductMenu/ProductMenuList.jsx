import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReuseButton from "../../component/ReuseButton";
import Table from "react-bootstrap/esm/Table";
import { useNavigate } from "react-router-dom";

const ProductMenu = () => {
  const navigate = useNavigate();
  const [productLists, setProductLists] = useState([]);
  useEffect(() => {
    getProductLists();
  }, []);

  const getProductLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product-menu");
      setProductLists(response.data);
    } catch (error) {
      navigate("/login");
    }
  };

  const destroyData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product-menu/destroy/${id}`);
      getProductLists();
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
    return formattedValue.replace(/\D00$/, ""); // Remove ".00" at the end of the string
  };

  return (
    <div>
      <ReuseButton
        variant="primary"
        direction="/product-menu/add"
        title="Tambah data"
      />
      <Table striped hover className="table">
        <thead>
          <tr>
            <th className="td-number" scope="col">
              No.
            </th>
            <th className="td-md" scope="col">
              ID Produk
            </th>
            <th scope="col">Nama Produk</th>
            <th scope="col">Harga Satuan</th>
            <th scope="col">Harga Paketan</th>

            <th className="" scope="col">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {productLists.map((product, index) => (
            <tr key={product.id}>
              <th scope="row">{index + 1}</th>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{formatCurrency(product.product_price)}</td>
              <td>{formatCurrency(product.product_price_packet)}</td>
              <td>
                <div className="">
                  <div
                    onClick={() => destroyData(product.id)}
                    className="btn btn-danger col mx-1"
                  >
                    Hapus
                  </div>
                  <Link to={``} className="btn btn-info col mx-1">
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductMenu;
