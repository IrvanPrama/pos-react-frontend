import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table, Form, InputGroup, Row } from "react-bootstrap";

const Transactions = () => {
  const [transactionLists, setTransactionLists] = useState([]);
  const [transactionTotal, setTotalTransaction] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBy, setFilter] = useState("");
  const [filterQty, setFilterQty] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    getTransactionLists();
    getTotalTransaction();
  }, []);

  const getTotalTransaction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/totaltransactions"
      );
      setTotalTransaction(response.data.totalP);
    } catch (error) {
      console.error("Gagal mengambil total transaksi:", error);
    }
  };

  const getTransactionLists = async () => {
    const response = await axios.get("http://localhost:5000/transactions");
    setTransactionLists(response.data);
  };

  const destroyData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/destroy/data/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
    return formattedValue.replace(/\D00$/, "");
  };

  const handleUpdateStatusPayOf = async (id) => {
    // Buat salinan data
    try {
      await axios.patch(`http://localhost:5000/transaction/status/${id}`, {
        status: 1,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateStatusDebt = async (id) => {
    // Buat salinan data
    try {
      await axios.patch(`http://localhost:5000/transaction/status/${id}`, {
        status: 0,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: "0" }}>
        Total: {formatCurrency(transactionTotal)}
      </h3>

      <Row className="mb-2">
        <Form className="col-3">
          <InputGroup>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Pembeli"
            />
          </InputGroup>
        </Form>
        <Form className="col-2">
          <InputGroup>
            <Form.Control
              as="select"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option selected disabled>
                Status
              </option>
              <option value="">Semua</option>
              <option value="1">Lunas</option>
              <option value="0">Ngutang</option>
            </Form.Control>
          </InputGroup>
        </Form>
        <Form className="col-2">
          <InputGroup>
            <Form.Control
              as="select"
              value={filterQty}
              onChange={(e) => setFilterQty(e.target.value)}
            >
              <option selected disabled>
                Qty
              </option>
              <option value=""> all </option>
              <option value="less10"> less 10 </option>
              <option value="more10"> more 10 </option>
            </Form.Control>
          </InputGroup>
        </Form>
      </Row>
      <Table striped hover className="table">
        <thead>
          <tr>
            <th className="td-number" scope="col">
              No.
            </th>
            <th scope="col">Pembeli</th>
            <th scope="col">Produk</th>
            <th className="td-number" scope="col">
              Qty
            </th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th className="td-xl" scope="col">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Fitur Search dan filter */}
          {transactionLists
            .filter((item) => {
              return (
                (item.status.toString() === filterBy || filterBy === "") && // filter status
                (search.toLowerCase() === "" ||
                  item.user_name.toLowerCase().includes(search)) && // filter pencarian
                ((filterQty === "less10" && item.product_qty < 10) || // filter Qty kurang dari 11
                  (filterQty === "more10" && item.product_qty > 10) || // filter Qty lebih dari atau sama dengan 10
                  filterQty === "") // jika filter Qty tidak dipilih, abaikan kondisi Qty
              );
            })
            .map((transaction, index) => (
              <tr key={transaction.id}>
                <th className="td-number" scope="row">
                  {index + 1}
                </th>
                <td>{transaction.user_name}</td>
                <td>{transaction.product_name}</td>
                <td>{transaction.product_qty}</td>
                <td>{formatCurrency(transaction.product_total)}</td>
                {transaction.status === 0 ? <td>Ngutang</td> : <td>Lunas</td>}
                <td>
                  <div className="">
                    {transaction.status === 0 ? (
                      <Button
                        onClick={() => handleUpdateStatusPayOf(transaction.id)}
                        className="btn btn-success col mx-1"
                      >
                        Lunasi
                      </Button>
                    ) : null}

                    {transaction.status === 1 ? (
                      <Button
                        onClick={() => handleUpdateStatusDebt(transaction.id)}
                        className="btn btn-warning col mx-1"
                      >
                        Jadikan Hutang
                      </Button>
                    ) : null}

                    <Button
                      onClick={() => destroyData(transaction.id)}
                      className="btn btn-danger col mx-1"
                    >
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transactions;
