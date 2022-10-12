import React from "react";
import { Divider, Heading, Link } from "@chakra-ui/react";

function Header() {
  return (
    <div>
      <Heading>
        <Link
          textDecoration="none"
          href="/"
          color="white"
          id="appHead"
          fontWeight="normal"
          transition="1s"
          _hover={{ color: "red" }}
          fontSize="3rem"
        >
          Cinema Room
        </Link>
      </Heading>
      <Divider border="null" w="80%" mt="1rem" />
    </div>
  );
}

export default Header;
