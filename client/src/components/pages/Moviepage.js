import React from "react";
import { Text } from "@chakra-ui/react";

function Moviepage({ genre }) {
  return (
    <div>
      {genre !== "" ? (
        <div>
          <Text>Highest Rated Movie in {genre} genre!</Text>
          <Text>Movie in {genre} genre!</Text>
          <Text>Movie in {genre} genre!</Text>
          <Text>Movie in {genre} genre!</Text>
          <Text>Movie in {genre} genre!</Text>
          <Text>Movie in {genre} genre!</Text>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Moviepage;
