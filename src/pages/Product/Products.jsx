import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReuseButton from "../../component/ReuseButton";
import Table from "react-bootstrap/esm/Table";

const Products = () => {
  const [productLists, setProductLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductLists();
  }, []);

  const getProductLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProductLists(response.data);
    } catch (error) {
      navigate("/login");
    }
  };

  const destroyData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/destroy/${id}`);
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
        direction="/product/add"
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
            <th scope="col">Harga</th>
            <th className="td-md" scope="col">
              Stok
            </th>
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
              <td>{product.product_stok}</td>
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

export default Products;
