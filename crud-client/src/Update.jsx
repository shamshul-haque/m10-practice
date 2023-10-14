import { useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedUsers = useLoaderData();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email);
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
