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

function Actor() {
  const { member } = useParams();
  const [actorAppearances, setActorAppearances] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const [actorDetails, setActorDetails] = useState(null);

  function getAppearances(target) {
    axios({
      method: "GET",
      url: urlPrefix + "/actor-appearances/" + target,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setActorAppearances(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getPersonImageLink(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/person-image-link/",
      data: { person_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        console.log(photoSelector(res));
        setPersonImageLinkData(photoSelector(res));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getActorDetails(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/actor-details/",
      data: { person_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setActorDetails(res);
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
    // First, we create empty arrays to contain all the info we need to loop through. One to let us find the biggest height in the images we received, another to contain only the biggest images we received, then the last to contain the images that are biggest and with the most votes.
    var heightArr = [];
    var bigArr = [];
    var voteArr = [];
    // We loop through our given array of objects that contain links to the images using a "forEach" method.
    target.profiles.forEach((el) => {
      // We push only the height property of each element, we do this so we can find the biggest images we can.
      heightArr.push(el.height);
    });
    target.profiles.forEach((el) => {
      // However this time, we check to see if the current elements height property matches the height property of our custom made object.
      if (el.height === Math.max(...heightArr)) {
        // If it does then we push the element into the array that will contain all the biggest images that we received.
        bigArr.push(el);
      }
    });
    // We set up a quick check of our new arrays length.
    if (bigArr.length < 2) {
      // if it only contains one element then there is no need to do further work, so we simply end the function here and return the file path of the only element in the array. This element will be the biggest image from the array we initially received which in the vast majority of cases means it is the highest quality.
      return bigArr[0].file_path;
    }
    // If the check fails we repeat the process we just did to get the biggest height but this time we do it to get the element with the highest vote average in our new array.
    bigArr.forEach((el) => {
      voteArr.push(el.vote_average);
    });
    var index;
    // We loop through the array containing the biggest images, searching for the element that matches the vote average we found in the previous steps.
    bigArr.forEach((el) => {
      // We set up a simple "if" statement to handle it.
      if (el.vote_average === Math.max(...voteArr)) {
        // Once it is found, we set the empty variable we created one step ago to contain the "indexOF" the current element in the biggest height array.
        index = bigArr.indexOf(el);
      }
    });
    // Lastly, we return the file path to the image that will be the biggest possible size with the highest vote average.
    return bigArr[index].file_path;
  }

  useEffect(() => {
    console.log(member);
    getAppearances(member);
  }, []);

  useEffect(() => {
    if (actorAppearances !== null) {
      getPersonImageLink(actorAppearances.id);
    }
  }, [actorAppearances]);

  useEffect(() => {
    getActorDetails(member);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "Chen";
    document.getElementById("appHead").style.fontWeight = "bold";
    document.getElementById("appHead").style.color = "gold";
    document.getElementById("appHead").style.textShadow =
      "0.3rem 0.3rem 0rem darkred";
    document.getElementById("appHead").textContent = document
      .getElementById("appHead")
      .textContent.toUpperCase();
  }, []);

  return (
    <div data-testid="crew-page">
      {actorDetails ? (
        <div>
          <Heading
            mt="1rem"
            fontWeight="normal"
            fontSize="2rem"
            color="gold"
            textShadow="0.2rem 0.2rem 0rem darkred"
            fontFamily="Chen"
          >
            {actorDetails.name.toUpperCase()}
          </Heading>
          <Center mt="1rem">
            {personImageLinkData ? (
              <div>
                <Center>
                  <Image
                    borderWidth="1rem"
                    borderRadius="md"
                    borderColor="gold"
                    borderStyle="groove"
                    transition="1s"
                    _hover={{
                      boxShadow: "0rem 0rem 3rem darkred",
                      borderColor: "darkred",
                    }}
                    maxW="90vw"
                    src={
                      personImageLinkData
                        ? `https://image.tmdb.org/t/p/w500` +
                          personImageLinkData
                        : ""
                    }
                    fallbackSrc="https://via.placeholder.com/325x500.png?text=No+Image+Provided"
                  />
                </Center>
                <Text fontSize="1rem" color="gold" fontFamily="Bus" mt="1rem">
                  Best Known For: {actorDetails.known_for_department}
                </Text>
              </div>
            ) : (
              <Text fontSize="1rem" color="gold" fontFamily="Bus" mt="1rem">
                Best Known For: {actorDetails.known_for_department}
              </Text>
            )}
          </Center>
          {actorDetails.biography === "" ? (
            ""
          ) : (
            <Text
              mt="1rem"
              fontSize={["4vw", "1rem"]}
              ml={["1rem", "3rem"]}
              mr={["1rem", "3rem"]}
              color="gold"
              fontFamily="Bus"
            >
              {actorDetails.biography}
            </Text>
          )}
          {moment(actorDetails.birthday).format("MMMM DD, YYYY") ===
          "Invalid date" ? (
            ""
          ) : (
            <Text fontSize="1rem" color="gold" fontFamily="Bus" mt="1rem">
              Birthday: {moment(actorDetails.birthday).format("MMMM DD, YYYY")}
            </Text>
          )}
        </div>
      ) : (
        ""
      )}
      {actorAppearances ? (
        <Accordion allowMultiple>
          {actorAppearances.crew.length > 0 ? (
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
                    textDecoration="none"
                    fontFamily="Bus"
                    fontSize="2rem"
                  >
                    Crew work
                    <AccordionIcon color="gold" />
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <SimpleGrid
                  justify="center"
                  spacing="1.5rem"
                  minChildWidth="15rem"
                  ml="1rem"
                  mr="1rem"
                >
                  {actorAppearances
                    ? actorAppearances.crew.map((el) => {
                        // if (actorAppearances.cast.indexOf(el) < 12) {
                        return (
                          <Container centerContent key={el.character}>
                            <Link
                              href={"/movies/" + el.id}
                              color="gold"
                              textDecoration="none"
                              fontFamily="Ben"
                              transition="1s"
                              _hover={{
                                color: "white",
                                textShadow: "0.2rem 0.2rem 2rem gold",
                              }}
                            >
                              <Text h="3rem">
                                <u>{el.title}</u>
                                <br /> {el.job}
                              </Text>
                              {el.vote_average === 0 ? (
                                <div></div>
                              ) : (
                                <Text>
                                  <br />
                                  Rating: <br />
                                  {el.vote_average}
                                </Text>
                              )}

                              <Center>
                                <Image
                                  borderWidth="1rem"
                                  borderRadius="md"
                                  borderColor="goldenrod"
                                  borderStyle="groove"
                                  transition="1s"
                                  w="100%"
                                  _hover={{ borderColor: "gold" }}
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
                        // }
                      })
                    : []}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          ) : (
            " "
          )}
          {actorAppearances.cast.length > 0 ? (
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
                    textDecoration="none"
                    fontFamily="Bus"
                    fontSize="2rem"
                  >
                    On The Big Screen
                    <AccordionIcon color="gold" />
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <SimpleGrid
                  justify="center"
                  spacing="1.5rem"
                  minChildWidth="15rem"
                  ml="1rem"
                  mr="1rem"
                >
                  {actorAppearances
                    ? actorAppearances.cast.map((el) => {
                        // if (actorAppearances.cast.indexOf(el) < 12) {
                        return (
                          <Container centerContent key={el.credit_id}>
                            <Link
                              href={"/movies/" + el.id}
                              color="gold"
                              textDecoration="none"
                              fontFamily="Ben"
                              transition="1s"
                              _hover={{
                                color: "white",
                                textShadow: "0.2rem 0.2rem 2rem gold",
                              }}
                            >
                              <Text h="4rem">
                                <u>{el.title}</u>
                                <br />
                                {el.character === "" ? (
                                  ""
                                ) : (
                                  <span>
                                    {el.character}
                                    <br />
                                  </span>
                                )}
                              </Text>
                              <Center>
                                <Image
                                  borderWidth="1rem"
                                  borderRadius="md"
                                  borderColor="goldenrod"
                                  borderStyle="groove"
                                  transition="1s"
                                  _hover={{ borderColor: "gold" }}
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
                        // }
                      })
                    : []}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          ) : (
            " "
          )}
        </Accordion>
      ) : (
        ""
      )}
    </div>
  );
}

export default Actor;
