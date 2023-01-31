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
import { genreName } from "../genreName";
import { photoSelector } from "../posterSelector";

function Genre() {
  const { genre } = useParams();
  const [movieList, setMovieList] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);

  const genreFont = "Shindler";

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

  useEffect(() => {
    getMovies(genre);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = genreFont;
    document.getElementById("appHead").style.fontSize = "3rem";
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
        fontFamily={genreFont}
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
            fallbackSrc="https://via.placeholder.com/325x500.png?text=No+Image+Provided"
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
                      fontFamily={genreFont}
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
