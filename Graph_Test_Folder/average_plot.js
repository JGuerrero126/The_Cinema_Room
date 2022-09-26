var genres = averageMovieScore.map(genres => genres.genres)
var scores = averageMovieScore.map(scores => scores.imdb_score)

//check to see if genres and imdb_score shows up in console
console.log(genres)
console.log(scores)

//Create the Trace

var trace = {
    x: genres,
    y: scores,
    type: "bar"
};

//Create data array
var data = [trace];

//Create Plot Layout

var layout = {
    title: "Average IMDB Score",
    xaxis: { title: "Genres"},
    yaxis: { title: "Average IMDB Score"}
};

//Plot the chart to a div tag with id "average-bar-plot"

Plotly.newPlot("average-bar-plot", data, layout);