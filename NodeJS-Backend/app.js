const express = require("express");
const app = express();
const inventory = require("./data/phoneSpecifications.json");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cors = require("cors");
// The below is for when we encorperate database
// const connectDB = require("./db/connect");
// //access database .env file
// require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credential: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const port = process.env.PORT || 5000;
app.get("/inventory", (req, res) => {
  res.send(inventory.filter((phone) => phone.invQty > 0));
});
//connect to database
const start = async () => {
  try {
    //await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(">>Server is listening on port " + port);
    });
  } catch (error) {
    console.log(">>Error:\n" + error);
  }
};

//middleware
app.use(express.static("./public"));
app.use(express.json());
//routes
app.use(notFound);
app.use(errorHandlerMiddleware);

start();
