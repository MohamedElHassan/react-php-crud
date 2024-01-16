import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListUser() {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios.get("http://localhost/api/users").then((res) => {
      setUsers(res.data);
    });
  };
  const deleteUser = (id) => {
    axios.delete(`http://localhost/api/user/${id}/delete`).then((res) => {
      console.log(res.data);
      getUsers();
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>List User</h1>
      <table>
        <thead>
          <tr>
            <th>#id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>+20 {user.mobile}</td>
              <td>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`user/${user.id}/edit`}
                >
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListUser;
