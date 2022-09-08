from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps

app = Flask(__name__)

# create connection to mongodb
client = MongoClient("mongodb://localhost:27017")
db = client.six_three_db

# function to convert a string into an array
# input string needs to have comma separated values and must not be empty 
# function expects values will have extra quotes that need to be removed
def convert_arrayish_string(string):
  working_array = []
  strings = string.split(",")
  for str in strings:
    trimmed_str = str.strip(' \"\'')
    working_array.append(trimmed_str)
  return working_array

# find all documents
movies = db.titles.find({})
count = 0

# update each document in the database with a new property "genres_array", which is the genres string converted into an array
for m in movies:
  movie_id = m['id']
  genres_string = m['genres']
  genres_array = convert_arrayish_string(genres_string.strip('[]'))
  countries_string = m['production_countries']
  countries_array = convert_arrayish_string(countries_string.strip('[]'))
  db.titles.update_one({'id': movie_id}, {"$set": {"genres_array": genres_array, "production_countries_array": countries_array}})
  count = count + 1
  
# print the count as a check that all documents were processed
print(count)