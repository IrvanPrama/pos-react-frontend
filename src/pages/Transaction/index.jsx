import React from "react";
import Transactions from "./Transactions";
import { Card } from "react-bootstrap";

function Transaction() {
  return (
    <div>
      <h1>Penjualan</h1>

      <Card className="p-3">
        <Transactions />
      </Card>
    </div>
  );
}

export default Transaction;
