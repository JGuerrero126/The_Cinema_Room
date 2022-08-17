import React from "react";
import { Text, Heading, Link } from "@chakra-ui/react";

function Home() {
  return (
    <div>
      <Heading fontSize="2rem">This is the Home Page.</Heading>
      <Text fontSize="2rem">This is the Home Page.</Text>
      <Link fontSize="1.5rem" href="/genres/test">
        Click Here to go the Genre Page.
      </Link>
    </div>
  );
}

export default Home;
