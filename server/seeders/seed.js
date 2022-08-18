const db = require("../config/connection");
const { Movie } = require("../models");

const starWars = new Movie({ moviename: "Star Wars", rating: 44 });
const casablanca = new Movie({ moviename: "Casablance", rating: 73 });

db.once("open", async () => {
  await Movie.deleteMany({});

  await starWars.save();
  await casablanca.save();

  await Movie.collection.insertOne({ moviename: "Blade Runner", rating: 99 });

  console.log("Movies added!");
  process.exit(0);
});
