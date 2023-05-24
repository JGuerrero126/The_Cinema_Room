import React, { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  Heading,
  Link,
  Flex,
  Button,
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
  const topFont = "SouvenirM";

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
    document.getElementById("appHead").style.fontFamily = topFont;
    document.getElementById("appHead").style.fontWeight = "Bold";
    document.getElementById("appHead").textContent = document
      .getElementById("appHead")
      .textContent.toUpperCase();
  }, []);

  var i = 1;

  return (
    <div data-testid="top-rated-page">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        color="white"
        fontFamily={topFont}
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
                  direction={["column", "column", "row"]}
                  maxW="95%"
                  minW="min-content"
                  margin="1.5rem"
                  paddingRight={["0", "0", "1rem"]}
                  align="center"
                  fontFamily={topFont}
                  textColor="snow"
                  bg="gray.800"
                >
                  <Link href={"/movies/" + el.id}>
                    <Image
                      w={["", "", "18rem"]}
                      src={`https://image.tmdb.org/t/p/w500` + el.poster_path}
                      fallbackSrc="https://via.placeholder.com/325x500.png?text=No+Image+Provided"
                      marginRight={["0", "0", "1rem"]}
                    />
                  </Link>
                  <CardBody>
                    <Link href={"/movies/" + el.id}>
                      <Heading fontFamily={topFont}>
                        #{i++} {el.title}
                      </Heading>
                    </Link>

                    {moment(el.release_date).format("YYYY") ===
                    "Invalid date" ? (
                      <Text>Not Yet Released</Text>
                    ) : (
                      <Text>
                        Released: {moment(el.release_date).format("YYYY")}
                      </Text>
                    )}
                    <Text>Rated: {el.vote_average}</Text>
                    <Text fontSize="0.90rem">{el.overview}</Text>
                    <Button
                      mt="2rem"
                      onClick={(e) => setWatchlist(el)}
                      textColor="black"
                      _active={{ textColor: "white", bg: "gray.900" }}
                      _hover={{ textColor: "black", bg: "gray.500" }}
                    >
                      {fetchWatchlist(el.id) === true ? (
                        <Text>Movie Added To Watchlist!</Text>
                      ) : (
                        <Text>Add Movie To Watchlist?</Text>
                      )}
                    </Button>
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
