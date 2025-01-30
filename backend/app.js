const express = require("express");
const app = express();
app.use(express.json());


const PORT = 8082;

// AJOUTER LES DEUX LIGNES ICI
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3001" }));



const mongoose = require("mongoose");
// // mongoose.connect("mongodb://localhost:27017/trylundi", {
  
// // });

mongoose
  .connect("mongodb://localhost:27017/burnout_database", {})
  .then(() => {
    console.log("Connected to the mongoDB database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

console.log("Connected to MongoDB");



const routes = require("./Routes/routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});