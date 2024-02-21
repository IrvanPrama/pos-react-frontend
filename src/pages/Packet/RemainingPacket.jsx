import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const RemainingPacket = () => {
  const [transactionLists, setTransactionLists] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTransactionLists();
  }, []);

  const getTransactionLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/packet/beli/01");
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
              Qty
            </th>
            <th className="td-md" scope="col">
              Diambil
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
              {/* <td>{formatCurrency(transaction.product_total)}</td> */}
              {/* <td>{transaction.transaction_type}</td> */}
              <td>
                <div className="">
                  <Link
                    to={`/packet/take/${transaction.id}`}
                    className="btn btn-info col mx-1"
                  >
                    Ambil
                  </Link>
                  {/* <div
                    onClick={() => destroyData(transaction.id)}
                    className="btn btn-danger col mx-1"
                  >
                    Hapus
                  </div> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RemainingPacket;
