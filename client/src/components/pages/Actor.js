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
import { photoSelector } from "../portraitSelector";

function Actor() {
  const { actor } = useParams();
  const [actorAppearances, setActorAppearances] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const [actorDetails, setActorDetails] = useState(null);
  const actorFont = "OCR";

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

  useEffect(() => {
    getAppearances(actor);
    getActorDetails(actor);
    getPersonImageLink(actor);
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = actorFont;
  }, []);

  return (
    <div data-testid="actor-page">
      {actorDetails ? (
        <div>
          <Heading
            mt="1rem"
            fontWeight="normal"
            fontSize="2rem"
            color="green"
            fontFamily={actorFont}
          >
            {actorDetails.name}
          </Heading>
          <Center mt="1rem">
            {personImageLinkData ? (
              <div>
                <Image
                  borderWidth="0.5rem"
                  borderRadius="md"
                  borderColor="green"
                  borderStyle="dashed"
                  transition="1s"
                  _hover={{
                    boxShadow: "0rem 0rem 3rem white",
                    borderColor: "lightgreen",
                  }}
                  maxW="90vw"
                  src={
                    personImageLinkData
                      ? `https://image.tmdb.org/t/p/w500` + personImageLinkData
                      : ""
                  }
                  fallbackSrc="https://via.placeholder.com/325x500.png"
                />
              </div>
            ) : (
              ""
            )}
          </Center>
          <Text
            mt="1rem"
            fontSize={["4vw", "1rem"]}
            ml={["1rem", "3rem"]}
            mr={["1rem", "3rem"]}
            color="green"
            fontFamily={actorFont}
          >
            {actorDetails.biography}
          </Text>
          <Text color="green" fontFamily={actorFont} mt="1rem">
            Birthday: {moment(actorDetails.birthday).format("MMMM DD, YYYY")}
          </Text>
        </div>
      ) : (
        ""
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
                color="green"
                textDecoration="none"
                fontFamily={actorFont}
                fontSize={[" 6vw", "2rem"]}
              >
                Actor Appearances
                <AccordionIcon color="green" />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <SimpleGrid
              justify="center"
              spacing="1.5rem"
              minChildWidth="20rem"
              ml="1rem"
              mr="1rem"
            >
              {actorAppearances
                ? actorAppearances.cast.map((el) => {
                    return (
                      <Container centerContent key={el.id}>
                        <Link
                          href={"/movies/" + el.id}
                          color="green"
                          textDecoration="none"
                          fontFamily={actorFont}
                          transition="1s"
                          _hover={{
                            color: "lightgreen",
                            textShadow: "0rem 0rem 1rem white",
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
                  })
                : []}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
        {actorAppearances && actorAppearances.crew.length > 0 ? (
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
                  color="green"
                  textDecoration="none"
                  fontFamily={actorFont}
                  fontSize={[" 6vw", "2rem"]}
                >
                  Behind The Scenes
                  <AccordionIcon color="green" />
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
                      return (
                        <Container centerContent key={el.credit_id}>
                          <Link
                            href={"/movies/" + el.id}
                            color="green"
                            textDecoration="none"
                            fontFamily={actorFont}
                            transition="1s"
                            _hover={{
                              color: "lightgreen",
                              textShadow: "0rem 0rem 1rem white",
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
                    })
                  : []}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        ) : (
          ""
        )}
      </Accordion>
    </div>
  );
}

export default Actor;
