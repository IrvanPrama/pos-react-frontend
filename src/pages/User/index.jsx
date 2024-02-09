import React from "react";
import User from "./User";
import ReuseButton from "../../component/ReuseButton";

const Customer = () => {
  return (
    <div className="ml-5">
      <h1>Pengguna</h1>
      <ReuseButton
        variant="primary"
        direction="/user/add"
        title="Tambah data"
      />
      <User />
    </div>
  );
};

export default Customer;
