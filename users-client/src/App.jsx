import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    form.reset();
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      });
  };

  return (
    <>
      <h1>User client</h1>
      <p>Number of users: {users.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" /> <br />
        <input type="email" name="email" /> <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id}: {user.name}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
