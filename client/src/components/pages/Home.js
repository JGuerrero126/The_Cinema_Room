import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { IpynbRenderer } from "react-ipynb-renderer";
import ipynb from "../movie_data.ipynb";
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
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";

// export const Component = () => {
//   return <IpynbRenderer ipynb={ipynb} />;
// };

function Home() {
  // const navigate = useNavigate();
  // const changeRoute= (word) => {
  //   let path = `/movie/` + word;
  //   navigate(path);
  // }
  const [genrelist, setGenreList] = useState(null);
  const [topRated, setTopRated] = useState(null);
  // const [search, setSearch] = useState("");
  // const handleChange = (event) => setSearch(event.target.value);
  function getData() {
    axios({
      method: "GET",
      url: urlPrefix + "/genre-list-link/",
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setGenreList(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

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

  useEffect(() => {
    getData();
    getTopRated();
  }, []);

  useEffect(() => {
    document.getElementById("appHead").style.fontSize = "3rem";
  }, []);

  return (
    <div data-testid="home-page">
      <Heading
        mt="2rem"
        fontSize={["12vw", "3rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
        textDecoration="underline"
      >
        Select A Genre
      </Heading>
      <Flex mt="2rem" flexWrap="wrap" justify="center">
        {genrelist
          ? genrelist.map((element) => {
              return (
                <Box
                  key={element.id}
                  fontSize={["9vw", "2.5rem"]}
                  w="12rem"
                  h="6rem"
                >
                  <Link
                    color="white"
                    textDecoration="none"
                    transition="1s"
                    _hover={{ color: "red" }}
                    href={"/genres/" + element.id}
                    fontFamily="corleone"
                  >
                    <Text>{element.name}</Text>
                  </Link>
                </Box>
              );
            })
          : []}
      </Flex>
      <Heading
        mt="2rem"
        fontSize="3rem"
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
      >
        Data
      </Heading>
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
        textDecoration="underline"
      >
        Top Rated Movies Of All Time
      </Heading>
      <Flex mt="1rem" flexWrap="wrap" justify="center">
        {topRated
          ? topRated.map((el) => {
              if (topRated.indexOf(el) < 5)
                return (
                  <Container
                    centerContent
                    key={el.id}
                    mb="2rem"
                    maxWidth="18rem"
                  >
                    <Link href={"/movies/" + el.id}>
                      <Image
                        border="0.5rem groove #141414"
                        transition="1s"
                        _hover={{ borderColor: "gray" }}
                        src={`https://image.tmdb.org/t/p/w500` + el.poster_path}
                        fallbackSrc="https://via.placeholder.com/325x500.png"
                      />
                    </Link>
                  </Container>
                );
            })
          : []}
      </Flex>
      <Link
        mt="2rem"
        fontSize={["8vw", "2rem"]}
        fontWeight="normal"
        color="white"
        fontFamily="corleonedue"
        href="/toprated"
      >
        Click Here For Full Top Rated List
      </Link>
    </div>
  );
}

export default Home;
