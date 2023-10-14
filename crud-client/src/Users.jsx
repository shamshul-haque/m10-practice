import { useLoaderData } from "react-router-dom";

const Users = () => {
  const users = useLoaderData();
  return (
    <div>
      <h1>User Count: {users.length}</h1>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            Name: {user.name}, Email: {user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
