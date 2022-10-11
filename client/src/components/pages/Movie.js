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
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment";

function Movie() {
  const [movieData2, setMovieData2] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const { movie } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterLinkData2, setMoviePosterLinkData2] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [recs, setRecs] = useState(null);

  function getData() {
    console.log("movie is:");
    console.log(movie);
    axios({
      method: "GET",
      url: "/movies/" + movie,
    })
      .then((response) => {
        const res = response.data;
        setMovieData({
          title: res.title,
          genres: res.genres,
          rating: res.rating,
          description: res.description,
          release_year: res.release_year,
          actor_array: res.actor_array,
        });
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

  function getCredits(target) {
    console.log("STARTING THE REQUEST");
    axios({
      method: "GET",
      url: "/movie-credits/" + target,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setMovieCredits(res);
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
  //   getData();
  // }, []);

  // useEffect(() => {
  //   if (movieData !== null) {
  //     getMoviePosterLink(movieData.title);
  //   }
  // }, [movieData]);

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

  function getMovieDetails(target) {
    axios({
      method: "POST",
      url: "/movie-details/",
      data: { movie_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setMovieDetails(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function photoSelector(target) {
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
      let bigPhoto = Math.max(...heightArr);
      let targetHeight = { height: bigPhoto };

      englishArr.forEach((el) => {
        if (el.height === targetHeight.height) {
          bigArr.push(el);
        }
      });
      console.log(bigArr);
      if (bigArr.length < 2) {
        return bigArr[0].file_path;
      }
      bigArr.forEach((el) => {
        voteArr.push(el.vote_average);
      });
      let bigVote = Math.max(...voteArr);
      let targetVote = { vote_average: bigVote };
      var index;
      bigArr.forEach((el) => {
        if (el.vote_average === targetVote.vote_average) {
          index = bigArr.indexOf(el);
        }
      });
      return bigArr[index].file_path;
    } else {
      target.posters.forEach((el) => {
        heightArr.push(el.height);
      });
      let bigPhoto = Math.max(...heightArr);
      let targetHeight = { height: bigPhoto };
      var index;
      target.posters.forEach((el) => {
        if (el.height === targetHeight.height) {
          bigArr.push(el);
        }
      });
      if (bigArr.length < 2) {
        return bigArr[0].file_path;
      }
      bigArr.forEach((el) => {
        voteArr.push(el.vote_average);
      });
      let bigVote = Math.max(...voteArr);
      let targetVote = { vote_average: bigVote };
      var index;
      bigArr.forEach((el) => {
        if (el.vote_average === targetVote.vote_average) {
          index = bigArr.indexOf(el);
        }
      });
      return bigArr[index].file_path;
    }
  }

  function getKeywords(target) {
    axios({
      method: "POST",
      url: "/movie-keywords/",
      data: { movie_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setKeywords(res.keywords);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getRecs(gTarget, kTarget) {
    axios({
      method: "POST",
      url: "/movie-recs/",
      data: { genre: gTarget, keyword: kTarget },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setRecs(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getCredits(movie);
  }, []);

  useEffect(() => {
    if (movieCredits !== null) {
      getMoviePosterLink2(movieCredits.id);
    }
  }, [movieCredits]);

  useEffect(() => {
    getMovieDetails(movie);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "DistantGalaxy";
  }, []);

  useEffect(() => {
    getKeywords(movie);
  }, []);

  useEffect(() => {
    if (movieDetails !== null && keywords.length > 0) {
      getRecs(movieDetails.genres[0].id, keywords[0].id);
    }
  }, [keywords]);

  var i = 3;

  return (
    <div>
      {movieDetails ? (
        <div>
          <Heading
            fontWeight="normal"
            fontSize="2rem"
            color="gold"
            fontFamily="DistantGalaxy"
          >
            {movieDetails.title.toUpperCase()}
          </Heading>
          {moviePosterLinkData2 ? (
            <Center>
              <Box
                w="fit-content"
                bg="black"
                borderWidth="1rem"
                borderRadius="md"
                borderColor="black"
                borderStyle="groove"
                boxShadow="0rem 0rem 3rem lightyellow"
                transition="1s"
                _hover={{ boxShadow: "0rem 0rem 3rem green" }}
              >
                <Image
                  w="100%"
                  h="100%"
                  src={
                    moviePosterLinkData2
                      ? `https://image.tmdb.org/t/p/w500` + moviePosterLinkData2
                      : ""
                  }
                  fallbackSrc="https://via.placeholder.com/325x500.png"
                />
              </Box>
            </Center>
          ) : (
            ""
          )}
          <Heading
            fontSize="1.25rem"
            color="gold"
            fontFamily="DistantGalaxy"
            fontWeight="normal"
          >
            {movieDetails.tagline}
          </Heading>
          <Text
            ml="3rem"
            mr="3rem"
            fontSize="0.85rem"
            textAlign="center"
            color="gold"
            fontFamily="DistantGalaxy"
          >
            {movieDetails.overview}
          </Text>
        </div>
      ) : (
        []
      )}
      <SimpleGrid columns={4} width="100%">
        {movieCredits
          ? movieCredits.cast.map((el) => {
              if (el.order < 20 && el.name !== "" && el.character !== "")
                return (
                  <Container centerContent key={el.id}>
                    <Link
                      href={"/actors/" + el.id}
                      color="gold"
                      textDecoration="none"
                      fontFamily="DistantGalaxy"
                      transition="1s"
                      // fontSize="1rem"
                      _hover={{ color: "white" }}
                    >
                      <Text>
                        {el.character}
                        <br />
                        {el.name}
                      </Text>
                    </Link>
                  </Container>
                );
            })
          : []}
      </SimpleGrid>
      <Divider border="null" w="80%" mt="1rem" />
      <Heading
        textDecoration="none"
        color="white"
        fontWeight="normal"
        fontSize="3rem"
      >
        {" "}
        BELOW IS THE TEST RECOMMENDATION FEATURE
      </Heading>
      <SimpleGrid columns={3} width="100%">
        {recs
          ? recs.results.map((el) => {
              if (el.title === movieDetails.title) {
                i++;
                return;
              }
              if (recs.results.indexOf(el) < i) {
                return (
                  <Container centerContent key={el.id} ml="1rem" mr="1rem">
                    <Link
                      href={"/movies/" + el.id}
                      color="gold"
                      textDecoration="none"
                      fontFamily="DistantGalaxy"
                      transition="1s"
                      // fontSize="1rem"
                      _hover={{ color: "white" }}
                    >
                      <Text>{el.title}</Text>
                      <Text>{el.overview}</Text>
                      <Text>{moment(el.release_date).format("YYYY")}</Text>
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

export default Movie;
