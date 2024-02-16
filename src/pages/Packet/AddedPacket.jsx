import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const AddedPacket = () => {
  const navigate = useNavigate();
  const [transactionLists, setTransactionLists] = useState([]);

  useEffect(() => {
    getTransactionLists();
  }, []);

  const getTransactionLists = async () => {
    // 5. gunakan fungsi pada suatu pustaka yang digunakan untuk meminta data melalui http dan gunakan fungsi get untuk mengambil data itu
    const response = await axios.get("http://localhost:5000/packet/added");
    setTransactionLists(response.data);
  };

  return (
    <div>
      <Table striped hover className="w-auto">
        <thead>
          <tr>
            <th className="td-number" scope="col">
              No.
            </th>
            <th className="td-md" scope="col">
              Pelanggan
            </th>
            <th className="td-md" scope="col">
              Produk
            </th>
            <th className="td-number" scope="col">
              Stok
            </th>
            <th className="td-md" scope="col">
              Diambil
            </th>
            <th className="td-md" scope="col">
              Sisa
            </th>

            <th className="td-xl" scope="col">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {transactionLists.map((transaction, index) => (
            <tr key={transaction.id}>
              <th scope="row">{index + 1}</th>
              <td>{transaction.user_name}</td>
              <td>{transaction.product_name}</td>
              <td>{transaction.product_qty}</td>
              <td>{transaction.product_taked}</td>
              <td>{`${
                transaction.product_qty - transaction.product_taked
              }`}</td>
              <td>
                <div className="">
                  <Link
                    to={`/packet/take/${transaction.id}`}
                    className="btn btn-info col mx-1"
                  >
                    Ambil
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

export default AddedPacket;
