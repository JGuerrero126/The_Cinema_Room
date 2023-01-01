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
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { urlPrefix } from "../utils/constants";
// import { useNavigate } from "react-router-dom";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [topMovies, setTopMovies] = useState(null);
  const [history, setHistory] = useState(null);

  function getTopMovies() {
    axios({
      method: "GET",
      url: urlPrefix + "/top-movies/",
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setTopMovies(res.results);
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
  }
  function getMovieHistory() {
    var movieHistory = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(movieHistory);
    console.log(movieHistory);
  }

  const [search, setSearch] = useState("");
  const handleChange = (event) => setSearch(event.target.value);

  const [radio, setRadio] = React.useState("1");

  const changeRoute = (word) => {
    // let path = `/movie/` + word;
    // navigate(path);

    window.location.href =
      "http://localhost:3000/movie/" + radio + "/" + search;
  };

  useEffect(() => {
    getTopMovies();
  }, []);

  useEffect(() => {
    getMovieHistory();
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
                {/* <Radio value="3">Year</Radio>
                <Radio value="4">Rating</Radio> */}
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
                <u>CURRENT TOP 20 MOVIES</u>
              </b>
            </Text>
            {topMovies
              ? topMovies.map((element) => {
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
                        <Text textAlign="left">{el.title}</Text>
                      </Link>
                    </Container>
                  );
                })}
              </div>
            ) : (
              ""
            )}
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
