import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
// var passedFromAxios = "before";

function TestPage() {
  const { testParam } = useParams();
  // console.log("testParam is: " + testParam);
  const [axiosResult, setAxiosResult] = useState(null);
  // console.log("TestPage says: " + passedFromAxios);

  function getAxiosTest(target) {
    // passedFromAxios = "after";
    // console.log("getAxiosTest says: " + passedFromAxios);
    axios({
      method: "GET",
      // url: urlPrefix + "/genre-movies/" + target,
      url: "/users",
    })
      .then((response) => {
        // const res = "preview of mock";
        const res = response.data;
        console.log("/users response is:");
        console.log(res);
        setAxiosResult(res.name);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  // function wait() {
  //   function consoleAnError() {
  //     console.error("error within wait");
  //   }
  //   setTimeout(consoleAnError, 500);
  // }

  // wait();

  useEffect(() => {
    getAxiosTest(testParam);
  }, []);

  // console.error("top level error");
  // console.log("just before return says: " + passedFromAxios);

  return (
    <div data-testid="test-page">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        {/* {axiosResult
          ? "there is a result " + axiosResult + " " + passedFromAxios + " "
          : "no result" + axiosResult + " " + passedFromAxios + " "} */}
        testParam is: {testParam}
        here is axiosResult: {axiosResult}
        {/* passed is: {passedFromAxios} */}
      </Heading>
    </div>
  );
}

export default TestPage;
