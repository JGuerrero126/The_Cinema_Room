import React, { useEffect, useState } from "react";
import { Link, Text, VStack, Image, Flex } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../utils/constants";

function WatchProvider({ movie, region }) {
  const [watchProviders, setWatchProviders] = useState(null);
  const watchFont = "Gill";

  function getWatchProviders(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/watch-providers/",
      data: { movie_id: target },
    }).then((res) => {
      console.log(res.data.results);
      setWatchProviders(res.data.results);
    });
  }
  useEffect(() => {
    getWatchProviders(movie);
  }, [region]);
  return (
    <div>
      {watchProviders && watchProviders[region] ? (
        <div>
          {watchProviders[region].buy ? (
            <div>
              <Text fontSize="1.25rem" fontFamily={watchFont}>
                Available for Purchase at the following services:
              </Text>
              <Flex direction="row" wrap="wrap">
                {watchProviders[region].buy.map((el) => {
                  return (
                    <div key={el.provider_id}>
                      <Image
                        w="3rem"
                        mr=".5rem"
                        ml=".5rem"
                        src={
                          "https://www.themoviedb.org/t/p/original/" +
                          el.logo_path
                        }
                      />
                    </div>
                  );
                })}
              </Flex>
            </div>
          ) : (
            <div></div>
          )}
          {watchProviders[region].rent ? (
            <div>
              <Text fontSize="1.25rem" fontFamily={watchFont}>
                Available to Rent at the following services:
              </Text>
              <Flex direction="row" wrap="wrap">
                {watchProviders[region].rent.map((el) => {
                  return (
                    <div key={el.provider_id}>
                      <Image
                        w="3rem"
                        mr=".5rem"
                        ml=".5rem"
                        src={
                          "https://www.themoviedb.org/t/p/original/" +
                          el.logo_path
                        }
                      />
                    </div>
                  );
                })}
              </Flex>
            </div>
          ) : (
            <div></div>
          )}
          {watchProviders[region].flatrate ? (
            <div>
              <Text fontSize="1.25rem" fontFamily={watchFont}>
                Available with Subscription at the following services:
              </Text>
              <Flex direction="row" wrap="wrap">
                {watchProviders[region].flatrate.map((el) => {
                  return (
                    <div key={el.provider_id}>
                      <Image
                        w="3rem"
                        mr=".5rem"
                        ml=".5rem"
                        src={
                          "https://www.themoviedb.org/t/p/original/" +
                          el.logo_path
                        }
                      />
                    </div>
                  );
                })}
              </Flex>
            </div>
          ) : (
            <div></div>
          )}
          <Link
            isExternal
            href={watchProviders[region].link}
            fontFamily={watchFont}
          >
            <Text fontSize="1.25rem" mt="1rem">
              Click Here For Links To Services
            </Text>
          </Link>
          <Text fontSize="1.25rem" fontFamily={watchFont}>
            Current Region: {region}
          </Text>
        </div>
      ) : (
        <div>
          <Text fontSize="1.25rem" fontFamily={watchFont}>
            No Streaming Links available
          </Text>
          <Text fontSize="1.25rem" fontFamily={watchFont}>
            Current Region: {region}
          </Text>
        </div>
      )}
    </div>
  );
}

export default WatchProvider;
