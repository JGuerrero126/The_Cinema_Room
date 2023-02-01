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

def rec_source(target):
  try:
    genre = target['genre']
    keyword = target['keyword']
    if genre == 0 | keyword == 0:
      raise ValueError
    print(f"GENRE DETECTED: {genre}")
    print(f"KEYWORD DETECTED: {keyword}") 
    customRec = f'https://api.themoviedb.org/3/discover/movie?api_key={tmdb_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={genre}&with_keywords={keyword}&with_watch_monetization_types=flatrate'
    return customRec
  except:
    movie_id = target['movie_id']
    print("NO KEYWORD OR GENRE") 
    defaultRec = f'https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={tmdb_key}&language=en-US&page=1'
    return defaultRec

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

@app.route('/search/<target>', methods = ['GET'])
@cross_origin()
def search_movie(target):
  
  print('GETTING DATA FOR SEARCHED MOVIE')

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/search/movie?api_key={tmdb_key}&language=en-US&query={target}'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = (json.loads(res))

  return response_body

@app.route('/person/<target>', methods = ['GET'])
@cross_origin()
def search_person(target):
  
  print('GETTING DATA FOR SEARCHED MOVIE')

  tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/search/person?api_key={tmdb_key}&language=en-US&query={target}'

  with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
    res = response.read()

  response_body = (json.loads(res))

  return response_body

# @app.route('/year/<target>', methods = ['GET'])
# @cross_origin()
# def search_year(target):
  
#   print('GETTING DATA FOR SEARCHED MOVIE')

#   tmdb_movie_api_search_link = f'https://api.themoviedb.org/3/discover/movie?api_key={tmdb_key}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&primary_release_year={target}'

#   with urllib.request.urlopen(tmdb_movie_api_search_link) as response:
#     res = response.read()

#   response_body = (json.loads(res))

#   return response_body

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

  with urllib.request.urlopen(rec_source(request.get_json())) as response:
      res = response.read()
      response_body = res
      return response_body

@app.route('/top-movies/', methods = ['GET'])
@cross_origin()
def top_movies():
  
  print('GETTING TOP MOVIES IN THE WORLD')

  top_movie_search = f'https://api.themoviedb.org/3/discover/movie?api_key={tmdb_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100&with_watch_monetization_types=flatrate'

  with urllib.request.urlopen(top_movie_search) as response:
      res = response.read()
      response_body = res
      return response_body

@app.route('/watch-providers/', methods = ['POST'])
@cross_origin()
def watch_providers():

  movie_id = request.get_json()['movie_id']
  
  print('GETTING WATCH PROVIDERS')

  watch_providers_list = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key={tmdb_key}'

  with urllib.request.urlopen(watch_providers_list) as response:
      res = response.read()
      response_body = res
      return response_body

@app.route('/trending/', methods = ['GET'])
@cross_origin()
def trending():
  
  print('GETTING WEEKLY TRENDING MOVIES')

  trending_movies = f'https://api.themoviedb.org/3/trending/movie/week?api_key={tmdb_key}'

  with urllib.request.urlopen(trending_movies) as response:
      res = response.read()
      response_body = res
      return response_body

@app.route('/top-rated/', methods = ['GET'])
@cross_origin()
def top_rated():
  
  print('GETTING TOP MOVIES OF ALL TIME')

  top_rated= f'https://api.themoviedb.org/3/movie/top_rated?api_key={tmdb_key}&language=en-US&page=1'

  with urllib.request.urlopen(top_rated) as response:
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