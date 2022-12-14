import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Link,
  SimpleGrid,
  Box,
  Image,
  Container,
  Center,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
import moment from "moment";

function Genre() {
  const { genre } = useParams();
  const [movieList, setMovieList] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);

  function getMovies(target) {
    axios({
      method: "GET",
      url: urlPrefix + "/genre-movies/" + target,
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

  function getMoviePosterLink(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/movie-poster-link/",
      data: { movie_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setMoviePosterLinkData(photoSelector(res));
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
      var bigArr = [];
      var voteArr = [];
      target.posters.forEach((el) => {
        if (el.iso_639_1 === "en") {
          englishArr.push(el);
        }
      });
      if (englishArr.length > 0) {
        englishArr.forEach((el) => {
          heightArr.push(el.height);
        });
        englishArr.forEach((el) => {
          if (el.height === Math.max(...heightArr)) {
            bigArr.push(el);
          }
        });
        if (bigArr.length < 2) {
          return bigArr[0].file_path;
        }
        bigArr.forEach((el) => {
          voteArr.push(el.vote_average);
        });
        var index;
        bigArr.forEach((el) => {
          if (el.vote_average === Math.max(...voteArr)) {
            index = bigArr.indexOf(el);
          }
        });
        return bigArr[index].file_path;
      } else {
        target.posters.forEach((el) => {
          heightArr.push(el.height);
        });
        target.posters.forEach((el) => {
          if (el.height === Math.max(...heightArr)) {
            bigArr.push(el);
          }
        });
        if (bigArr.length < 2) {
          return bigArr[0].file_path;
        }
        bigArr.forEach((el) => {
          voteArr.push(el.vote_average);
        });
        var index;
        bigArr.forEach((el) => {
          if (el.vote_average === Math.max(...voteArr)) {
            index = bigArr.indexOf(el);
          }
        });
        return bigArr[index].file_path;
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
      getMoviePosterLink(movieList[0].id);
    }
  }, [movieList]);

  return (
    <div data-testid="genre-page">
      <Heading
        fontSize={["10vw", "2.5rem"]}
        color="white"
        fontFamily="Shindler"
        mt="1rem"
      >
        Here are the top {genreName(genre)} movies!
      </Heading>
      {moviePosterLinkData ? (
        <Center mt="2rem">
          <Image
            border="1rem groove black"
            boxShadow="0rem 0rem 3rem lightyellow"
            _hover={{ boxShadow: "none", filter: "saturate(0%)" }}
            transition="3s"
            maxW="90vw"
            src={
              moviePosterLinkData
                ? `https://image.tmdb.org/t/p/w500` + moviePosterLinkData
                : ""
            }
            fallbackSrc="https://via.placeholder.com/325x500.png"
          />
        </Center>
      ) : (
        ""
      )}
      <Wrap justify="center" spacing="2rem" mt="2rem">
        {movieList
          ? movieList.map((element) => {
              if (movieList.indexOf(element) < 10) {
                return (
                  <Container
                    centerContent
                    key={element.id}
                    mt="1rem"
                    ml="1rem"
                    mr="1rem"
                  >
                    <Link
                      href={"/movies/" + element.id}
                      color="white"
                      textDecoration="none"
                      fontFamily="Shindler"
                      fontSize={["5vw", "1.5rem"]}
                      transition="1s"
                      _hover={{ color: "silver" }}
                    >
                      <Text fontSize={["7vw", "1.75rem"]}>
                        <b>
                          <u>{element.title}</u>
                        </b>
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
      </Wrap>
    </div>
  );
}

export default Genre;
