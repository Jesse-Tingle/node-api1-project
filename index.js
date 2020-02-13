// libraries
const express = require("express");

// file imports
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

server.get("/api/users", async (req, res) => {
  const users = await db.find();
  console.log(users);
  if (users) {
    return res.status(200).json(users);
  }
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log("newUser", newUser);
  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "failed to create new user"
      });
    });
});

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
