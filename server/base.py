from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017")
db = client.six_three_db

@app.route('/actors/<person>')
def actor(person):
  print(person)
  # need to convert person string to number
  actor = db.credits.find_one({'person_id': 1549})
  # actor = db.credits.find_one({'name': "John Cleese"})
  print(actor)

  response_body = {
    "name": actor['name'],
    "character": actor['character']
  }

  return response_body

@app.route('/movies/<id>')
def movie(id):
  print(id)
  movie = db.titles.find_one({'id': id})
  actors = db.credits.find({'id':id})
  print(movie)
  print(actors)

  actor_array = []

  for actor in actors:
    print(actor)
    details = {
      "name": actor['name'],
      # "character": actor['character'],
      # "role": actor['role'],
      # "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Large_breaking_wave.jpg/320px-Large_breaking_wave.jpg",
      # "person_id": actor['person_id'],
    }
    actor_array.append(details)

  print(actor_array)

  response_body = {
    "title": movie['title'],
    "genres": movie['genres'],
    "rating": movie['imdb_score'],
    "description": movie['description'],
    "release_year": movie['release_year'],
    "actor_array": actor_array
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
      "genres": movie['genres_array'],
      "rating": movie['imdb_score'],
      "release_year": movie['release_year'],
      "poster": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Large_breaking_wave.jpg/320px-Large_breaking_wave.jpg",
      "id": movie['id'],
      # "description": movie['description'],
    }
    response_body.append(details)

  print(response_body)

  return response_body

if __name__ == "__main__":
  app.run(debug=True)