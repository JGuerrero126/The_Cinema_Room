import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Link,
  SimpleGrid,
  Box,
  Image,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment";

function Genre() {
  const [genreData, setGenreData] = useState(null);
  const [genreData2, setGenreData2] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const { genre } = useParams();
  const [movieList, setMovieList] = useState(null);
  const [moviePosterLinkData2, setMoviePosterLinkData2] = useState(null);

  const personName = "Harrison Ford";
  const movieName = "Taxi Driver";

  function getGenre() {
    axios({
      method: "GET",
      url: "/genres/" + genre,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setGenreData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getPersonImageLink() {
    axios({
      method: "POST",
      url: "/person-image-link/",
      data: { person_name: personName },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setPersonImageLinkData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getMoviePosterLink(target) {
    axios({
      method: "POST",
      url: "/movie-poster-link/",
      data: { movie_name: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setMoviePosterLinkData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getMovies(target) {
    axios({
      method: "GET",
      url: "/genre-movies/" + target,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setMovieList(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  // useEffect(() => {
  //   getPersonImageLink();
  // }, []);

  // useEffect(() => {
  //   if (genreData !== null) {
  //     getMoviePosterLink(genreData[0].title);
  //   }
  // }, [genreData]);

  // useEffect(() => {
  //   getGenre();
  // }, []);

  console.log(genre);

  function getMoviePosterLink2(target) {
    axios({
      method: "POST",
      url: "/movie-poster-link2/",
      data: { movie_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setMoviePosterLinkData2(photoSelector(res));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function genreName(target) {
    switch (parseInt(target)) {
      case 28:
        return "Action";
      case 12:
        return "Adventure";
      case 16:
        return "Animation";
      case 35:
        return "Comedy";
      case 80:
        return "Crime";
      case 99:
        return "Documentary";
      case 18:
        return "Drama";
      case 10751:
        return "Family";
      case 14:
        return "Fantasy";
      case 36:
        return "History";
      case 27:
        return "Horror";
      case 10402:
        return "Music";
      case 9648:
        return "Mystery";
      case 10749:
        return "Romance";
      case 878:
        return "Science Fiction";
      case 10770:
        return "TV Movie";
      case 53:
        return "Thriller";
      case 10752:
        return "War";
      case 37:
        return "Western";
      default:
        return "";
    }
  }

  function photoSelector(target) {
    try {
      var heightArr = [];
      var englishArr = [];
      target.posters.forEach((el) => {
        if (el.iso_639_1 === "en") {
          englishArr.push(el);
        }
      });
      if (englishArr.length > 0) {
        englishArr.forEach((el) => {
          heightArr.push(el.height);
        });
        var bigPhoto = Math.max(...heightArr);
        var targetHeight = { height: bigPhoto };
        var index;
        englishArr.map((el) => {
          if (el.height === targetHeight.height) {
            index = englishArr.indexOf(el);
          }
        });
        return englishArr[index].file_path;
      } else {
        target.posters.forEach((el) => {
          heightArr.push(el.height);
        });
        var bigPhoto = Math.max(...heightArr);
        var targetHeight = { height: bigPhoto };
        var index;
        target.posters.map((el) => {
          if (el.height === targetHeight.height) {
            index = target.posters.indexOf(el);
          }
        });
        return target.posters[index].file_path;
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getMovies(genre);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "shindler";
  }, []);

  useEffect(() => {
    if (movieList !== null) {
      getMoviePosterLink2(movieList[0].id);
    }
  }, [movieList]);

  return (
    <div>
      <Heading fontSize="2.5rem" color="white" fontFamily="Shindler">
        Here are the top {genreName(genre)} movies!
      </Heading>
      {moviePosterLinkData2 ? (
        <Box
          w="max-content"
          h="max-content"
          mr="auto"
          ml="auto"
          bg="black"
          border="1rem groove black"
          boxShadow="0rem 0rem 3rem lightyellow"
          transition="3s"
          _hover={{ boxShadow: "none" }}
        >
          <Image
            _hover={{ filter: "saturate(0%)" }}
            transition="3s"
            w="100%"
            src={
              moviePosterLinkData2
                ? `https://image.tmdb.org/t/p/w500` + moviePosterLinkData2
                : ""
            }
            fallbackSrc="https://via.placeholder.com/325x500.png"
          />
        </Box>
      ) : (
        ""
      )}
      <SimpleGrid columns={2} width="100%">
        {movieList
          ? movieList.map((element) => {
              if (movieList.indexOf(element) < 10) {
                return (
                  <Container centerContent key={element.id} ml="1rem" mr="1rem">
                    <Link
                      href={"/movies/" + element.id}
                      color="white"
                      textDecoration="none"
                      fontFamily="Shindler"
                      fontSize="1.5rem"
                      transition="1s"
                      _hover={{ color: "silver" }}
                    >
                      <Text>
                        <b>{element.title}</b>
                      </Text>
                      <Text>
                        Rating:
                        <br />
                        <b>{element.vote_average}</b>
                      </Text>
                      <Text textAlign="center">{element.overview}</Text>
                      <Text>{moment(element.release_date).format("YYYY")}</Text>
                    </Link>
                  </Container>
                );
              }
            })
          : []}
      </SimpleGrid>
    </div>
  );
}

export default Genre;
