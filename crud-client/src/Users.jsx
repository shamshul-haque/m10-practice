import { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
          <p key={user._id}>
            Name: {user.name}, Email: {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
