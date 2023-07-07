const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require("body-parser");
//middleware
dotenv.config();
app.use(express.json());
app.use(cors());
//configure mongoose

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

).then(() => {
    // Connection successful, do something here
    console.log('Connected to the database');
  })
  .catch((error) => {
    // Connection failed, handle the error
    console.error('Error connecting to the database:', error);
  });;


  const userRouter = require("./routes/userRoutes");
  app.use("/api/Users", userRouter);
  app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
