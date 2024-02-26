import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const AddedPacket = () => {
  //3. gunakan pustaka untuk menambahkan state pada bagian kosong berikut
  const [transactionLists, setTransactionLists] = useState([]);

  // 4. gunakan fungsi pada pustaka yang untuk mengaplikasikan state yang ditambahkan pada bagian kosong berikut
  useEffect(() => {
    getTransactionLists();
  }, []);

  const getTransactionLists = async () => {
    const response = await axios.get("http://localhost:5000/packet/taked");
    setTransactionLists(response.data);
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
            {/* <th className="td-md" scope="col">
              Harga
            </th> */}
            <th className="td-number" scope="col">
              Qty
            </th>
            <th className="td-number" scope="col">
              Sisa
            </th>
            <th className="td-md" scope="col">
              Total
            </th>
            {/* <th className="td-md" scope="col">
              Tipe
            </th> */}
            {/* <th className="td-xl" scope="col">
              Aksi
            </th> */}
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
              <td>{formatCurrency(transaction.product_total)}</td>
              {/* <td>{transaction.transaction_type}</td> */}
              {/* <td>
                <div className="">
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
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AddedPacket;
