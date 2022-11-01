import React, { useEffect } from "react";
import { useState } from "react";
import { Text, Heading, Link, Box, Flex, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";

function Home() {
  const [genrelist, setGenreList] = useState(null);
  const [search, setSearch] = useState('');
  const handleChange = (event) => setSearch(event.target.value)
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
    <div> 
      <Input value={search} onChange={handleChange} placeholder='Movie..' width="15rem"/>
      <Button colorScheme='blue'
      onClick={()=>{
        console.log(search);
      }} >Search</Button>
      <Heading
        fontSize="3rem"
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        Select A Genre
      </Heading>
      <Flex flexWrap="wrap" justify="center">
        {genrelist
          ? genrelist.map((element) => {
              return (
                <div key={element.id}>
                  <Box key={element.id} fontSize="2.5rem" w="10rem" h="5rem">
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
                </div>
              );
            })
          : []}
      </Flex>
    </div>
  );
}

export default Home;
