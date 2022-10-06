import React from "react";
import { Divider, Heading, Link } from "@chakra-ui/react";

function Header() {
  return (
    <div>
      <Heading>
        <Link
          textDecoration="none"
          href="/"
          color="black"
          _hover={{ color: "red", textDecoration: "underline" }}
        >
          TOP MOVIES AND ACTORS ON TMDB
        </Link>
      </Heading>
      <Divider border="null" w="80%" mt="1rem" />
    </div>
  );
}

export default Header;
