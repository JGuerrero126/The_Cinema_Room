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
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
import moment from "moment";

function Actor() {
  const [actorData, setActorData] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const { actor } = useParams();
  const [actorAppearances, setActorAppearances] = useState(null);
  const [personImageLinkData2, setPersonImageLinkData2] = useState(null);
  const [actorDetails, setActorDetails] = useState(null);

  function getActor() {
    console.log("actor is:");
    console.log(actor);
    axios({
      method: "GET",
      url: urlPrefix + "/actors/" + actor,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setActorData({
          name: res.name,
          character: res.character,
          appearances_array: res.appearances_array,
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

  function getPersonImageLink(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/person-image-link/",
      data: { person_name: target },
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

  // useEffect(() => {
  //   getActor();
  // }, []);

  // useEffect(() => {
  //   if (actorData !== null) {
  //     getPersonImageLink(actorData.name);
  //   }
  // }, [actorData]);

  function getPersonImageLink2(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/person-image-link2/",
      data: { person_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        console.log(photoSelector(res));
        setPersonImageLinkData2(photoSelector(res));
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
    var heightArr = [];
    var bigArr = [];
    var voteArr = [];
    target.profiles.forEach((el) => {
      heightArr.push(el.height);
    });
    let bigPhoto = Math.max(...heightArr);
    let targetHeight = { height: bigPhoto };
    var index;
    target.profiles.forEach((el) => {
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

  useEffect(() => {
    getAppearances(actor);
  }, []);

  useEffect(() => {
    if (actorAppearances !== null) {
      getPersonImageLink2(actorAppearances.id);
    }
  }, [actorAppearances]);

  useEffect(() => {
    getActorDetails(actor);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "OCR";
  }, []);

  return (
    <div>
      {actorDetails ? (
        <div>
          <Heading
            fontWeight="normal"
            fontSize="2rem"
            color="green"
            // textShadow="0rem 0rem 0.5rem lightblue"
            fontFamily="OCR"
          >
            {actorDetails.name}
          </Heading>
          <Center>
            {personImageLinkData2 ? (
              <Box
                w="fit-content"
                bg="black"
                borderWidth="0.5rem"
                borderRadius="md"
                borderColor="green"
                borderStyle="dashed"
                transition="1s"
                _hover={{
                  boxShadow: "0rem 0rem 3rem white",
                  borderColor: "lightgreen",
                  borderWidth: "0.65rem",
                }}
              >
                <Image
                  w="100%"
                  h="100%"
                  src={
                    personImageLinkData2
                      ? `https://image.tmdb.org/t/p/w500` + personImageLinkData2
                      : ""
                  }
                  fallbackSrc="https://via.placeholder.com/325x500.png"
                />
              </Box>
            ) : (
              ""
            )}
          </Center>
          <Text
            fontSize="1rem"
            ml="3rem"
            mr="3rem"
            color="green"
            fontFamily="OCR"
          >
            {actorDetails.biography}
          </Text>
          <Text color="green" fontFamily="OCR">
            Birthday: {moment(actorDetails.birthday).format("MMMM DD, YYYY")}
          </Text>
        </div>
      ) : (
        ""
      )}
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton bg="transparent">
              <Box
                flex="1"
                textAlign="center"
                color="green"
                textDecoration="none"
                fontFamily="OCR"
                fontSize="2rem"
              >
                Actor Appearances
                <AccordionIcon color="green" />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Wrap justify="center" spacing="1.5rem">
              {actorAppearances
                ? actorAppearances.cast.map((el) => {
                    // if (actorAppearances.cast.indexOf(el) < 12) {
                    return (
                      <Container centerContent key={el.id}>
                        <Link
                          href={"/movies/" + el.id}
                          color="green"
                          textDecoration="none"
                          fontFamily="OCR"
                          transition="1s"
                          _hover={{
                            color: "lightgreen",
                            textShadow: "0rem 0rem 1rem white",
                            fontSize: "1.15rem",
                          }}
                        >
                          <Text>
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
                            {moment(el.release_date).format("YYYY")}
                          </Text>
                        </Link>
                      </Container>
                    );
                    // }
                  })
                : []}
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton bg="transparent">
              <Box
                flex="1"
                textAlign="center"
                color="green"
                textDecoration="none"
                fontFamily="OCR"
                fontSize="2rem"
              >
                Behind The Scenes
                <AccordionIcon color="green" />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Wrap justify="center" spacing="1.5rem">
              {actorAppearances
                ? actorAppearances.crew.map((el) => {
                    // if (actorAppearances.cast.indexOf(el) < 12) {
                    return (
                      <Container centerContent key={el.credit_id}>
                        <Link
                          href={"/movies/" + el.id}
                          color="green"
                          textDecoration="none"
                          fontFamily="OCR"
                          transition="1s"
                          _hover={{
                            color: "lightgreen",
                            textShadow: "0rem 0rem 1rem white",
                            fontSize: "1.15rem",
                          }}
                        >
                          <Text>
                            <u>{el.title}</u>
                            <br />
                            {el.job}
                          </Text>
                        </Link>
                      </Container>
                    );
                    // }
                  })
                : []}
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Actor;
