const express = require("express");
const cors = require("cors");

//mongoose helps us connect to mongodb database
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//add mongodb URI; found in the mongodb dashbaord
//const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.ATLAS_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//require the backend files and use them
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
