import React, { useEffect, useState } from "react";
import { Link, Text, VStack, Image, Flex } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../utils/constants";

function WatchProvider({ movie, region }) {
  const [watchProviders, setWatchProviders] = useState(null);

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
              <Text>Available for Purchase at the following services:</Text>
              <Flex direction="row">
                {watchProviders[region].buy.map((el) => {
                  return (
                    <VStack key={el.provider_id} w="3rem" mr=".5rem" ml=".5rem">
                      <Image
                        src={
                          "https://www.themoviedb.org/t/p/original/" +
                          el.logo_path
                        }
                      />
                    </VStack>
                  );
                })}
              </Flex>
            </div>
          ) : (
            <div></div>
          )}
          {watchProviders[region].rent ? (
            <div>
              <Text>Available to Rent at the following services:</Text>
              <Flex direction="row">
                {watchProviders[region].rent.map((el) => {
                  return (
                    <VStack key={el.provider_id} w="3rem" mr=".5rem" ml=".5rem">
                      <Image
                        src={
                          "https://www.themoviedb.org/t/p/original/" +
                          el.logo_path
                        }
                      />
                    </VStack>
                  );
                })}
              </Flex>
            </div>
          ) : (
            <div></div>
          )}
          {watchProviders[region].flatrate ? (
            <div>
              <Text>
                Available with Subscription at the following services:
              </Text>
              <Flex direction="row">
                {watchProviders[region].flatrate.map((el) => {
                  return (
                    <VStack key={el.provider_id} w="3rem" mr=".5rem" ml=".5rem">
                      <Image
                        src={
                          "https://www.themoviedb.org/t/p/original/" +
                          el.logo_path
                        }
                      />
                    </VStack>
                  );
                })}
              </Flex>
            </div>
          ) : (
            <div></div>
          )}
          <Link isExternal href={watchProviders[region].link}>
            <Text>Links Found For {region}</Text>
          </Link>
        </div>
      ) : (
        <Text>No Streaming Links available</Text>
      )}
    </div>
  );
}

export default WatchProvider;
