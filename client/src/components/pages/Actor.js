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
      <Button leftIcon={<BsCardList />} onClick={() => getAppearances(3894)}>
        Test TMDB Appearances for Christian Bale
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getAppearances(7450)}>
        Test TMDB Appearances for Toshiro Mifune
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getAppearances(2)}>
        Test TMDB Appearances for Mark Hamill
      </Button>
      <Button leftIcon={<BsCardList />} onClick={() => getAppearances(587506)}>
        Test TMDB Appearances for Shameik Moore
      </Button>
      {actorAppearances ? (
        <div>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Movie Title: {actorAppearances.cast[0].title}</Text>
            <Text>Character: {actorAppearances.cast[0].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Movie Title: {actorAppearances.cast[1].title}</Text>
            <Text>Character: {actorAppearances.cast[1].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Movie Title: {actorAppearances.cast[2].title}</Text>
            <Text>Character: {actorAppearances.cast[2].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Movie Title: {actorAppearances.cast[3].title}</Text>
            <Text>Character: {actorAppearances.cast[3].character}</Text>
          </Box>
          <Box
            border="0.5rem solid black"
            bg="lightcoral"
            mr="auto"
            ml="auto"
            mb="1rem"
            w="15rem"
          >
            <Text>Movie Title: {actorAppearances.cast[4].title}</Text>
            <Text>Character: {actorAppearances.cast[4].character}</Text>
          </Box>
        </div>
      ) : (
        []
      )}
    </div>
  );
}

export default Actor;
