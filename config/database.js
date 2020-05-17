const mongoose = require("mongoose");

function connectDb() {
  const MONGO_URI = process.env.MONGO_URI;

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection is open to ", MONGO_URI);
  });

  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
  });

  mongoose.connection.on("disconnected", function () {
    console.log('"Mongoose default connection is disconnected"');
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongooe default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};

module.exports = connectDb;