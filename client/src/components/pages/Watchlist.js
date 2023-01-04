import React, { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  Heading,
  Link,
  Box,
  Flex,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);

  function getWatchlist() {
    var watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    console.log(watchlist);
    setWatchlist(watchlist);
  }

  function getWatchProviders(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/watch-providers/",
      data: { movie_id: target },
    }).then((res) => {
      console.log(res.data.results);
      return res.data.results;
    });
  }

  useEffect(() => {
    getWatchlist();
  }, []);

  useEffect(() => {
    if (watchlist !== null) {
      var value;
      async function test() {
        var result = await watchlist.map(async (el) => {
          await getWatchProviders(el.id);
        });
        value = await result;
      }
      test();
      const val = value;
      console.log(val);
    }
  }, [watchlist]);

  return (
    <div data-testid="home-page">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        Watchlist
      </Heading>
      <Flex mt="2rem" flexWrap="wrap" justify="center">
        {watchlist && watchlist.length > 0 ? (
          <div>
            {watchlist.map((el) => {
              return (
                <div key={el.id}>
                  <Text>{el.title}</Text>
                  <Image src={`https://image.tmdb.org/t/p/w500` + el.poster} />
                </div>
              );
            })}
          </div>
        ) : (
          <Text>Watchlist Not Found! :( </Text>
        )}
      </Flex>
    </div>
  );
}

export default Watchlist;
