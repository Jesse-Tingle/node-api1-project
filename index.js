// libraries
const express = require("express");

// file imports
const db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

// GET hubs
server.get("/users", (req, res) => {
  db.find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(err => {
      res.status(500).json({
        err: err
      });
    });
});

server.get("/api/users", async (req, res) => {
  const users = await db.find();
  console.log(users);
  if (users) {
    return res.status(200).json(users);
  }
});

// server.post("/api/users", async (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name
//   };

//   db.push(newUser);
//   res.status(201).json(newUser);
// });

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
