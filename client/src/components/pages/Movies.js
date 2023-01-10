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
  // returned year data
  const [searchedYear, setSearchedYear] = useState(null);
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
        console.log(res);
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
        console.log(res);
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

  function searchYear() {
    // api call to get data on searched person
    axios({
      method: "GET",
      // params: {
      //   primary_release_year: keyword,
      //   sort_by: sortBy,
      // },
      url: urlPrefix + "/year/" + keyword,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setSearchedYear(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  // function changeSort() {
  //   console.log(type)
  //   console.log(sortBy)
  // }
  useEffect(() => {
    switch (type) {
      case "1":
        searchMovie();
        break;
      case "2":
        searchPerson();
        break;
      case "3":
        searchYear();
        break;
      default:
        console.log("there is an error determining type");
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
                    <Text fontSize="2rem">
                      <b>
                        <u>{element.title}</u>
                      </b>
                    </Text>
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
        {searchedPerson && searchedPerson.results.length > 0
          ? searchedPerson.results.map((element) => {
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
                    <Center mt="2rem">
                      <Image
                        border="1rem groove black"
                        boxShadow="0rem 0rem 3rem lightyellow"
                        _hover={{ boxShadow: "none", filter: "saturate(0%)" }}
                        transition="3s"
                        src={
                          `https://image.tmdb.org/t/p/w500` +
                          element.profile_path
                        }
                        fallbackSrc="https://via.placeholder.com/325x500.png"
                      />
                    </Center>
                    <Text fontSize="2rem">
                      <b>
                        <u>{element.name}</u>
                      </b>
                    </Text>
                    <Text>Known For {element.known_for_department}</Text>
                  </Link>
                </Container>
              );
            })
          : []}
        {searchedYear && searchedYear.results.length > 0
          ? searchedYear.results.map((element) => {
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
                    </Center>{" "}
                    <Text fontSize="2rem">
                      <b>
                        <u>{element.title}</u>
                      </b>
                    </Text>
                    <Text>Released: {element.release_date}</Text>
                  </Link>
                </Container>
              );
            })
          : []}
      </SimpleGrid>
    </div>
  );
}

export default Movies;
