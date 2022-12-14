import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Input, Button } from "@chakra-ui/react";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
import {
  Text,
  Link,
  Image,
  Container,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import moment from "moment";

function Movies() {
  const url = window.location.href;
  const type = url.split("/").slice(-2).shift();
  const { search } = useParams();
  // create state to hold returned movie data
  const [searchedMovie, setSearchedMovie] = useState(null);
  // returned person data
  const [searchedPerson, setSearchedPerson] = useState(null);
  // api uses array so if search is more than one word, split by space and sort into array
  const keyword = search.split(" ");
  function searchMovie() {
    // api call to get movie data
    axios({
      method: "GET",
      url: urlPrefix + "/search/" + keyword,
    })
      .then((response) => {
        const res = response.data;
        setSearchedMovie(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function searchPerson() {
    // api call to get data on searched person
    axios({
      method: "GET",
      url: urlPrefix + "/person/" + keyword,
    })
      .then((response) => {
        const res = response.data;
        setSearchedPerson(res);
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
    // if type is movie then search by movie name
    if (type === "1") {
      searchMovie();
      // if type is person then search by person
    } else {
      searchPerson();
    }
  }, []);

  return (
    <div data-testid="movies-page">
      <SimpleGrid
        justify="center"
        spacing="1.5rem"
        minChildWidth="25rem"
        ml="1rem"
        mr="1rem"
      >
        {searchedMovie && searchedMovie.results.length > 0
          ? searchedMovie.results.map((element) => {
              return (
                <Container centerContent key={element.id} maxW="md">
                  <Link
                    href={"/movies/" + element.id}
                    color="white"
                    textDecoration="none"
                    fontFamily="Shindler"
                    fontSize="1.5rem"
                    transition="1s"
                    _hover={{ color: "silver" }}
                  >
                    <Text>
                      <b>
                        <u>{element.title}</u>
                      </b>
                    </Text>
                    <Center mt="2rem">
                      <Image
                        border="1rem groove black"
                        boxShadow="0rem 0rem 3rem lightyellow"
                        _hover={{ boxShadow: "none", filter: "saturate(0%)" }}
                        transition="3s"
                        src={
                          `https://image.tmdb.org/t/p/w500` +
                          element.poster_path
                        }
                        fallbackSrc="https://via.placeholder.com/325x500.png"
                      />
                    </Center>
                    <Text>
                      Rating:
                      <br />
                      <b>{element.vote_average}</b>
                    </Text>
                    <Text textAlign="center">{element.overview}</Text>
                    <Text>{moment(element.release_date).format("YYYY")}</Text>
                  </Link>
                </Container>
              );
            })
          : []}
        {searchedPerson && searchedPerson.results.length > 0 ? (
          searchedPerson.results.map((element) => {
            return (
              <Container centerContent key={element.id} maxW="md">
                <Link
                  href={"/crew/" + element.id}
                  color="white"
                  textDecoration="none"
                  fontFamily="Shindler"
                  fontSize="1.5rem"
                  transition="1s"
                  _hover={{ color: "silver" }}
                >
                  <Text>
                    <b>
                      <u>{element.name}</u>
                    </b>
                  </Text>
                  <Center mt="2rem">
                    <Image
                      border="1rem groove black"
                      boxShadow="0rem 0rem 3rem lightyellow"
                      _hover={{ boxShadow: "none", filter: "saturate(0%)" }}
                      transition="3s"
                      src={
                        `https://image.tmdb.org/t/p/w500` + element.profile_path
                      }
                      fallbackSrc="https://via.placeholder.com/325x500.png"
                    />
                  </Center>
                  <Text>Known For {element.known_for_department}</Text>
                </Link>
              </Container>
            );
          })
        ) : (
          <Text
            color="white"
            fontFamily="Shindler"
            fontSize="1.5rem"
            transition="1s"
            _hover={{ color: "silver" }}
          >
            {" "}
            Sorry we couldn't find any results. Please try again.
          </Text>
        )}
      </SimpleGrid>
    </div>
  );
}

export default Movies;
