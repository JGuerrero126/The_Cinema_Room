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
  Container,
  Image,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import moment from "moment";

function Home() {
  const [topRated, setTopRated] = useState(null);
  const [watchlistUpdated, watchlistSet] = useState(null);
  const toast = useToast();

  function getTopRated() {
    axios({
      method: "GET",
      url: urlPrefix + "/top-rated/",
    })
      .then((response) => {
        const res = response.data;
        console.log(res.results);
        setTopRated(res.results);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function fetchWatchlist(id) {
    var watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (watchlist.find((e) => e.id === parseInt(id))) {
      return true;
    }
    return false;
  }

  function setWatchlist(movie) {
    var watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    let currentMovie = {
      title: movie.title,
      id: movie.id,
      poster: movie.poster_path,
    };
    if (watchlist.find((e) => e.title === currentMovie.title)) {
      toast({
        title: "Watchlist Updated",
        description: "Movie removed from Watchlist",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      let index = watchlist.findIndex((el) => el.title === currentMovie.title);
      console.log(index);
      watchlist.splice(index, 1);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      watchlistSet(Math.random);
    } else {
      toast({
        title: "Watchlist Updated",
        description: "Movie added to Watchlist",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      watchlist.push(currentMovie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      watchlistSet(Math.random);
    }
  }

  useEffect(() => {
    getTopRated();
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "SouvenirM";
    document.getElementById("appHead").style.fontWeight = "Bold";
    document.getElementById("appHead").textContent = document
      .getElementById("appHead")
      .textContent.toUpperCase();
    // document.getElementById("appHead").style.textShadow = "0 0 0.5rem white";
  }, []);

  var i = 1;

  return (
    <div data-testid="top-rated-page">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        // fontWeight="normal"
        color="white"
        fontFamily="SouvenirM"
        textDecoration="underline"
      >
        Top Rated Movies
      </Heading>
      <Flex mt="1rem" flexWrap="wrap" justify="center">
        {topRated
          ? topRated.map((el) => {
              return (
                <Card
                  key={el.id}
                  direction={["column", "row"]}
                  maxW="95%"
                  minW="min-content"
                  margin="1rem"
                  paddingRight={["0", "1rem"]}
                  align="center"
                  fontFamily="SouvenirM"
                >
                  <Image
                    w={["", "18rem"]}
                    src={`https://image.tmdb.org/t/p/w500` + el.poster_path}
                    marginRight={["0", "1rem"]}
                  />
                  <CardBody>
                    <Heading fontFamily="SouvenirM">
                      #{i++} {el.title}
                    </Heading>
                    {moment(el.release_date).format("YYYY") ===
                    "Invalid date" ? (
                      <Text>Not Yet Released</Text>
                    ) : (
                      <Text>
                        Released: {moment(el.release_date).format("YYYY")}
                      </Text>
                    )}
                    <Text>Rated: {el.vote_average}</Text>
                    <Text>{el.overview}</Text>
                    {fetchWatchlist(el.id) === true ? (
                      <Button mt="2rem" onClick={() => setWatchlist(el)}>
                        Movie Added To Watchlist!
                      </Button>
                    ) : (
                      <Button mt="2rem" onClick={(e) => setWatchlist(el)}>
                        Add Movie To Watchlist?
                      </Button>
                    )}
                  </CardBody>
                </Card>
              );
            })
          : []}
      </Flex>
    </div>
  );
}

export default Home;
