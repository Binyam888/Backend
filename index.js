const express = require("express");
require("dotenv").config();
const app = express();
const errorHandler = require("./midileware/errorHandler");
const mongodbConnection = require("./config/dbConfig");
mongodbConnection();
app.use(express.json());

app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorHandler);

//Server
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server created at port ${port}`);
});
