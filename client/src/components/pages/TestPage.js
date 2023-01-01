import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";

function TestPage() {
  const { testParam } = useParams();
  console.log("testParam is: " + testParam);

  function getMovies(target) {
    axios({
      method: "GET",
      url: urlPrefix + "/genre-movies/" + target,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        // setMovieList(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function wait() {
    function consoleAnError() {
      console.error("error within wait");
    }
    setTimeout(consoleAnError, 500);
  }

  wait();

  getMovies(testParam);

  console.error("top level error");

  return (
    <div data-testid="test-page">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        testParam is: {testParam}
      </Heading>
    </div>
  );
}

export default TestPage;
