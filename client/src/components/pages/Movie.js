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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
import moment from "moment";

function Movie() {
  const { movie } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterLinkData, setMoviePosterLinkData] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [recs, setRecs] = useState(null);

  function getCredits(target) {
    console.log("STARTING THE REQUEST");
    axios({
      method: "GET",
      url: urlPrefix + "/movie-credits/" + target,
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

  function getMovieDetails(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/movie-details/",
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
      url: urlPrefix + "/movie-keywords/",
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

  function getRecs(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/movie-recs/",
      data: { movie_id: target },
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
    getMovieDetails(movie);
    getCredits(movie);
    getKeywords(movie);
    getMoviePosterLink(movie);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "DistantGalaxy";
  }, []);

  useEffect(() => {
    if (movieDetails !== null) {
      getRecs(movie);
    }
  }, [movieDetails]);

  return (
    <div>
      {movieDetails ? (
        <div>
          <Heading
            mt="1rem"
            fontWeight="normal"
            fontSize="2rem"
            color="gold"
            fontFamily="DistantGalaxy"
          >
            {movieDetails.title.toUpperCase()}
          </Heading>
          {moviePosterLinkData ? (
            <Center mt="1rem">
              <Image
                borderWidth="1rem"
                borderRadius="md"
                borderColor="black"
                borderStyle="groove"
                boxShadow="0rem 0rem 3rem lightyellow"
                transition="1s"
                _hover={{ boxShadow: "0rem 0rem 3rem green" }}
                src={
                  moviePosterLinkData
                    ? `https://image.tmdb.org/t/p/w500` + moviePosterLinkData
                    : ""
                }
                fallbackSrc="https://via.placeholder.com/325x500.png"
              />
            </Center>
          ) : (
            []
          )}
          <Heading
            fontSize="1.25rem"
            color="gold"
            fontFamily="DistantGalaxy"
            fontWeight="normal"
            mt="1rem"
          >
            {movieDetails.tagline}
          </Heading>
          <Text
            mt="1rem"
            ml="3rem"
            mr="3rem"
            // fontSize="0.85rem"
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
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton
              bg="transparent"
              _focus=""
              borderColor=""
              _before=""
              _after=""
              outline="0.5rem solid black"
              outlineOffset=""
            >
              <Box
                flex="1"
                textAlign="center"
                color="gold"
                fontFamily="DistantGalaxy"
                fontSize="2rem"
              >
                Cast
                <AccordionIcon color="gold" />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <SimpleGrid
              justify="center"
              spacing="1.5rem"
              minChildWidth="10rem"
              ml="1rem"
              mr="1rem"
            >
              {movieCredits
                ? movieCredits.cast.map((el) => {
                    // if (el.name !== "" && el.character !== "")
                    return (
                      <Container centerContent key={el.cast_id}>
                        <Link
                          href={"/actors/" + el.id}
                          color="gold"
                          textDecoration="none"
                          fontFamily="DistantGalaxy"
                          transition="2s"
                          _hover={{ color: "white" }}
                        >
                          <Text>
                            <u>{el.character}</u>
                            <br />
                            {el.name}
                          </Text>
                        </Link>
                      </Container>
                    );
                  })
                : []}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton
              bg="transparent"
              outline="0.5rem solid black"
              outlineOffset=""
            >
              <Box
                flex="1"
                textAlign="center"
                color="gold"
                fontFamily="DistantGalaxy"
                transition="1s"
                fontSize="2rem"
              >
                Crew
                <AccordionIcon color="gold" />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <SimpleGrid
              justify="center"
              spacing="1.5rem"
              minChildWidth="10rem"
              ml="1rem"
              mr="1rem"
            >
              {movieCredits
                ? movieCredits.crew.map((el) => {
                    return (
                      <Container centerContent key={el.credit_id}>
                        <Link
                          href={"/crew/" + el.id}
                          color="gold"
                          textDecoration="none"
                          fontFamily="DistantGalaxy"
                          transition="2s"
                          _hover={{ color: "white" }}
                        >
                          <Text>
                            <u>{el.job}</u>
                            <br />
                            {el.name}
                          </Text>
                        </Link>
                      </Container>
                    );
                  })
                : []}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Center>
        <Divider border="null" w="80%" mt="1rem" />
      </Center>
      {recs && recs.results.length > 0 ? (
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton
                bg="transparent"
                outline="0.5rem solid black"
                outlineOffset=""
              >
                <Box
                  flex="1"
                  textAlign="center"
                  textDecoration="none"
                  color="white"
                  fontWeight="normal"
                  fontSize="3rem"
                  fontFamily="DistantGalaxy"
                >
                  RECOMMENDATIONS
                  <AccordionIcon color="white" />
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <SimpleGrid minChildWidth="15rem">
                {recs
                  ? recs.results.map((el) => {
                      // if (el.title === movieDetails.title) {
                      //   i++;
                      //   return;
                      // }
                      // if (recs.results.indexOf(el) < i) {
                      return (
                        <Container
                          centerContent
                          key={el.id}
                          ml="1rem"
                          mr="1rem"
                          mb="1rem"
                        >
                          <Link
                            href={"/movies/" + el.id}
                            color="gold"
                            textDecoration="none"
                            fontFamily="DistantGalaxy"
                            transition="1s"
                            _hover={{ color: "white" }}
                          >
                            <Container h="9rem">
                              <Text>
                                <u>{el.title}</u>
                              </Text>
                              {el.vote_average === 0 ? (
                                <div></div>
                              ) : (
                                <Text>
                                  Rating: <br />
                                  {el.vote_average}
                                </Text>
                              )}
                            </Container>
                            <Center>
                              <Image
                                border="0.5rem groove goldenrod"
                                transition="1s"
                                _hover={{ borderColor: "white" }}
                                w="100%"
                                src={
                                  `https://image.tmdb.org/t/p/w500` +
                                  el.poster_path
                                }
                                fallbackSrc="https://via.placeholder.com/325x500.png"
                              />
                            </Center>
                            {moment(el.release_date).format("YYYY") ===
                            "Invalid date" ? (
                              <Text>Not Yet Released</Text>
                            ) : (
                              <Text>
                                {moment(el.release_date).format("YYYY")}
                              </Text>
                            )}
                          </Link>
                        </Container>
                      );
                    })
                  : []}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        []
      )}
    </div>
  );
}

export default Movie;
