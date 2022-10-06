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
} from "@chakra-ui/react";
import axios from "axios";
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
      url: "/actor-details/",
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
    target.profiles.forEach((el) => {
      heightArr.push(el.height);
    });
    var bigPhoto = Math.max(...heightArr);
    var targetHeight = { height: bigPhoto };
    var index;
    target.profiles.map((el) => {
      if (el.height === targetHeight.height) {
        index = target.profiles.indexOf(el);
      }
    });
    return target.profiles[index].file_path;
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

  return (
    <div>
      {actorDetails ? (
        <div>
          <Heading fontSize="2rem">{actorDetails.name}</Heading>
          <Center>
            {personImageLinkData2 ? (
              <Box
                w="fit-content"
                bg="black"
                borderWidth="1rem"
                borderRadius="md"
                borderColor="gray"
                borderStyle="groove"
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
          <Text fontSize="0.95rem" ml="3rem" mr="3rem">
            {actorDetails.biography}
          </Text>
          <Text>
            Birthday: {moment(actorDetails.birthday).format("MMMM DD, YYYY")}
          </Text>
        </div>
      ) : (
        ""
      )}
      <SimpleGrid columns={3} width="100%">
        {actorAppearances
          ? actorAppearances.cast.map((el) => {
              if (actorAppearances.cast.indexOf(el) < 10) {
                return (
                  <Container centerContent key={el.id}>
                    <Link
                      href={"/movies/" + el.id}
                      color="black"
                      textDecoration="none"
                      _hover={{ color: "red", textDecoration: "underline" }}
                    >
                      <Text>
                        <b>{el.title}</b>
                        <br />
                        Character: {el.character}
                        <br />
                        {moment(el.release_date).format("YYYY")}
                      </Text>
                    </Link>
                  </Container>
                );
              }
            })
          : []}
      </SimpleGrid>
    </div>
  );
}

export default Actor;
