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

function Genre() {
  const [genreData, setGenreData] = useState(null);
  const [genreData2, setGenreData2] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const { genre } = useParams();
  const [movieList, setMovieList] = useState(null);

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
      // data: { genre_target: target },
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

  useEffect(() => {
    getPersonImageLink();
  }, []);

  useEffect(() => {
    if (genreData !== null) {
      getMoviePosterLink(genreData[0].title);
    }
  }, [genreData]);

  useEffect(() => {
    getGenre();
  }, []);

  console.log(genre);

  return (
    <div>
      <Heading fontSize="2rem">Here are the top {genre} movies!</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          {genreData
            ? genreData.map((element) => {
                return (
                  <Container centerContent key={element.id}>
                    <Link
                      href={"/movies/" + element.id}
                      color="black"
                      textDecoration="none"
                      _hover={{ color: "red", textDecoration: "underline" }}
                    >
                      <Text>Movie: {element.title}</Text>
                      <Text>Main Genre: {element.genres[0]}</Text>
                      <Text>Rating: {element.rating}</Text>
                      <Text>Release Year: {element.release_year}</Text>
                    </Link>
                  </Container>
                );
              })
            : []}
          <Divider border="null" w="80%" />
        </Box>
        <Box
          w="85%"
          h="fit-content"
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
      <Button leftIcon={<BsCardList />} onClick={() => getMovies(36)}>
        Test TMDB Movie List For History
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getMovies(28)}>
        Test TMDB Movie List For Action
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getMovies(27)}>
        Test TMDB Movie List For Horror
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getMovies(16)}>
        Test TMDB Movie List For Animation
      </Button>
      {movieList
        ? movieList.map((element) => {
            return (
              <div>
                <Box
                  border="0.5rem solid black"
                  bg="lightcoral"
                  mr="auto"
                  ml="auto"
                  mb="1rem"
                  w="30rem"
                >
                  <Text>Movie Title: {element.title}</Text>
                  <Text>Overview: {element.overview}</Text>
                </Box>
              </div>
            );
          })
        : []}
    </div>
  );
}

export default Genre;
