const express = require("express");
const Users = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

server.get("/api/users", async (req, res) => {
  const users = await Users.find();
  console.log(users);
  if (users) {
    return res.status(200).json(users);
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
