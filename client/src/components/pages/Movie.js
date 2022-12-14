import React, { useEffect, useMemo, useState } from "react";
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
  Flex,
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
  const [director, setDirector] = useState(null);
  const [production, setProduction] = useState(null);
  const [writers, setWriters] = useState(null);
  const [editors, setEditors] = useState(null);
  const [sound, setSound] = useState(null);
  const [camera, setCamera] = useState(null);
  const [art, setArt] = useState(null);
  const [costumeMakeUp, setCostumeMakeUp] = useState(null);
  const [vfx, setVFX] = useState(null);
  const [lighting, setLighting] = useState(null);
  const [generalCrew, setGeneralCrew] = useState(null);
  const [crewSorted, setCrewSorted] = useState(false);

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

  function getRecs(target, genre, keyword) {
    genre = genre || 0;
    keyword = keyword || 0;
    axios({
      method: "POST",
      url: urlPrefix + "/movie-recs/",
      data: { movie_id: target, genre: genre, keyword: keyword },
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

  function setMovieHistory(movie) {
    var movieHistory = JSON.parse(localStorage.getItem("history") || "[]");
    let currentMovie = { title: movie.title, id: movie.id };
    if (movieHistory.find((e) => e.title === currentMovie.title)) {
      console.log("Movie already in history");
    } else if (movieHistory.length === 5) {
      console.log(
        "History full, removing oldest movie and adding current movie"
      );
      movieHistory.pop();
      movieHistory.unshift(currentMovie);
      localStorage.setItem("history", JSON.stringify(movieHistory));
    } else {
      movieHistory.unshift(currentMovie);
      localStorage.setItem("history", JSON.stringify(movieHistory));
    }
  }

  async function organizeCrew(crew) {
    const directorArr = [];
    const soundArr = [];
    const writingArr = [];
    const productionArr = [];
    const cameraArr = [];
    const artArr = [];
    const costumeMakeUpArr = [];
    const editingArr = [];
    const genArr = [];
    const vfxArr = [];
    const lightingArr = [];
    await crew.forEach((el) => {
      switch (el.department) {
        case "Directing":
          console.log("DIRECTOR FOUND");
          directorArr.push(el);
          break;
        case "Sound":
          soundArr.push(el);
          break;
        case "Writing":
          writingArr.push(el);
          break;
        case "Production":
          productionArr.push(el);
          break;
        case "Camera":
          cameraArr.push(el);
          break;
        case "Art":
          artArr.push(el);
          break;
        case "Costume & Make-Up":
          costumeMakeUpArr.push(el);
          break;
        case "Editing":
          editingArr.push(el);
          break;
        case "Crew":
          genArr.push(el);
          break;
        case "Visual Effects":
          vfxArr.push(el);
          break;
        case "Lighting":
          lightingArr.push(el);
          break;
        default:
          console.log("Unable to sort: " + el.name);
      }
    });
    console.log(
      "Sorted Crew Count: " +
        (directorArr.length +
          soundArr.length +
          writingArr.length +
          productionArr.length +
          cameraArr.length +
          artArr.length +
          costumeMakeUpArr.length +
          editingArr.length +
          genArr.length +
          vfxArr.length +
          lightingArr.length)
    );
    console.log("Director: " + directorArr[0].name);
    console.log("Unsorted Crew Count: " + crew.length);
    setDirector(directorArr);
    setSound(soundArr);
    setWriters(writingArr);
    setProduction(productionArr);
    setCamera(cameraArr);
    setArt(artArr);
    setCostumeMakeUp(costumeMakeUpArr);
    setEditors(editingArr);
    setGeneralCrew(genArr);
    setVFX(vfxArr);
    setLighting(lightingArr);
    setCrewSorted(true);
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

  useMemo(() => {
    if (movieDetails !== null && keywords !== null) {
      if (movieDetails.genres.length > 0 && keywords.length > 0) {
        console.log("USING THE KEYWORDS");
        getRecs(movie, movieDetails.genres[0].id, keywords[0].id);
      } else {
        console.log("USING THE DEFAULT");
        getRecs(movie);
      }
    }
  }, [movieDetails, keywords]);

  useEffect(() => {
    if (movieDetails !== null) setMovieHistory(movieDetails);
  }, [movieDetails]);

  useEffect(() => {
    if (movieCredits !== null) organizeCrew(movieCredits.crew);
  }, [movieCredits]);

  useEffect(() => {
    if (crewSorted === true) {
      console.log("Full Crew Added");
      console.log(director);
      console.log(sound);
      console.log(writers);
      console.log(production);
      console.log(camera);
      console.log(art);
      console.log(costumeMakeUp);
      console.log(editors);
      console.log(generalCrew);
      console.log(vfx);
      console.log(lighting);
    }
  }, [crewSorted]);

  return (
    <div data-testid="movie-page">
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
                maxW="90vw"
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
            fontSize={["4vw", "1.25rem"]}
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
            fontSize={["4vw", "1rem"]}
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
            {/* {movieCredits
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
                : []} */}
            {crewSorted ? (
              <div>
                {director && director.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                    >
                      The Directors
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {director.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {production && production.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Producers
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {production.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {writers && writers.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Writers
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {writers.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {editors && editors.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Editors
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {editors.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {sound && sound.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Sound Team
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {sound.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {camera && camera.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Camera Crew
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {camera.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {art && art.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Art Department
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {art.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {costumeMakeUp && costumeMakeUp.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Costume & Make-Up Team
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {costumeMakeUp.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {vfx && vfx.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Visual Effects Team
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {vfx.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
                {lighting && lighting.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Lighting Crew
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {lighting.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}

                {generalCrew && generalCrew.length > 0 ? (
                  <div>
                    <Text
                      color="gold"
                      textDecoration="underline"
                      fontFamily="DistantGalaxy"
                      fontSize="1.5rem"
                      mb="1rem"
                      mt="1rem"
                    >
                      The Crew
                    </Text>
                    <SimpleGrid
                      justify="center"
                      spacing="1.5rem"
                      minChildWidth="10rem"
                      ml="1rem"
                      mr="1rem"
                    >
                      {generalCrew.map((el) => {
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
                      })}
                    </SimpleGrid>
                  </div>
                ) : (
                  []
                )}
              </div>
            ) : (
              []
            )}
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
                  textDecoration="none"
                  color="white"
                  fontWeight="normal"
                  fontSize={["7vw", "3rem"]}
                  fontFamily="DistantGalaxy"
                >
                  RECOMMENDATIONS
                  <AccordionIcon color="white" />
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <SimpleGrid minChildWidth="15rem" ml="1rem" mr="1rem">
                {recs
                  ? recs.results.map((el) => {
                      if (el.title === movieDetails.title) {
                        return;
                      }
                      return (
                        <Container centerContent key={el.credit_id} mb="2rem">
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
