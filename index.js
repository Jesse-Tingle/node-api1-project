// libraries
const express = require("express");

// file imports
const db = require("./data/db");

// global objects
const server = express();

// middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

// GET gets all users
server.get("/api/users", async (req, res) => {
  const users = await db.find();
  console.log(users);
  if (users) {
    return res.status(200).json(users);
  }
});

// GET gets users by ID

// PUT updates user by ID

// POST adds new user
server.post("/api/users", async (req, res) => {
  const newUser = await req.body;
  db.insert(newUser);
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    return res.status(500).json({
      message: "failed to create new user"
    });
  }
});

// DELETE deletes user by ID
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedUser => {
      res.json(deletedUser);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "failed to delete user"
      });
    });
});

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
