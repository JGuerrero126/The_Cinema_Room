from ast import main
from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017")
db = client.flask_example_db

@app.route("/create")
def add_user():
  result = db.users.insert_one({"name": "test name 01"})
  return str(result.inserted_id)

@app.route("/list")
def get_user():
  users = list(db.users.find({}))
  return dumps(users)


# from flask import Flask

# api = Flask(__name__)

@app.route('/profile')
def my_profile():
    users = list(db.users.find({}))
    print(users[1]["name"])

    response_body = {
        "name": users[1]["name"],
        "about" :"Hello!"
    }

    return response_body

if __name__ == "__main__":
  app.run(debug=True)