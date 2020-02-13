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
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

// GET gets users by ID

// PUT updates user by ID
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

// POST adds new user
server.post("/api/users", async (req, res) => {
  // const newUser = (await req.body.name, req.body.bio);
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }

  try {
    res.status(201).json(await db.insert({ name, bio }));
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "There was an error while saving the user to the database"
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
