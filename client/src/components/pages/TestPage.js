import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";

function TestPage() {
  const { testParam } = useParams();
  const [axiosResponse, setAxiosResponse] = useState(null);
  console.log(axiosResponse);

  function getAxiosTest(target) {
    axios({
      method: "GET",
      url: urlPrefix + "/test/" + target,
    })
      .then((response) => {
        const res = response.data;
        console.log("/users response is:");
        console.log(res);
        setAxiosResponse(res.name);
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
    getAxiosTest(testParam);
  }, []);

  return (
    <div data-testid="test-page">
      <Text
        color="gold"
        fontFamily="Arial"
        fontSize="1.5rem"
        mb="1rem"
        mt="1rem"
      >
        testParam is: {testParam}
      </Text>
      <Text
        color="gold"
        fontFamily="Arial"
        fontSize="1.5rem"
        mb="1rem"
        mt="1rem"
      >
        {/* because there's no route on the server for /test there will be no response on the localhost render; but there will be a response for testing render because of the mock */}
        axiosResponse is: {axiosResponse}
      </Text>
    </div>
  );
}

export default TestPage;
