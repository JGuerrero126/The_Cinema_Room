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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";
import { urlPrefix } from "../utils/constants";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [topMovies, setTopMovies] = useState(null);

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
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getTopMovies();
  }, []);

  var i = 1;

  return (
    <div>
      <Button
        ref={btnRef}
        bg="black"
        border=".10rem solid white"
        onClick={onOpen}
        position="absolute"
        left="0"
        ml="2rem"
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
            <Input
              bg="snow"
              placeholder="Search For A Movie Here!"
              _placeholder={{ color: "inherit" }}
              textColor="black"
            />
            <Button mt="0.5rem" bg="black" border=".10rem solid white">
              Search
            </Button>
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
            <Text textAlign="center" mb="1rem">
              <b>
                <u>RECENTLY VIEWED MOVIES</u>
              </b>
            </Text>
            <Container key="0" mb="0.25rem" borderBottom="0.10rem solid snow">
              <Link href="" color="white" fontSize="1rem">
                <Text textAlign="left">Mad Max: Fury Road</Text>
              </Link>
            </Container>
            <Container key="0" mb="0.25rem" borderBottom="0.10rem solid snow">
              <Link href="" color="white" fontSize="1rem">
                <Text textAlign="left">Bullet Train</Text>
              </Link>
            </Container>
            <Container key="0" mb="0.25rem" borderBottom="0.10rem solid snow">
              <Link href="" color="white" fontSize="1rem">
                <Text textAlign="left">Bronson</Text>
              </Link>
            </Container>
            <Container key="0" mb="0.25rem" borderBottom="0.10rem solid snow">
              <Link href="" color="white" fontSize="1rem">
                <Text textAlign="left">RoboCop</Text>
              </Link>
            </Container>
            <Container key="0" mb="0.25rem" borderBottom="0.10rem solid snow">
              <Link href="" color="white" fontSize="1rem">
                <Text textAlign="left">Nacho Libre</Text>
              </Link>
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Heading id="headTop" mt="1rem">
        <Link
          textDecoration="none"
          href="/"
          color="white"
          id="appHead"
          fontWeight="normal"
          transition="1s"
          _hover={{ color: "red" }}
          fontSize="3rem"
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
