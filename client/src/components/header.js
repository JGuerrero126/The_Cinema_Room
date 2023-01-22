import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteCenter,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  useDisclosure,
  InputRightElement,
  Stack,
  Radio,
  RadioGroup,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { urlPrefix } from "../utils/constants";
// import { useNavigate } from "react-router-dom";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [history, setHistory] = useState(null);
  const [favorites, setFavorites] = useState(null);

  function getTrendingMovies() {
    axios({
      method: "GET",
      url: urlPrefix + "/trending/",
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setTrendingMovies(res.results);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  function getMovieHistory() {
    var movieHistory = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(movieHistory);
    console.log(movieHistory);
  }

  function getFavorites() {
    var favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favorites);
    console.log(favorites);
  }

  const [search, setSearch] = useState("");
  const handleChange = (event) => setSearch(event.target.value);

  const [radio, setRadio] = React.useState("1");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const changeRoute = (word) => {
    // let path = `/movie/` + word;
    // navigate(path);

    window.location.href =
      "http://localhost:3000/movie/" + radio + "/" + sortBy + "/" + search;
  };

  function removeFromMH(movie) {
    var movieHistory = JSON.parse(localStorage.getItem("history") || "[]");
    if (movieHistory.find((e) => e.title === movie)) {
      let index = movieHistory.findIndex((el) => el.title === movie);
      movieHistory.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(movieHistory));
      setHistory(movieHistory);
    }
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    getMovieHistory();
    getFavorites();
  }, []);

  var i = 1;

  return (
    <div>
      <Button
        ref={btnRef}
        bg="black"
        border=".10rem solid white"
        onClick={onOpen}
        position={["relative", "absolute"]}
        left="0"
        ml={["", "2rem"]}
        mt={["0.5rem", ""]}
        width={["90vw", "initial"]}
      >
        <HamburgerIcon />
      </Button>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            bg="black"
            borderRight="0.25rem snow inset"
            textAlign="center"
          >
            THE CINEMA ROOM
          </DrawerHeader>
          <DrawerBody bg="black" borderRight="0.25rem snow inset">
            <Text textAlign="center" mb=".5rem">
              <b>
                <u>SEARCH MOVIE BY</u>
              </b>
            </Text>
            <RadioGroup onChange={setRadio} value={radio}>
              <Stack direction="column" color="white" mb="1rem">
                <Radio value="1">TITLE</Radio>
                <Radio value="2">PERSON</Radio>
                <Radio value="3">YEAR</Radio>
                {radio === "3" ? (
                  <Select
                    placeholder="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                    color="white"
                  >
                    <option
                      style={{ color: "black" }}
                      value="original_title.asc"
                    >
                      Alphabetically
                    </option>
                    <option style={{ color: "black" }} value="popularity.desc">
                      Popularity
                    </option>
                    <option
                      style={{ color: "black" }}
                      value="primary_release_date.asc"
                    >
                      Release Date
                    </option>
                  </Select>
                ) : (
                  []
                )}
              </Stack>
            </RadioGroup>
            <InputGroup size="xs">
              <Input
                value={search}
                onChange={handleChange}
                bg="snow"
                placeholder="Search For A Movie!"
                _placeholder={{ color: "inherit" }}
                textColor="black"
              />
              <Button
                color="white"
                bg="black"
                marginLeft=".50rem"
                border=".10rem solid white"
                onClick={() => {
                  changeRoute(search);
                }}
              >
                Search
              </Button>
            </InputGroup>
            <Divider mt="1rem" mb="1rem" />
            <Text textAlign="center" mb="1rem">
              <b>
                <u>TRENDING MOVIES THIS WEEK</u>
              </b>
            </Text>
            {trendingMovies
              ? trendingMovies.map((element) => {
                  return (
                    <Container
                      key={element.id}
                      mb="0.25rem"
                      borderBottom="0.10rem solid snow"
                    >
                      <Link
                        href={"/movies/" + element.id}
                        color="white"
                        fontSize="1rem"
                      >
                        <Text textAlign="left">
                          #{i++}. {element.title}
                        </Text>
                      </Link>
                    </Container>
                  );
                })
              : []}
            <Divider mt="1rem" mb="1rem" />
            {favorites && favorites.length > 0 ? (
              <div>
                <Text textAlign="center" mb="1rem">
                  <b>
                    <u>FAVORITE MOVIES</u>
                  </b>
                </Text>
                {favorites.map((el) => {
                  return (
                    <Container
                      key={el.id}
                      mb="0.25rem"
                      borderBottom="0.10rem solid snow"
                    >
                      <Link
                        href={"/movies/" + el.id}
                        color="white"
                        fontSize="1rem"
                      >
                        <Text textAlign="left">{el.title}</Text>
                      </Link>
                    </Container>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <Divider mt="1rem" mb="1rem" />
            {history && history.length > 0 ? (
              <div>
                <Text textAlign="center" mb="1rem">
                  <b>
                    <u>RECENTLY VIEWED MOVIES</u>
                  </b>
                </Text>
                {history.map((el) => {
                  return (
                    <Container
                      key={el.id}
                      mb="0.25rem"
                      borderBottom="0.10rem solid snow"
                    >
                      <Link
                        href={"/movies/" + el.id}
                        color="white"
                        fontSize="1rem"
                      >
                        {el.title}
                      </Link>
                      <CloseIcon
                        boxSize="0.75rem"
                        float="right"
                        onClick={() => removeFromMH(el.title)}
                        cursor="pointer"
                      />
                    </Container>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <Divider mt="1rem" mb="1rem" />
            <Text textAlign="center" mb="1rem">
              <Link href="/watchlist">
                <b>
                  <u>GO TO WATCHLIST</u>
                </b>
              </Link>
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Heading id="headTop" mt="1rem">
        <Link
          textDecoration="none"
          textAlign="center"
          href="/"
          color="white"
          id="appHead"
          fontWeight="normal"
          transition="1s"
          _hover={{ color: "red" }}
          fontSize={["10vw", "3rem"]}
        >
          The Cinema Room
        </Link>
      </Heading>
      <Center>
        <Divider border="null" w="80%" mt="1rem" />
      </Center>
    </div>
  );
}

export default Header;
