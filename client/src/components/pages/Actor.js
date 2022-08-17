import React from "react";
import { Text, Heading, Link, SimpleGrid, Box, Image } from "@chakra-ui/react";

function Actor() {
  return (
    <div>
      <Heading fontSize="2rem">This is the Actor Page.</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          <Text fontSize="2rem">Info and other movies go Here.</Text>
          <Link fontSize="1.5rem" href="/movies/test">
            Click Here to go back to the Movie Page.
          </Link>
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
    </div>
  );
}

export default Actor;
