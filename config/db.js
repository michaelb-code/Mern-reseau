const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log("Failed to connect to Mongo DB", err));
