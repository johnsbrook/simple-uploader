const express = require("express");
const mongojs = require("mongojs");

const logs = require("./logs");
const app = express();

// These are the routes for photo logs
app.post("/log", ({ body }, res) => {
  logs
    .create(body)
    .then((db) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/log", (req, res) => {
  logs
    .find({})
    .then((cb) => {
      res.json(cb);
    })
    .catch((err) => {
      res.json(err);
    });
});


// These are the routes to find/delete logs by ID
app.get("/findLog/:id", (req, res) => {
  logs.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, data) => {
    if (err) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.delete("/deleteLog/:id", (req, res) => {
  logs
    .remove({ _id: mongojs.ObjectId(req.params.id) }, (err, data) => {
      if (err) {
        res.send(error);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// Will get all logs by unrepeated locations
app.get("/getLocations", (req, res) => {
  logs
    .distinct("location")
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.json(err);
    });
});


// Will create API dynamically by each location created
app.get("/getLocations/:location", (req, res) => {
  logs
    .find({ location: req.params.location })
    .then((cb) => {
      res.json(cb)
    })    
    .catch((err) => {
      res.json(err);
    });
});

module.exports = app;
