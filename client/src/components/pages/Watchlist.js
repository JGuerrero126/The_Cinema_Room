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
  Select,
  Center,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import WatchProvider from "../WatchProviders.js";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(null);
  const [userRegion, setUserRegion] = useState("US");

  function getWatchlist() {
    var watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    console.log(watchlist);
    setWatchlist(watchlist);
  }

  useEffect(() => {
    getWatchlist();
  }, []);
  useEffect(() => {
    console.log(userRegion);
  }, [userRegion]);

  return (
    <div data-testid="home-page" className="watchlist">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        Watchlist
      </Heading>
      <Center>
        <Select
          placeholder="Select Preferred Region"
          size="lg"
          w="40rem"
          bg="white"
          variant="outline"
          textColor="black"
          onChange={(e) => setUserRegion(e.target.value)}
        >
          <option value="AU">Australia</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="IE">Ireland</option>
          <option value="IN">India</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="MX">Mexico</option>
          <option value="US">United States</option>
        </Select>
      </Center>
      {watchlist && watchlist.length > 0 ? (
        <Flex mt="2rem" flexWrap="wrap" justify="center">
          {watchlist.map((el) => {
            return (
              <Container key={el.id} w="max-content">
                <Text>{el.title}</Text>
                <Image
                  border="0.5rem solid white"
                  w="16rem"
                  src={`https://image.tmdb.org/t/p/w500` + el.poster}
                />
                <WatchProvider movie={el.id} region={userRegion} />
              </Container>
            );
          })}
        </Flex>
      ) : (
        <Text>Watchlist Not Found!</Text>
      )}
      <footer className="watchFooter">
        <Text>All links courtesy of JustWatch</Text>
      </footer>
    </div>
  );
}

export default Watchlist;
