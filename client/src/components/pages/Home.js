import React, { useEffect } from "react";
import { useState } from "react";
import { Text, Heading, Link, Box, Flex } from "@chakra-ui/react";
import axios from "axios";

function Home() {
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

  // useEffect(() => {
  //   setGenres([
  //     "Action",
  //     "Animation",
  //     "Comedy",
  //     "Crime",
  //     "Documentation",
  //     "Drama",
  //     "Family",
  //     "Fantasy",
  //     "Horror",
  //     "Music",
  //     "Reality",
  //     "Romance",
  //     "Sci-Fi",
  //     "Sport",
  //     "Thriller",
  //     "War",
  //     "Western",
  //   ]);
  // }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Heading fontSize="2rem">
        Here's all the Genres you can look through!
      </Heading>
      <Flex flexWrap="wrap" justify="center">
        {genrelist
          ? genrelist.map((element) => {
              return (
                <div>
                  <Box key={element.id} fontSize="1.25rem" w="10rem" h="5rem">
                    <Link
                      color="black"
                      textDecoration="none"
                      _hover={{ color: "red", textDecoration: "underline" }}
                      href={"/genres/" + element.id}
                      fontWeight="bold"
                    >
                      <Text>{element.name}</Text>
                    </Link>
                  </Box>
                </div>
              );
            })
          : []}
      </Flex>
    </div>
  );
}

export default Home;
