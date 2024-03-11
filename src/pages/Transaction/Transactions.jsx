import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImg from "../../public/images/logo192.png";
import { getMe } from "../../features/authSlice";
import Dropdown from "react-bootstrap/Dropdown";

const Transactions = () => {
  const [transactionLists, setTransactionLists] = useState([]);
  const [transactionTotal, setTotalTransaction] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBy, setFilter] = useState("");
  const [filterQty, setFilterQty] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getTransactionLists();
    getTotalTransaction();
    dispatch(getMe());
  }, [dispatch]);

  const getTotalTransaction = async () => {
    const response = await axios.get("http://localhost:5000/totaltransactions");
    setTotalTransaction(response.data.totalP);
  };

  const getTransactionLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transaction");
      setTransactionLists(response.data);
    } catch (error) {
      navigate("/login");
    }
  };

  const destroyData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/destroy/data/${id}`);
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

  const printNotaMultiProduct = async (user_id, id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/${user_id}`
      );
      const date_response = await axios.get(
        `http://localhost:5000/transaction/${id}`
      );
      const transactions = response.data;
      const date = date_response.data;
      const doc = new jsPDF({ format: "a6" });

      let total = 0; // Inisialisasi total transaksi
      let pay = 0; // Inisialisasi total transaksi

      // Tambahkan logo di pojok kanan atas
      const logoWidth = 20;
      const logoHeight = 20;
      doc.addImage(
        logoImg,
        "PNG",
        doc.internal.pageSize.getWidth() - logoWidth - 10,
        5,
        logoWidth,
        logoHeight
      );

      // Ubah format tanggal
      const transactionDate = new Date(date.createdAt);
      const formattedDate = transactionDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Tambahkan informasi nama pembeli dan tanggal transaksi di atas tabel
      doc.setFontSize(9);
      doc.setFont("helvatica", "bold");
      doc.text(`NOTA PELANGGAN`, 14, 10);
      doc.setFontSize(8);
      doc.setFont("helvatica", "normal");
      doc.text(`Tanggal: ${formattedDate}`, 14, 15);
      doc.text(`Pelanggan: ${user_id}`, 14, 20);
      doc.text(`Kasir: ${user && user.user_name}`, 14, 25);

      // Tambahkan detail transaksi
      let y = 30;
      const tableBody = []; // Inisialisasi array untuk data body tabel

      transactions.forEach((transaction, index) => {
        const rowData = [
          `${index + 1}. ${transaction.product_name}`,
          transaction.transaction_type,
          transaction.product_qty,
          formatCurrency(transaction.product_total),
        ];
        tableBody.push(rowData); // Masukkan data transaksi ke dalam array body tabel
        total += transaction.product_total; // Tambahkan total transaksi
        pay += transaction.product_pay;
      });

      // Tampilkan tabel dengan jsPDF-autotable
      doc.autoTable({
        head: [["Produk", "Tipe", "Qty", "Total"]],
        body: tableBody, // Gunakan array body yang telah dibuat
        startY: y, // posisi awal tabel
        theme: "striped", // tema tabel
        styles: {
          fontSize: 8,
          cellPadding: 2,
          textColor: [0, 0, 0],
          fontStyle: "normal",
          halign: "left", // penyesuaian horizontal
          valign: "middle", // penyesuaian vertikal
        },
        headStyles: {
          fillColor: [103, 178, 240], // warna latar belakang header
          textColor: [255, 255, 255], // warna teks header
          fontStyle: "bold", // gaya teks header
        },
      });

      // Tambahkan jumlah yang dibayar di bawah tabel
      const subtotalY = doc.autoTable.previous.finalY + 5;
      const totalPaidY = subtotalY + 5;
      const sisaY = totalPaidY + 5;
      const sisa = total - pay;
      doc.setFontSize(8);
      // Tambahkan subtotal
      doc.text(`Subtotal`, 53, subtotalY);
      doc.text(`: ${formatCurrency(total)}`, 65, subtotalY);
      doc.text("Dibayar", 53, totalPaidY);
      doc.text(`: ${formatCurrency(pay)}`, 65, totalPaidY);
      doc.text("Kurang", 53, sisaY);
      doc.text(`: ${formatCurrency(sisa)}`, 65, sisaY);

      // Simpan atau tampilkan PDF kepada pengguna
      doc.save(`nota-${user_id}.pdf`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const printNota = async (user_id, id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/${user_id}`
      );
      const date_response = await axios.get(
        `http://localhost:5000/transaction/${id}`
      );
      const transactions = response.data;
      const date = date_response.data;

      let total = 0; // Inisialisasi total transaksi
      let pay = 0; // Inisialisasi total transaksi

      // Membuat HTML untuk nota
      let notaHTML = `
        <html>
          <head>
            <title>Nota Transaksi</title>
            <style>
              /* Atur gaya CSS untuk mencetak */
              @page {
                size: A6 potrait;
                margin: 0;
              }
              .row{
                display: flex;
                flex-wrap: wrap;
              }
              p{
                font-size: 8px;
              }
              th{
                width: fit-content;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .container {
                padding: 10px;
              }
              .logo {
                width: 50px;
                height: 50px;
              }
              .table {
                font-size: 8px;
                width: 100%;
                border-collapse: collapse;
              }
              .table th, .table td {
                border: 1px solid #000;
                padding: 8px;
              }
              .table th {
                background-color: #f2f2f2;
                font-weight: bold;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
            <div class="row">
              <img src="${logoImg}" alt="Logo" class="logo">
              <h2>Nota Transaksi</h2>
              </div>
              <p>Tanggal: ${new Date(date.createdAt).toLocaleDateString()}</p>
              <p>Pelanggan: ${user_id}</p>
              <p>Kasir: ${user && user.user_name}</p>
              <table class="table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Produk</th>
                    <th>Tipe</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
      `;

      transactions.forEach((transaction, index) => {
        notaHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${transaction.product_name}</td>
            <td>${transaction.transaction_type}</td>
            <td>${transaction.product_qty}</td>
            <td>${formatCurrency(transaction.product_total)}</td>
          </tr>
        `;
        total += transaction.product_total; // Tambahkan total transaksi
        pay += transaction.product_pay;
      });

      // Menutup tag HTML
      notaHTML += `
                </tbody>
              </table>
              <p>Subtotal: ${formatCurrency(total)}</p>
              <p>Dibayar: ${formatCurrency(pay)}</p>
              <p>Kurang: ${formatCurrency(total - pay)}</p>
            </div>
          </body>
        </html>
      `;

      // Membuat window baru untuk mencetak nota
      const newWindow = window.open("", "_blank");
      newWindow.document.open();
      newWindow.document.write(notaHTML);
      newWindow.document.close();

      // Mencetak window baru
      newWindow.print();
    } catch (error) {
      console.log(error.message);
    }
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
            <th className="">Tipe</th>
            <th className="">Qty</th>
            <th scope="col">Total</th>
            <th scope="col">Dibayar</th>
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
                <td>{transaction.transaction_type}</td>
                <td>{transaction.product_qty}</td>
                <td>{formatCurrency(transaction.product_total)}</td>
                <td>{formatCurrency(transaction.product_pay)}</td>
                {transaction.status === 0 ? <td>Ngutang</td> : <td>Lunas</td>}

                <Dropdown>
                  <Dropdown.Toggle
                    variant="warning"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#/action-1"
                      className="text-capitalize"
                    >
                      <Link
                        to={`/transaction/edit/${transaction.id}`}
                        className="btn btn-info col mx-1"
                      >
                        Edit
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        onClick={() =>
                          printNota(transaction.user_id, transaction.id)
                        }
                        className="btn-warning col mx-1"
                      >
                        Print
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        onClick={() =>
                          printNotaMultiProduct(
                            transaction.user_id,
                            transaction.id
                          )
                        }
                        className="btn col mx-1"
                      >
                        Nota
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {transaction.status === 0 ? (
                        <Button
                          onClick={() =>
                            handleUpdateStatusPayOf(transaction.id)
                          }
                          className="btn btn-success col mx-1"
                        >
                          Lunasi
                        </Button>
                      ) : null}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {transaction.status === 1 ? (
                        <Button
                          onClick={() => handleUpdateStatusDebt(transaction.id)}
                          className="btn btn-warning col mx-1"
                        >
                          Jadi Hutang
                        </Button>
                      ) : null}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        onClick={() => destroyData(transaction.id)}
                        className="btn btn-danger col mx-1"
                      >
                        Hapus
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transactions;
