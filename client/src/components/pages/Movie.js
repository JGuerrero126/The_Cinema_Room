import React, { useState } from "react";
import { Text, Heading, Link, SimpleGrid, Box, Image } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";

function Movie() {
  const [profileData, setProfileData] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const { movie } = useParams();
  // const movie = "Singapore";

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
    </div>
  );
}

export default Movie;
