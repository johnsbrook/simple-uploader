const express = require("express");
const path = require("path");
const crypto = require("crypto"); //to generate file name
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const app = express();

// other code here

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

let conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/imageUpload", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(require('./html-route'));
app.use(require('./api'));

conn.once("open", () => {
  //initialize our stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("imageUpload");
});