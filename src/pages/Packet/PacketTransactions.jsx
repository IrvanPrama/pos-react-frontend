import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const PacketTransactions = () => {
  const [transactionLists, setTransactionLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTransactionLists();
  }, []);

  const getTransactionLists = async () => {
    // 5. gunakan fungsi pada suatu pustaka yang digunakan untuk meminta data melalui http dan gunakan fungsi get untuk mengambil data itu
    try {
      const response = await axios.get(
        "http://localhost:5000/packettransactions"
      );
      setTransactionLists(response.data);
    } catch (error) {
      navigate("/login");
    }
  };

  const destroyData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/packet/${id}`);
      getTransactionLists();
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
      <Table striped hover className="table">
        <thead>
          <tr>
            <th className="td-number" scope="col">
              No.
            </th>
            <th className="td-md" scope="col">
              Pemesan
            </th>
            <th className="td-md" scope="col">
              Nama Produk
            </th>
            {/* <th className="td-md" scope="col">
              Harga
            </th> */}
            <th className="td-number" scope="col">
              Qty
            </th>
            <th className="td-md" scope="col">
              Diambil
            </th>
            <th className="td-md" scope="col">
              Total
            </th>
            <th className="td-md" scope="col">
              Tipe
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
              {/* <td>{formatCurrency(transaction.product_price)}</td> */}
              <td>{transaction.product_qty}</td>
              <td>{transaction.product_taked}</td>
              <td>{formatCurrency(transaction.product_total)}</td>
              <td>{transaction.transaction_type}</td>
              <td>
                <div className="">
                  <Link
                    to={`/packet/take/${transaction.id}`}
                    className="btn btn-info col mx-1"
                  >
                    Ambil
                  </Link>
                  <Link
                    to={`/packet/edit/${transaction.id}`}
                    className="btn btn-info col mx-1"
                  >
                    Edit
                  </Link>
                  <div
                    onClick={() => destroyData(transaction.id)}
                    className="btn btn-danger col mx-1"
                  >
                    Hapus
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PacketTransactions;
