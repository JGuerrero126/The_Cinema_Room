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
  const [profileData, setProfileData] = useState(null);
  const [actorData, setActorData] = useState(null);
  const actor = useParams();

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
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

  function getActor() {
    axios({
      method: "GET",
      url: "/actors/" + actor,
    })
      .then((response) => {
        const res = response.data;
        setActorData({
          name: res.name,
          character: res.character,
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

  // useEffect(() => {
  //   getActor();
  // }, []);

  useEffect(() => {
    setActorData([
      {
        title: "RoboCop",
        genres: ["Action", "Drama"],
        rating: 10,
        release_year: 1987,
        poster:
          "https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX917_.jpg",
      },
      {
        title: "Naked Lunch",
        genres: ["Drama"],
        rating: 10,
        release_year: 1991,
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTRiOTQ2ZWQtMmIwYy00Y2Y3LWFmMzgtNzgzZWU1MDhlOGJhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX719_.jpg",
      },
      {
        title: "RoboCop 2",
        genres: ["Action", "Crime"],
        rating: 10,
        release_year: 1990,
        poster:
          "https://m.media-amazon.com/images/M/MV5BZWQ1YjQ3ZTAtN2VlMC00YTllLTk3ZmEtNDlmNzg4ZGM1ODhjXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_FMjpg_UX355_.jpg",
      },
      {
        title: "The Adventures of Buckaroo Banzai Across the 8th Dimension",
        genres: ["Adventure", "Comedy"],
        rating: 10,
        release_year: 1984,
        poster:
          "https://m.media-amazon.com/images/M/MV5BMmE1OWZjYjctYzZlNi00YmEyLTg4YWYtZDc4NTE2ODZlYzhhXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_.jpg",
      },
    ]);
  }, []);

  console.log(actor);

  return (
    <div>
      <Heading fontSize="2rem">This is the Actor Page.</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          <Text fontSize="2rem">Info and other movies go Here.</Text>
          <Link fontSize="1.5rem" href="/movies/test">
            Click Here to go back to the Movie Page.
          </Link>
          <p>Test call to db for "profile": </p>
          <button onClick={getData}>Click me</button>
          {profileData && (
            <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
          )}
        </Box>
        <Box
          w="85%"
          borderWidth="1rem"
          borderRadius="md"
          borderColor="gray"
          borderStyle="groove"
        >
          <Image
            w="100%"
            h="100%"
            src="https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg"
          />
        </Box>
      </SimpleGrid>
      <Divider border="null" w="80%" />
      <Text fontSize="1.5rem" color="red">
        Below this is the dynamic data test, it may look strange.
      </Text>
      {actorData
        ? actorData.map((element) => {
            return (
              <Container centerContent key={element.title}>
                <SimpleGrid columns={2}>
                  <Box
                    border="0.5rem groove grey"
                    bg="lightblue"
                    fontSize="1.5rem"
                    w="20rem"
                    h="20rem"
                  >
                    <Link
                      href={
                        "/movies/" +
                        element.title.replace(/ /g, "").toLowerCase()
                      }
                    >
                      <Text>Movie: {element.title}</Text>
                      <Text>Main Genre: {element.genres[0]}</Text>
                      <Text>Rating: {element.rating}</Text>
                      <Text>Release Year: {element.release_year}</Text>
                    </Link>
                  </Box>
                  <Box
                    w="25rem"
                    borderWidth="1rem"
                    borderRadius="md"
                    borderColor="gray"
                    borderStyle="groove"
                  >
                    <Image w="100%" h="100%" src={element.poster} />
                  </Box>
                </SimpleGrid>
              </Container>
            );
          })
        : []}
    </div>
  );
}

export default Actor;
