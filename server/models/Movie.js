const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  moviename: { type: String },
  rating: { type: Number },
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
