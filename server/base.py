from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017")
db = client.six_three_db

@app.route('/actors/<person_id>')
def actor(person_id):
  print(person_id)
  # need to convert person_id string to number
  person_id_int = int(person_id)
  print(person_id_int)
  actor = db.credits.find({'person_id': person_id_int})
  print(actor[0]['name'])
  name = actor[0]['name']
  print(name)

  appearances_array = []

  for appearance in actor:
    print(appearance)
    movie = db.titles.find_one({'id': appearance['id']}),
    print(movie)
    # not clear why movie is a tuple
    print(movie[0]['title'])
    # print(movie['title'])
    details = {
      # "name": actor['name'],
      "character": appearance['character'],
      "role": appearance['role'],
      "id": appearance['id'],
      "title": movie[0]['title'],
      "rating": movie[0]['imdb_score'],
      "release_year": movie[0]['release_year'],
      # "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Large_breaking_wave.jpg/320px-Large_breaking_wave.jpg",
      # "person_id": actor['person_id'],
    }
    appearances_array.append(details)

  print(appearances_array)

  response_body = {
    # not clear why it doesn't like this: "name": actor[0]['name'],
    "name": name,
    "appearances_array": appearances_array
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