const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/act-group-63_db"
);

module.exports = mongoose.connection;
