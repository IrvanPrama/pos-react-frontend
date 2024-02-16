import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import { Button } from "react-bootstrap";

const User = () => {
  const [userlists, setUserLists] = useState([]);

  useEffect(() => {
    getUserLists();
  }, []);

  const getUserLists = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUserLists(response.data);
  };

  const destroyUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/users/${id}`);
      getUserLists();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Table className="table">
        <thead>
          <tr>
            <th className="td-number" scope="col">
              No.
            </th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Password</th>
            <th scope="col">File</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {userlists.map((user, index) => (
            <tr key={user.id}>
              <th className="td-number" scope="row">
                {index + 1}
              </th>
              <td>{user.user_name}</td>
              <td>{user.role}</td>
              <td>{user.user_password}</td>
              <td>
                <img
                  className="img-thumbnail"
                  src={`http://localhost:5000/public/images/${user.user_profile}`}
                  alt={user.user_profile}
                />
              </td>
              <td>
                <div className="">
                  <Button
                    variant="danger"
                    className="col mx-1"
                    onClick={() => destroyUser(user.id)}
                  >
                    Hapus
                  </Button>
                  <Link
                    to={`/user/edit/${user.id}`}
                    className="btn btn-info col mx-1"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
