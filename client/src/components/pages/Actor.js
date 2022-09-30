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

function Actor() {
  const [actorData, setActorData] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const { actor } = useParams();
  const [actorAppearances, setActorAppearances] = useState(null);
  const [personImageLinkData2, setPersonImageLinkData2] = useState(null);

  function getActor() {
    console.log("actor is:");
    console.log(actor);
    axios({
      method: "GET",
      url: "/actors/" + actor,
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
      url: "/person-image-link/",
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
      url: "/actor-appearances/" + target,
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
      url: "/person-image-link2/",
      data: { person_id: target },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setPersonImageLinkData2(res);
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
  }, []);

  useEffect(() => {
    if (actorAppearances !== null) {
      getPersonImageLink2(actorAppearances.id);
    }
  }, [actorAppearances]);

  return (
    <div>
      {actorData && (
        <div>
          <Heading fontSize="2rem">{actorData.name}</Heading>
        </div>
      )}
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          {actorData
            ? actorData.appearances_array.map((element) => {
                return (
                  <Container centerContent key={element.id}>
                    <Link
                      href={"/movies/" + element.id}
                      color="black"
                      textDecoration="none"
                      _hover={{ color: "red", textDecoration: "underline" }}
                    >
                      <Text>
                        Movie: {element.title}
                        <br />
                        Release Year: {element.release_year}
                        <br />
                        Role: {element.role}
                        <br />{" "}
                        {element.role === "ACTOR" ? (
                          <span>Character: {element.character}</span>
                        ) : (
                          ""
                        )}
                      </Text>
                    </Link>
                  </Container>
                );
              })
            : []}
          <Divider border="null" w="80%" />
        </Box>
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
            src={personImageLinkData ? personImageLinkData : ""}
            fallbackSrc="https://via.placeholder.com/325x500.png"
          />
        </Box>
      </SimpleGrid>
      <Divider border="null" w="80%" />
      <Heading>BELOW THIS IS THE API ONLY DATA</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        {actorAppearances ? (
          <div>
            <Container centerContent key={actorAppearances.cast[0].id}>
              <Link
                href={"/movies/" + actorAppearances.cast[0].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Movie Title: {actorAppearances.cast[0].title}
                  <br />
                  Character: {actorAppearances.cast[0].character}
                </Text>
                <Text>
                  Rating:
                  <br />
                  {actorAppearances.cast[0].vote_average}
                </Text>
                <Text>Description: {actorAppearances.cast[0].overview}</Text>
                <Text>
                  Release Date: {actorAppearances.cast[0].release_date}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={actorAppearances.cast[1].id}>
              <Link
                href={"/movies/" + actorAppearances.cast[1].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Movie Title: {actorAppearances.cast[1].title}
                  <br />
                  Character: {actorAppearances.cast[1].character}
                </Text>
                <Text>
                  Rating:
                  <br />
                  {actorAppearances.cast[1].vote_average}
                </Text>
                <Text>Description: {actorAppearances.cast[1].overview}</Text>
                <Text>
                  Release Date: {actorAppearances.cast[1].release_date}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={actorAppearances.cast[2].id}>
              <Link
                href={"/movies/" + actorAppearances.cast[2].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Movie Title: {actorAppearances.cast[2].title}
                  <br />
                  Character: {actorAppearances.cast[2].character}
                </Text>
                <Text>
                  Rating:
                  <br />
                  {actorAppearances.cast[2].vote_average}
                </Text>
                <Text>Description: {actorAppearances.cast[2].overview}</Text>
                <Text>
                  Release Date: {actorAppearances.cast[2].release_date}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={actorAppearances.cast[3].id}>
              <Link
                href={"/movies/" + actorAppearances.cast[3].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Movie Title: {actorAppearances.cast[3].title}
                  <br />
                  Character: {actorAppearances.cast[3].character}
                </Text>
                <Text>
                  Rating:
                  <br />
                  {actorAppearances.cast[3].vote_average}
                </Text>
                <Text>Description: {actorAppearances.cast[3].overview}</Text>
                <Text>
                  Release Date: {actorAppearances.cast[3].release_date}
                </Text>
              </Link>
            </Container>
            <Container centerContent key={actorAppearances.cast[4].id}>
              <Link
                href={"/movies/" + actorAppearances.cast[4].id}
                color="black"
                textDecoration="none"
                _hover={{ color: "red", textDecoration: "underline" }}
              >
                <Text>
                  Movie Title: {actorAppearances.cast[4].title}
                  <br />
                  Character: {actorAppearances.cast[4].character}
                </Text>
                <Text>
                  Rating:
                  <br />
                  {actorAppearances.cast[4].vote_average}
                </Text>
                <Text>Description: {actorAppearances.cast[4].overview}</Text>
                <Text>
                  Release Date: {actorAppearances.cast[4].release_date}
                </Text>
              </Link>
            </Container>
          </div>
        ) : (
          []
        )}
        {personImageLinkData2 ? (
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
              src={personImageLinkData2 ? personImageLinkData2 : ""}
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

export default Actor;
