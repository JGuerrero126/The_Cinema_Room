import React, { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  Heading,
  Link,
  Divider,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { BsCardList } from "react-icons/bs";

function Home() {
  // const [profileData, setProfileData] = useState(null);
  const [genres, setGenres] = useState(null);
  const [genrelist, setGenreList] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: "/genre-list-link/",
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setGenreList(res);
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
    setGenres([
      "Action",
      "Animation",
      "Comedy",
      "Crime",
      "Documentation",
      "Drama",
      "Family",
      "Fantasy",
      "Horror",
      "Music",
      "Reality",
      "Romance",
      "Sci-Fi",
      "Sport",
      "Thriller",
      "War",
      "Western",
    ]);
  }, []);

  return (
    <div>
      <Heading fontSize="2rem">
        Here's all the Genres you can look through!
      </Heading>
      <Text fontSize="2rem">This is the Home Page.</Text>
      <Flex flexWrap="wrap" justify="center">
        {genres
          ? genres.map((element) => {
              return (
                <div>
                  <Box key={element} fontSize="1.25rem" w="10rem" h="5rem">
                    <Link
                      href={"/genres/" + element.replace(/-/, "").toLowerCase()}
                      color="black"
                      textDecoration="none"
                      _hover={{ color: "red", textDecoration: "underline" }}
                    >
                      <Text>{element}</Text>
                    </Link>
                  </Box>
                </div>
              );
            })
          : []}
      </Flex>
      <Divider border="null" w="80%" />
      <Button leftIcon={<BsCardList />} onClick={() => getData()}>
        Test TMDB Genre List
      </Button>
      {genrelist
        ? genrelist.map((element) => {
            return (
              <div>
                <Link href={"/genres/" + element.id}>
                  <Text>{element.name}</Text>
                </Link>
              </div>
            );
          })
        : []}
    </div>
  );
}

export default Home;
