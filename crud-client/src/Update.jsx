import { useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedUsers = useLoaderData();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log(updatedUser);

    const updateData = async () => {
      const res = await fetch(
        `http://localhost:5000/users/${loadedUsers._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.modifiedCount > 0) {
        alert("updated successfully");
      }
    };
    updateData();
  };
  return (
    <div>
      <h1>Update information of: {loadedUsers.name}</h1>
      <form onSubmit={handleUpdateUser}>
        <input type="text" name="name" defaultValue={loadedUsers?.name} />{" "}
        <br />
        <input
          type="email"
          name="email"
          defaultValue={loadedUsers?.email}
        />{" "}
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Update;
