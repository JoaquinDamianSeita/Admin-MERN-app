const express = require("express");
const mongoose = require("mongoose");
// const cors = require('cors');
const router = require("./routes/index");

const app = express();
const PORT = 3001;
const MONGODB_URI = "mongodb://localhost:27017/admin_app_db";

// app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.once("open", function () {
  console.log("Connected to the Database.");
});

mongoose.connection.on("error", function (error) {
  console.log("Mongoose Connection Error : " + error);
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
