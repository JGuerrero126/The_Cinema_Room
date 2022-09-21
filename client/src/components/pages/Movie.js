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
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";

function Movie() {
  const [movieData2, setMovieData2] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const { movie } = useParams();

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
                  console.log(element);
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
    </div>
  );
}

export default Movie;
