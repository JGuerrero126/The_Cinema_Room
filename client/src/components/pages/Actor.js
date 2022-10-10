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
      <SimpleGrid columns={3} width="100%">
        {actorAppearances
          ? actorAppearances.cast.map((el) => {
              if (actorAppearances.cast.indexOf(el) < 12) {
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
                      }}
                    >
                      <Text>
                        <b>{el.title}</b>
                        <br />
                        {el.character === "" ? (
                          ""
                        ) : (
                          <div>Character: {el.character}</div>
                        )}
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
