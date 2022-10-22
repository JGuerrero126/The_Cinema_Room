from pymongo import MongoClient
from flask import Flask, send_from_directory
from flask import request
from bson.json_util import dumps
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import urllib.request
import urllib.parse
import json
import os

load_dotenv()

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
tmdb_key = os.getenv("TMDB_KEY")

# client = MongoClient("mongodb://localhost:27017")
# db = client.six_three_db

# @app.route('/actors/<person_id>')
# @cross_origin()
# def actor(person_id):
#   print(person_id)
#   # need to convert person_id string to number
#   person_id_int = int(person_id)
#   print(person_id_int)
#   actor = db.credits.find({'person_id': person_id_int})
#   print(actor[0]['name'])
#   name = actor[0]['name']
#   print(name)

#   appearances_array = []

#   for appearance in actor:
#     print(appearance)
#     print(appearance['id'])

#     # we only want to display movies; all titles that are movies have an m as the second character in their id
#     if appearance['id'][1] == "m":
#       movie = db.titles.find_one({'id': appearance['id']}),
#       print(movie)
#       # not clear why movie is a tuple
#       print(movie[0]['title'])
      

#       details = {
#         # "name": actor['name'],
#         "character": appearance['character'],
#         "role": appearance['role'],
#         "id": appearance['id'],
#         "title": movie[0]['title'],
#         # "rating": movie[0]['imdb_score'],
#         "release_year": movie[0]['release_year'],
#         # "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Large_breaking_wave.jpg/320px-Large_breaking_wave.jpg",
#         # "person_id": actor['person_id'],
#       }
#       appearances_array.append(details)

#   print(appearances_array)

#   response_body = {
#     # not clear why it doesn't like this: "name": actor[0]['name'],
#     "name": name,
#     "appearances_array": appearances_array
#   }

#   return response_body

# @app.route('/movies/<id>')
# @cross_origin()
# def movie(id):
#   print(id)
#   movie = db.titles.find_one({'id': id})
#   actors = db.credits.find({'id':id})
#   print(movie)
#   print(actors)

#   actor_array = []

#   for actor in actors:
#     print(actor)
#     details = {
#       "name": actor['name'],
#       "character": actor['character'],
#       "role": actor['role'],
#       "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Large_breaking_wave.jpg/320px-Large_breaking_wave.jpg",
#       "person_id": actor['person_id'],
#     }
#     actor_array.append(details)

#   print(actor_array)

#   response_body = {
#     "title": movie['title'],
#     "genres": movie['genres'],
#     "rating": movie['imdb_score'],
#     "description": movie['description'],
#     "release_year": movie['release_year'],
#     "actor_array": actor_array
#   }

#   return response_body

# @app.route('/genres/<genre>')
# @cross_origin()
# def genres(genre):
#   movies = db.titles.find({'type': "MOVIE","production_countries_array": {"$in":["US", "UK", "JP"]}, "imdb_score": {"$gt": 0}, "genres_array": {"$in":[genre]}}).sort("imdb_score", -1).limit(5)
#   print(movies)

#   response_body = []

#   for movie in movies:
#     print(movie)
#     details = {
#       "title": movie['title'],
#       "genres": movie['genres_array'],
#       "rating": movie['imdb_score'],
#       "release_year": movie['release_year'],
#       "poster": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Large_breaking_wave.jpg/320px-Large_breaking_wave.jpg",
#       "id": movie['id'],
#       # "description": movie['description'],
#     }
#     response_body.append(details)

#   print(response_body)

#   return response_body

# @app.route('/person-image-link/', methods = ['POST'])
# @cross_origin()
# def image_link():
  
#   print('image_link')

#   person_name = request.get_json()['person_name']

#   print(person_name)

#   url_parsed_person_name = urllib.parse.quote(person_name)

#   tmdb_actor_api_search_link = f'https://api.themoviedb.org/3/search/person?api_key={tmdb_key}&language=en-US&query={url_parsed_person_name}&page=1&include_adult=false'

#   print(tmdb_actor_api_search_link)

#   with urllib.request.urlopen(tmdb_actor_api_search_link) as response:
#     res = response.read()
#     print(json.loads(res))
#     print(json.loads(res)['results'][0]['profile_path'])
#     path_suffix = json.loads(res)['results'][0]['profile_path']

#   image_link = f'https://image.tmdb.org/t/p/w500{path_suffix}'

#   print(image_link)

#   response_body = image_link

#   return response_body

# @app.route('/movie-poster-link/', methods = ['POST'])
# @cross_origin()
# def poster_link():
  
#   print('poster_link')

#   movie_name = request.get_json()['movie_name']

#   print(movie_name)

#   url_parsed_movie_name = urllib.parse.quote(movie_name)

#   tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/search/movie?api_key={tmdb_key}&language=en-US&query={url_parsed_movie_name}&page=1&include_adult=false'

#   print(tmdb_movie_api_search_link)

#   with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
#     res = response.read()
#     print(json.loads(res))
#     print(json.loads(res)['results'][0]['poster_path'])
#     path_suffix = json.loads(res)['results'][0]['poster_path']

#   image_link = f'https://image.tmdb.org/t/p/w500{path_suffix}'

#   print(image_link)

#   response_body = image_link

#   return response_body

##
## BELOW THIS ARE THE API CALLS TO THE TMDB API
##

@app.route('/genre-list-link/', methods = ['GET'])
@cross_origin()
def genre_link():
  
  print('GETTING LIST OF GENRES')

  tmdb_genre_list = f'https://api.themoviedb.org/3/genre/movie/list?api_key={tmdb_key}&language=en-US'

  with urllib.request.urlopen(tmdb_genre_list) as response:
    res = response.read()

  response_body = json.loads(res)['genres']

  return response_body

@app.route('/genre-movies/<target>', methods = ['GET'])
@cross_origin()
def genre_movies(target):
  
  print('GETTING LIST OF MOVIES IN GENRE')
  print(target)

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/discover/movie?api_key={tmdb_key}&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100&with_genres={target}'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = (json.loads(res))['results']

  return response_body

@app.route('/movie-credits/<target>', methods = ['GET'])
@cross_origin()
def movie_credits(target):
  
  print('GETTING CREDITS FOR MOVIE')
  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{target}/credits?api_key={tmdb_key}&language=en-US'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = (json.loads(res))

  return response_body

@app.route('/actor-appearances/<target>', methods = ['GET'])
@cross_origin()
def actor_appearances(target):
  
  print('GETTING APPEARANCES FOR ACTOR')

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/person/{target}/movie_credits?api_key={tmdb_key}&language=en-US'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = (json.loads(res))

  return response_body

@app.route('/person-image-link2/', methods = ['POST', 'OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def image_link2():
  
  print('GETTING ACTOR IMAGE')

  person_id = request.get_json()['person_id']

  tmdb_actor_api_search_link = f'https://api.themoviedb.org/3/person/{person_id}/images?api_key={tmdb_key}'

  with urllib.request.urlopen(tmdb_actor_api_search_link) as response:
    res = response.read()
    path_suffix = json.loads(res)['profiles'][0]['file_path']

  image_link = f'https://image.tmdb.org/t/p/w500{path_suffix}'

  response_body = res

  return response_body

@app.route('/movie-poster-link2/', methods = ['POST', 'OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def poster_link2():
  
  print('GETTING MOVIE POSTER')

  movie_id = request.get_json()['movie_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{movie_id}/images?api_key={tmdb_key}'

  req = urllib.request.Request(tmdb_movie_api_search_link)
  req.add_header("Access-Control-Allow-Origin", "*")
  

  with urllib.request.urlopen(req) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/movie-details/', methods = ['POST', 'OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def movie_details():
  
  print('GETTING MOVIE DETAILS')

  movie_id = request.get_json()['movie_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_key}&language=en-US'

  req = urllib.request.Request(tmdb_movie_api_search_link)
  req.add_header("Access-Control-Allow-Origin", "*")

  with urllib.request.urlopen(req) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/actor-details/', methods = ['POST', 'OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def actor_details():
  
  print('GETTING ACTOR DETAILS')

  person_id = request.get_json()['person_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/person/{person_id}?api_key={tmdb_key}&language=en-US'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/movie-keywords/', methods = ['POST', 'OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def movie_keywords():
  
  print('GETTING KEYWORDS')

  movie_id = request.get_json()['movie_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key={tmdb_key}'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/movie-recs/', methods = ['POST'])
@cross_origin()
def movie_recs():
  
  print('GETTING RECOMMENDATIONS')

  keyword = request.get_json()['keyword']
  genres = request.get_json()['genres']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/discover/movie?api_key={tmdb_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={genres}&with_keywords={keyword}&with_watch_monetization_types=flatrate'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = res

  return response_body

@app.errorhandler(404)
def not_found(e):
  return send_from_directory(app.static_folder, 'index.html')

@app.route('/')
@cross_origin()
def serve():
  return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
  app.run(debug=True)