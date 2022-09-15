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

function Actor() {
  const [actorData, setActorData] = useState(null);
  const [personImageLinkData, setPersonImageLinkData] = useState(null);
  const { actor } = useParams();

  function getActor() {
    console.log("actor is:");
    console.log(actor);
    axios({
      method: "GET",
      url: "/actors/" + actor,
    })
      .then((response) => {
        const res = response.data;
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

  useEffect(() => {
    getActor();
  }, []);

  useEffect(() => {
    if (actorData !== null) {
      getPersonImageLink(actorData.name);
    }
  }, [actorData]);

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
                      <Text>Movie: {element.title}</Text>
                      <Text>Character: {element.character}</Text>
                      <Text>Release Year: {element.release_year}</Text>
                    </Link>
                  </Container>
                );
              })
            : []}
          <Divider border="null" w="80%" />
          <p>Test call to db for "profile": </p>
          <button onClick={getActor}>Click me</button>
          {actorData && (
            <div>
              <p>Name: {actorData.name}</p>
              <p>
                Appearances Array:
                {JSON.stringify(actorData.appearances_array)}
              </p>
            </div>
          )}
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
            src={personImageLinkData ? personImageLinkData : ""}
            fallbackSrc="https://via.placeholder.com/325x500.png"
          />
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default Actor;
