const express = require("express");
const route = express.Router();
const Entry = require("../model/entry");

// easy way to assign static data (e.g., array of strings) to a variable
const habitsOfMind = require("../model/habitsOfMind.json");

// pass a path (e.g., "/") and callback function to the get method
//  when the client makes an HTTP GET request to the specified path,
//  the callback function is executed
route.get("/", async (req, res) => {
  // The req parameter references the HTTP request object, which has a number
  //  of properties
  console.log("path requested: " + req.path);

  const entries = await Entry.find();

  entries.sort((a, b) => a.date - b.date);

  // convert MongoDB objects to objects formatted for the EJS template
  const formattedEntries = entries.map((entry) => {
    return {
      id: entry._id,
      date: entry.date.toLocaleDateString(),
      habit: entry.habit,
      content: entry.content.slice(0, 20) + "...",
    };
  });

  const filter = req.query.hom === undefined ? "" : req.query.hom;

  // The response parameter references the HTTP response object
  res.render("index", {
    entries: formattedEntries,
    habits: habitsOfMind,
    filter,
  });
});

route.get("/createEntry", (req, res) => {
  // The response parameter references the HTTP response object
  res.render("createEntry", { habits: habitsOfMind });
});

route.post("/createEntry", async (req, res) => {
  const entry = new Entry({
    date: req.body.date,
    email: req.session.email,
    habit: req.body.habit,
    content: req.body.content,
  });

  await entry.save();
  res.status(201).end();
  console.log("Saved entry");
});

route.get("/editEntry/:id", async (req, res) => {
  const habitEntry = await Entry.findById(req.params.id);

  res.render("editEntry", {
    entry: habitEntry,
    habits: habitsOfMind,
    id: req.params.id,
  });
});

route.post("/editEntry/:id", async (req, res) => {
  req.body.email = req.session.email;

  await Entry.findByIdAndUpdate(req.params.id, req.body);

  res.status(201).end();
});

route.post("/deleteEntry/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);

  res.status(201).end();
});

// delegate all authentication to the auth.js router
route.use("/auth", require("./auth"));

module.exports = route;
