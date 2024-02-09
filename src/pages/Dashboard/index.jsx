import React from "react";
import { Row, Col } from "react-bootstrap";
import OneCard from "../../component/ViewCard/OneCard.jsx";
import TwoCard from "../../component/ViewCard/TwoCard.jsx";
import ThreeCard from "../../component/ViewCard/ThreeCard.jsx";
import ReuseButton from "../../component/ReuseButton.jsx";
import AddedPacket from "../Packet/AddedPacket.jsx";

const Dashboard = () => {
  return (
    <div>
      <h1>Halaman Utama</h1>

      <Row>
        <OneCard />
        <TwoCard />
        <ThreeCard />
      </Row>
      <div className="sub-title mt-5">
        <h3>Paket Milik Pelanggan</h3>
      </div>
      <Row className="d-flex justify-content-start">
        <Col className="col-auto">
          <ReuseButton
            title="Beli Satuan"
            direction="/transaction/add"
            variant="primary"
          />
        </Col>
        <Col className="col-auto">
          <ReuseButton
            title="Beli Paketan"
            direction="/packet/add"
            variant="primary"
          />
        </Col>
      </Row>

      <AddedPacket />
    </div>
  );
};

export default Dashboard;
