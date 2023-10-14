import { useLoaderData } from "react-router-dom";

const Users = () => {
  const users = useLoaderData();

  const handleDeleteUser = (id) => {
    console.log("Delete", id);
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
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
