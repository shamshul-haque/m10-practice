import React from "react";

const App = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    form.reset();

    const postData = async () => {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
    };
    postData();
  };

  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" /> <br />
        <input type="email" name="email" /> <br />
        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default App;
