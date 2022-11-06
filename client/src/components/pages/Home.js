import React, { useEffect } from "react";
import { useState } from "react";
import { Text, Heading, Link, Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";

function Home() {
  const [genrelist, setGenreList] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: urlPrefix + "/genre-list-link/",
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
    getData();
  }, []);

  return (
    <div id="home-page">
      <Heading
        mt="2rem"
        fontSize="3rem"
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        Select A Genre
      </Heading>
      <Flex mt="2rem" flexWrap="wrap" justify="center">
        {genrelist
          ? genrelist.map((element) => {
              return (
                <Box key={element.id} fontSize="2.5rem" w="12rem" h="6rem">
                  <Link
                    color="white"
                    textDecoration="none"
                    transition="1s"
                    _hover={{ color: "red" }}
                    href={"/genres/" + element.id}
                    fontFamily="corleone"
                  >
                    <Text>{element.name}</Text>
                  </Link>
                </Box>
              );
            })
          : []}
      </Flex>
    </div>
  );
}

export default Home;
