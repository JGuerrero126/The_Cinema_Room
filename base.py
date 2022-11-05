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
tmdb_key = os.getenv("TMDB_KEY")

# client = MongoClient("mongodb://localhost:27017")
# db = client.six_three_db

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

@app.route('/person-image-link/', methods = ['POST'])
@cross_origin()
def image_link2():
  
  print('GETTING ACTOR IMAGE')

  person_id = request.get_json()['person_id']

  tmdb_actor_api_search_link = f'https://api.themoviedb.org/3/person/{person_id}/images?api_key={tmdb_key}'

  with urllib.request.urlopen(tmdb_actor_api_search_link) as response:
    res = response.read()


  response_body = res

  return response_body

@app.route('/movie-poster-link/', methods = ['POST'])
@cross_origin()
def poster_link():
  
  print('GETTING MOVIE POSTER')

  movie_id = request.get_json()['movie_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{movie_id}/images?api_key={tmdb_key}'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/movie-details/', methods = ['POST'])
@cross_origin()
def movie_details():
  
  print('GETTING MOVIE DETAILS')

  movie_id = request.get_json()['movie_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_key}&language=en-US'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/actor-details/', methods = ['POST'])
@cross_origin()
def actor_details():
  
  print('GETTING ACTOR DETAILS')

  person_id = request.get_json()['person_id']

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/person/{person_id}?api_key={tmdb_key}&language=en-US'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = res

  return response_body

@app.route('/movie-keywords/', methods = ['POST'])
@cross_origin()
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

  # genre = request.get_json()['genre']
  # keyword = request.get_json()['keyword']
  movie_id = request.get_json()['movie_id']


  # tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/discover/movie?api_key={tmdb_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={genre}&with_keywords={keyword}&with_watch_monetization_types=flatrate'

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={tmdb_key}&language=en-US&page=1'

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