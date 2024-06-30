const mongoose = require("mongoose");

const db = process.env.CONNECTION_SRING;
const mongodbConnection = async () => {
  try {
    const mongodb = await mongoose.connect(db);
    console.log("Database connected", mongodb.connection.host);
    console.log(`Name : ${mongodb.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = mongodbConnection;
