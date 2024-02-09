import React from "react";
import PacketTransactions from "./PacketTransactions";
import ReuseButton from "../../component/ReuseButton";
import RemainingPacket from "./RemainingPacket";

function Packet() {
  return (
    <div>
      <h1>Transaksi Paketan</h1>
      <ReuseButton
        variant="primary"
        direction="/packet/add"
        title="Catat Paket"
      />
      <PacketTransactions />
    </div>
  );
}

export default Packet;
