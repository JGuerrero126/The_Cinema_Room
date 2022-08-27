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
    "description": movie['description']
  }

  return response_body