import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Link,
  SimpleGrid,
  Box,
  Image,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";

function Movie() {
  const [profileData, setProfileData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  // const movie = useParams();
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
        title: "Mad Max: Fury Road",
        genres: ["Action", "Drama"],
        rating: 10,
        release_year: 2015,
        poster:
          "https://www.themoviedb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
      },
      {
        title: "Blade Runner 2049",
        genres: ["Sci-Fi", "Action"],
        rating: 10,
        release_year: 2017,
        poster:
          "https://www.themoviedb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      },
      {
        title: "RoboCop",
        genres: ["Sci-Fi", "Action"],
        rating: 10,
        release_year: 1987,
        poster:
          "https://www.themoviedb.org/t/p/original/hHtOgGb3NihlyRATHlKPaFApbrd.jpg",
      },
      {
        title: "Rambo III",
        genres: ["Action", "War"],
        rating: 10,
        release_year: 1988,
        poster:
          "https://www.themoviedb.org/t/p/original/pTVm2HrqV5kOt8tG4ZURNuhrmAq.jpg",
      },
    ]);
  }, []);

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
              <SimpleGrid columns={2} ml="2rem" mr="2rem" spacing="1rem">
                <Box
                  border="0.5rem groove grey"
                  bg="lightblue"
                  fontSize="1.5rem"
                  w="50%"
                  h="50%"
                >
                  <Text>Movie: {element.title}</Text>
                  <Text>Main Genre: {element.genres[0]}</Text>
                  <Text>Rating: {element.rating}</Text>
                  <Text>Release Year: {element.release_year}</Text>
                </Box>
                <Box
                  w="50%"
                  borderWidth="1rem"
                  borderRadius="md"
                  borderColor="gray"
                  borderStyle="groove"
                >
                  <Image w="100%" h="100%" src={element.poster} />
                </Box>
              </SimpleGrid>
            );
          })
        : []}
    </div>
  );
}

export default Movie;
