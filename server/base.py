from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "test 2",
        "about" :"Hello!"
    }

    return response_body