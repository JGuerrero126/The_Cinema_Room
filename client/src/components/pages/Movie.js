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

function Movie() {
  const [profileData, setProfileData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const movieTest = useParams();
  const movie = "Singapore";

  function getData() {
    axios({
      method: "GET",
      url: "/movies/" + movie,
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          title: res.title,
          genres: res.genres,
          rating: res.rating,
          description: res.description,
          release_year: res.release_year,
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

  // function getMovie() {
  //   axios({
  //     method: "GET",
  //     url: "/movies/" + movie,
  //   })
  //     .then((response) => {
  //       const res = response.data;
  //       console.log(res);
  //       setMovieData(res);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });
  // }

  // useEffect(() => {
  //   getMovie();
  // }, []);

  useEffect(() => {
    setMovieData([
      {
        Name: "Peter Weller",
        Character: "Alex Murphy/RoboCop",
        Role: "ACTOR",
        Image:
          "https://m.media-amazon.com/images/M/MV5BMTE5MTIxNTM1NV5BMl5BanBnXkFtZTYwOTMzNjc1._V1_FMjpg_UX277_.jpg",
      },
      {
        Name: "Nancy Allen",
        Character: "Anne Lewis",
        Role: "ACTOR",
        Image:
          "https://m.media-amazon.com/images/M/MV5BNzU3NTFjZjUtNzE1OS00YTA4LWI3ZmYtNTBiZGY3YmY0YjU5XkEyXkFqcGdeQXVyMjI3NDc1NTU@._V1_FMjpg_UX427_.jpg",
      },
      {
        Name: "Dan O'Herlihy",
        Character: "The Old Man",
        Role: "ACTOR",
        Image:
          "https://m.media-amazon.com/images/M/MV5BMjMwNjYxOTEzMl5BMl5BanBnXkFtZTcwOTA3NTUwOA@@._V1_.jpg",
      },
      {
        Name: "Ronny Cox",
        Character: "Dick Jones",
        Role: "ACTOR",
        Image:
          "https://m.media-amazon.com/images/M/MV5BMjEyMjAzNTI0M15BMl5BanBnXkFtZTcwNTA1MjcyMQ@@._V1_FMjpg_UX149_.jpg",
      },
      {
        Name: "Paul Verhoeven",
        Character: "",
        Role: "DIRECTOR",
        Image:
          "https://m.media-amazon.com/images/M/MV5BMTU5NTc4OTU0Nl5BMl5BanBnXkFtZTYwMDU2MDc0._V1_FMjpg_UX275_.jpg",
      },
    ]);
  }, []);

  console.log(movieTest);

  return (
    <div>
      <Heading fontSize="2rem">This is the Movie Page.</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          <Text fontSize="2rem">Info on the Actors go Here.</Text>
          <Link fontSize="1.5rem" href="/actors/test">
            Click here to go to the Actor Page.
          </Link>
          <p>Test call to db for movie: </p>
          <button onClick={getData}>Click me</button>
          {profileData && (
            <div>
              <p>Title: {profileData.title}</p>
              <p>Genres: {profileData.genres}</p>
              <p>Rating: {profileData.rating}</p>
              <p>Description: {profileData.description}</p>
              <p>Release Year: {profileData.release_year}</p>
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
            src="https://m.media-amazon.com/images/M/MV5BZmQ1NDc0MTEtMGJkYy00ZjNiLThkN2ItYzk2MzBkNmVlNDBmXkEyXkFqcGdeQXVyNjQyMjcwNDM@._V1_FMjpg_UX752_.jpg"
          />
        </Box>
      </SimpleGrid>
      <Divider border="null" w="80%" />
      <Text fontSize="1.5rem" color="red">
        Below this is the dynamic data test, it may look strange.
      </Text>
      {movieData
        ? movieData.map((element) => {
            return (
              <Container centerContent key={element.Name}>
                <SimpleGrid columns={2}>
                  <Box
                    border="0.5rem groove grey"
                    bg="lightblue"
                    fontSize="1.5rem"
                    w="20rem"
                    h="15rem"
                  >
                    <Link
                      href={
                        "/actors/" +
                        element.Name.replace(/ /g, "").toLowerCase()
                      }
                    >
                      {element.Role === "ACTOR" ? (
                        <div>
                          <Text>Actor: {element.Name}</Text>
                          <Text>Character: {element.Character}</Text>
                        </div>
                      ) : (
                        <div>
                          <Text>Director: {element.Name}</Text>
                        </div>
                      )}
                    </Link>
                  </Box>
                  <Box
                    w="25rem"
                    borderWidth="1rem"
                    borderRadius="md"
                    borderColor="gray"
                    borderStyle="groove"
                  >
                    <Image w="100%" h="100%" src={element.Image} />
                  </Box>
                </SimpleGrid>
              </Container>
            );
          })
        : []}
    </div>
  );
}

export default Movie;
