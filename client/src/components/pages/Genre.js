import React from "react";
import { Text, Heading, Link, SimpleGrid, Box, Image } from "@chakra-ui/react";

function Genre() {
  return (
    <div>
      <Heading fontSize="2rem">This is the Genre Page.</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          <Text fontSize="2rem">Info on the movies in the Genre go Here.</Text>
          <Link fontSize="1.5rem" href="/movies/test">
            Click here to go to the Movie Page.
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
            src="https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX917_.jpg"
          />
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default Genre;
