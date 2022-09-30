import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Link,
  SimpleGrid,
  Box,
  Image,
  Divider,
  Container,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";
import { BsCardList } from "react-icons/bs";

function Movie() {
  const [movieData2, setMovieData2] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const { movie } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterLinkData2, setMoviePosterLinkData2] = useState(null);

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
        setMoviePosterLinkData2(res);
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

  return (
    <div>
      {movieData && (
        <div>
          <Heading fontSize="2rem">{movieData.title}</Heading>
        </div>
      )}
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          {movieData && (
            <div>
              <p>Genres: {movieData.genres}</p>
              <p>Rating: {movieData.rating}</p>
              <p>Description: {movieData.description}</p>
              <p>Release Year: {movieData.release_year}</p>
            </div>
          )}
          <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
            {movieData
              ? movieData.actor_array.map((element) => {
                  // console.log(element);
                  return (
                    <Container centerContent key={element.person_id}>
                      <Link
                        href={"/actors/" + element.person_id}
                        color="black"
                        textDecoration="none"
                        _hover={{ color: "red", textDecoration: "underline" }}
                      >
                        {element.role === "ACTOR" ? (
                          <div>
                            <Text>
                              Actor: {element.name}
                              <br />
                              Character: {element.character}
                            </Text>
                          </div>
                        ) : (
                          <div>
                            <Text>Director: {element.name}</Text>
                          </div>
                        )}
                      </Link>
                    </Container>
                  );
                })
              : []}
          </SimpleGrid>
          <Divider border="null" w="80%" />
        </Box>
        <Box
          w="85%"
          h="min-content"
          borderWidth="1rem"
          borderRadius="md"
          borderColor="gray"
          borderStyle="groove"
        >
          <Image
            w="100%"
            h="100%"
            src={moviePosterLinkData ? moviePosterLinkData : ""}
            fallbackSrc="https://via.placeholder.com/325x500.png"
          />
        </Box>
      </SimpleGrid>
      <Divider border="null" w="80%" />
      <Heading>BELOW THIS IS THE API ONLY DATA</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        {movieCredits ? (
          <div>
            <Container centerContent key={movieCredits.cast[0].id}>
              <Link
                href={"/actors/" + movieCredits.cast[0].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Actor: {movieCredits.cast[0].name}
                  <br />
                  Character: {movieCredits.cast[0].character}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={movieCredits.cast[1].id}>
              <Link
                href={"/actors/" + movieCredits.cast[1].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Actor: {movieCredits.cast[1].name}
                  <br />
                  Character: {movieCredits.cast[1].character}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={movieCredits.cast[2].id}>
              <Link
                href={"/actors/" + movieCredits.cast[2].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Actor: {movieCredits.cast[2].name}
                  <br />
                  Character: {movieCredits.cast[2].character}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={movieCredits.cast[3].id}>
              <Link
                href={"/actors/" + movieCredits.cast[3].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Actor: {movieCredits.cast[3].name}
                  <br />
                  Character: {movieCredits.cast[3].character}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={movieCredits.cast[4].id}>
              <Link
                href={"/actors/" + movieCredits.cast[4].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Actor: {movieCredits.cast[4].name}
                  <br />
                  Character: {movieCredits.cast[4].character}
                </Text>
              </Link>
            </Container>
          </div>
        ) : (
          []
        )}
        {moviePosterLinkData2 ? (
          <Box
            w="85%"
            h="min-content"
            bg="black"
            borderWidth="1rem"
            borderRadius="md"
            borderColor="gray"
            borderStyle="groove"
          >
            <Image
              w="100%"
              h="100%"
              src={moviePosterLinkData2 ? moviePosterLinkData2 : ""}
              fallbackSrc="https://via.placeholder.com/325x500.png"
            />
          </Box>
        ) : (
          ""
        )}
      </SimpleGrid>
    </div>
  );
}

export default Movie;
