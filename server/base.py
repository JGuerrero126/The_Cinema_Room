from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017")
db = client.six_three_db

@app.route('/actors/<name>')
def actor(name):
  actor = db.credits.find_one({'name': str(name)})
  print(actor)

  response_body = {
    "name": actor['name'],
    "character": actor['character']
  }

  return response_body

@app.route('/movies/<title>')
def movie(title):
  movie = db.titles.find_one({'title': str(title)})
  print(movie)

  response_body = {
    "title": movie['title'],
    "genres": movie['genres'],
    "rating": movie['imdb_score'],
    "description": movie['description'],
    "release_year": movie['release_year']
  }

  return response_body

@app.route('/genres/<genre>')
def genres(genre):
  movies = db.titles.find({'type': "MOVIE", "imdb_score": {"$gt": 0}, "genres_array": {"$in":[genre]}}).sort("imdb_score", -1).limit(5)
  print(movies)

  response_body = []

  for movie in movies:
    print(movie)
    details = {
      "title": movie['title'],
      "rating": movie['imdb_score'],
      # "description": movie['description'],
      # "release_year": movie['release_year']
    }
    response_body.append(details)

  print(response_body)

  return response_body

if __name__ == "__main__":
  app.run(debug=True)