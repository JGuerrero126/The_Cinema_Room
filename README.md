# Cinema Room - a Place to Explore Movies

This project uses the [TMDB database](https://themoviedb.org) to present descriptions and images for movies and actors.

The project uses a [React](https://reactjs.org/docs/create-a-new-react-app.html) front end and a [Python](https://www.python.org/)-based ([Flask](https://palletsprojects.com/p/flask/)) backend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [Contributing](#contributing)
- [Tests](#tests)
- [Helpful Links](#helpful-links)

## Installation

Pull the main branch to your machine.

Get the [Flask](https://palletsprojects.com/p/flask/) server running first by opening a [virtual environment](https://realpython.com/python-virtual-environments-a-primer/) in the `server` directory, installing the Python packages using `pip install flask pymongo dotenv`, then entering `run flask`.

Then get [React](https://reactjs.org/docs/create-a-new-react-app.html) started in development mode. You'll need to have [node](https://nodejs.org/en/) installed. Then open a terminal and run `npm install` in the `client` directory. Once that's complete, enter `npm start`. The website should load in your browser.

## Usage

Simply click the links to learn about top-rated movies and actors. Search by genre, movie name, or actor name. If you search for a moview, for example, the description, rating, year released, and cast will be displayed. Then, for example, you can click on a cast member to learn more about them and other movies they have appeared in.

## Questions

Team members' GitHub usernames are:

- [JGuerrero126](https://github.com/JGuerrero126)
- [williampryor](https://github.com/williampryor)
- [MonsAltus](https://github.com/MonsAltus)
- [bmxnguyen](https://github.com/bmxnguyen)
- [ycheng2021](https://github.com/ycheng2021)
- [stuart-rickard](https://github.com/stuart-rickard)

Feel free to reach out!

## Contributing

Please feel free to contact team members listed above if you are interested in contributing.

## Tests

Tests for the React portion of the project can be run by opening the `client` directory and running `npm run test`.

## Helpful Links

TMDB has excellent [API documentation](https://developers.themoviedb.org/3/getting-started/introduction).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project uses the [Chakra UI](https://chakra-ui.com/) component library.
