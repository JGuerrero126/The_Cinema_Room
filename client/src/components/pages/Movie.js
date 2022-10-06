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
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";

function Movie() {
  const [movieData2, setMovieData2] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const { movie } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterLinkData2, setMoviePosterLinkData2] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

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

  return (
    <div>
      {movieDetails ? (
        <div>
          <Heading fontSize="2rem">{movieDetails.title}</Heading>
          {moviePosterLinkData2 ? (
            <Center>
              <Box
                w="fit-content"
                bg="black"
                borderWidth="1rem"
                borderRadius="md"
                borderColor="gray"
                borderStyle="groove"
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
          <Heading fontSize="1rem">{movieDetails.tagline}</Heading>
          <Text ml="3rem" mr="3rem" textAlign="center">
            {movieDetails.overview}
          </Text>
        </div>
      ) : (
        []
      )}
      <SimpleGrid columns={4} width="100%">
        {movieCredits
          ? movieCredits.cast.map((el) => {
              if (el.order < 20)
                return (
                  <Container centerContent key={el.id}>
                    <Link
                      href={"/actors/" + el.id}
                      color="black"
                      textDecoration="none"
                      _hover={{ color: "red", textDecoration: "underline" }}
                    >
                      <Text>
                        <b>{el.character}</b>
                        <br />
                        {el.name}
                      </Text>
                    </Link>
                  </Container>
                );
            })
          : []}
      </SimpleGrid>
    </div>
  );
}

export default Movie;
