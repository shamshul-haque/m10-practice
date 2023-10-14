import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDeleteUser = (id) => {
    console.log("Delete", id);
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        const remaining = users.filter((user) => user._id != id);
        setUsers(remaining);
      }
    };
    getData();
  };

  return (
    <div>
      <h1>User Count: {users.length}</h1>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <span>
              Name: {user.name}, Email: {user.email}
            </span>
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
