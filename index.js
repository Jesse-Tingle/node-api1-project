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
server.get("/api/users/:id", async (req, res) => {
  const userId = await db.findById(req.params.id);
  console.log("userID", userId);
  // const user = await db.findById(id)

  if (!userId) {
    console.log("User ID error");
    return res.status(404).json({
      message: `The user with id ${req.params.id} does not exist.`
    });
  }

  try {
    res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({
      err,
      errorMessage: "The user information could not be retrieved."
    });
  }
});

// POST adds new user
server.post("/api/users", async (req, res) => {
  // const newUser = (await req.body.name, req.body.bio);
  const { name, bio } = req.body;
  console.log("name: ", name);
  console.log("bio", bio);

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

// PUT updates user by ID
server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  console.log("id:", id);
  console.log("name: ", name);
  console.log("bio: ", bio);
  // const updateUser = await db.update(id, { name, bio });

  if (!id) {
    return res
      .status(404)
      .json({ message: `The user with id ${req.params.id} does not exist.` });
  } else if (!name || !bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  try {
    if (id) {
      await db.update(id, { name, bio });
      const updatedUser = await db.findById(id);
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

// DELETE deletes user by ID
server.delete("/api/users/:id", async (req, res) => {
  const removedUser = await db.remove(req.params.id);

  if (!removedUser) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }

  try {
    res
      .status(200)
      .json({ message: `User with id ${req.params.id} was deleted` });
  } catch (error) {
    res.status(500).json({
      err,
      errorMessage: "The user could not be removed"
    });
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
