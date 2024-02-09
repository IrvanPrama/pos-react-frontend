import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";

const TwoCard = () => {
  const [totalStok, setTotalStok] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalStokRemaining, setTotalStokRemaining] = useState(0);

  // eslint-disable-next-line
  const getStok = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/transactiontotalStok/02"
      );
      const { totalStok } = response.data; // Periksa apakah properti totalQty ada di dalam respons

      if (totalStok !== undefined) {
        setTotalStok(totalStok);
      } else {
        console.error("Total quantity data not found in response.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line
  const getQty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/transactiontotalQty/02"
      );
      const { totalQty } = response.data; // Periksa apakah properti totalQty ada di dalam respons

      if (totalQty !== undefined) {
        setTotalQty(totalQty);
      } else {
        console.error("Total quantity data not found in response.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line
  const getStokRemaining = async () => {
    const totalStokRemaining = totalStok - totalQty;
    setTotalStokRemaining(totalStokRemaining);
  };

  // eslint-disable-next-line
  useEffect(() => {
    getStok();
    getQty();
    getStokRemaining();
  }, [getStok, getQty, getStokRemaining]);

  return (
    <Col>
      <Card className="monitor-card">
        <p className="mb-0">Total Stok Starter</p>
        <div className="row">
          <div className="col-4">
            <FontAwesomeIcon
              icon={faCubesStacked}
              size="4x"
              color="rgb(255, 196, 0)"
            />
          </div>
          <div className="col">
            <p className="text-m">
              {totalStokRemaining} <span className="text-sm">sak</span>
            </p>
          </div>
        </div>

        {/* Tampilkan daftar transaksi atau komponen lainnya di sini */}
      </Card>
    </Col>
  );
};

export default TwoCard;
