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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (movieData !== null) {
      getMoviePosterLink(movieData.title);
    }
  }, [movieData]);

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
      <Button leftIcon={<BsCardList />} onClick={() => getCredits(155)}>
        Test TMDB Credits for The Dark Knight
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getCredits(346)}>
        Test TMDB Credits for Seven Samurai
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getCredits(324857)}>
        Test TMDB Credits for Spider-Man: Into the Spider-Verse
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getCredits(1891)}>
        Test TMDB Credits for Star Wars: The Empire Strikes Back
      </Button>
      {movieCredits ? (
        <div>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Actor: {movieCredits.cast[0].name}</Text>
            <Text>Character: {movieCredits.cast[0].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Actor: {movieCredits.cast[1].name}</Text>
            <Text>Character: {movieCredits.cast[1].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Actor: {movieCredits.cast[2].name}</Text>
            <Text>Character: {movieCredits.cast[2].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Actor: {movieCredits.cast[3].name}</Text>
            <Text>Character: {movieCredits.cast[3].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Actor: {movieCredits.cast[4].name}</Text>
            <Text>Character: {movieCredits.cast[4].character}</Text>
          </Box>
        </div>
      ) : (
        []
      )}
    </div>
  );
}

export default Movie;
