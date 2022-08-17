import React from "react";
import { Text, Heading, Link, SimpleGrid, Box, Image } from "@chakra-ui/react";

function Movie() {
  return (
    <div>
      <Heading fontSize="2rem">This is the Movie Page.</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          <Text fontSize="2rem">Info on the Actors go Here.</Text>
          <Link fontSize="1.5rem" href="/actors/test">
            Click here to go to the Actor Page.
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
            src="https://m.media-amazon.com/images/M/MV5BZmQ1NDc0MTEtMGJkYy00ZjNiLThkN2ItYzk2MzBkNmVlNDBmXkEyXkFqcGdeQXVyNjQyMjcwNDM@._V1_FMjpg_UX752_.jpg"
          />
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default Movie;
