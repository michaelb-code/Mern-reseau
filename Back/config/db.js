const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => console.log("Connecté à la base de données Mongo DB"))
  .catch((err) => console.log("Erreur de connection à la base de données Mongo DB", err));
