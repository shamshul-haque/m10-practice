const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Sabnur", email: "sabnor@gmail.com" },
  { id: 2, name: "Purnima", email: "purnima@gmail.com" },
  { id: 3, name: "Mousumi", email: "mousumi@gmail.com" },
];

app.get("/", (req, res) => {
  res.send("User server is running");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
