from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017")
db = client.six_three_db

# actor = db.credits.find_one({'name': 'Sting'})
# print(actor)

def convert_arrayish_string(string):
  working_array = []
  strings = string.split(",")
  for str in strings:
    trimmed_str = str.strip(' \"')
    working_array.append(trimmed_str)
  return working_array

movies = db.titles.find({})
count = 0
for m in movies:
  movie_id = m['id']
  genres_string = m['genres']
  genres_array = convert_arrayish_string(genres_string.strip('[]'))
  db.titles.update_one({'id': movie_id}, {"$set": {"genres_array": genres_array}})
  count = count + 1
  
print(count)