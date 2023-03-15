import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Input, Button } from "@chakra-ui/react";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Text,
  Link,
  Image,
  Container,
  Center,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import moment from "moment";

function Movies() {
  const url = window.location.href;
  const type = url.split("/").slice(-3).shift();
  const sortBy = url.split("/").slice(-2).shift();
  const { search } = useParams();
  // create state to hold returned movie data
  const [searchedMovie, setSearchedMovie] = useState("");
  // returned person data
  const [searchedPerson, setSearchedPerson] = useState("");
  // returned year data
  const [searchedYear, setSearchedYear] = useState("");
  // api uses array so if search is more than one word, split by space and sort into array
  const keyword = search.split(" ");
  const [pageNum, setPageNum] = useState(1);;

  function addPage(){
    setPageNum(pageNum + 1);
  }

  function subPage(){
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  }

  function checkSearchData(data) {
    if (data.length < 1) {
      subPage();
    }
  }

  function sortDataBy(data, property) {  
    return data.sort((a, b) => {
      return a[property] >= b[property]
        ? -1
        : 1
    })
  }
  function sortDataByTime(data, property) {  
    return data.sort((a, b) => {
      return moment(a[property],"YYYY-M-D").valueOf() >= moment(b[property], "YYYY-M-D").valueOf()
        ? -1
        : 1
    })
  }

  function searchMovie() {
    // api call to get movie data
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/search/movie?api_key=e3da5d8280ad89306acf3ea4061ead8c&language=en-US&page=" + pageNum  + "&query=" +
        search,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setSearchedMovie(res);
        console.log(pageNum);
        console.log(sortBy)
        sortDataBy(res.results, sortBy.split(".")[0]);
        sortDataByTime(res.results, sortBy);
        checkSearchData(res.results);
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
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/discover/movie?api_key=e3da5d8280ad89306acf3ea4061ead8c&region=US&sort_by=" +
        sortBy +
        "&include_adult=false&include_video=false&page=" + pageNum + "&with_watch_monetization_types=flatrate&primary_release_year=" +
        search,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        console.log(sortBy)
        setSearchedYear(res);
        console.log(pageNum);
        checkSearchData(res.results);
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
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/search/person?api_key=e3da5d8280ad89306acf3ea4061ead8c&language=en-US&page=" + pageNum  + "&query=" +
        keyword,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setSearchedPerson(res);
        checkSearchData(res.results);
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
  }, [pageNum]);

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
                <Container centerContent key={element.id} maxW="md" pb="3rem">
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
                        fallbackSrc="https://via.placeholder.com/325x500.png?text=No+Image+Provided"
                      />
                    </Center>
                    <Text fontSize="2rem">
                      <b>
                        <u>{element.title}</u>
                      </b>
                    </Text>
                    <Text>
                      Popularity:
                      <br />
                      <b>{element.popularity}</b>
                    </Text>
                    <Text>
                      Rating:
                      <br />
                      <b>{element.vote_average}</b>
                    </Text>
                    <Text textAlign="center">{element.overview}</Text>
                    <Text>{moment(element.release_date).format("MM/DD/YYYY")}</Text>
                  </Link>
                </Container>
              );
            })
          : []}
        {searchedPerson && searchedPerson.results.length > 0
          ? searchedPerson.results.map((element) => {
              return (
                <Container centerContent key={element.id} maxW="md" pb="3rem">
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
                        fallbackSrc="https://via.placeholder.com/325x500.png?text=No+Image+Provided"
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
                <Container centerContent key={element.id} maxW="md" pb="3rem">
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
                        fallbackSrc="https://via.placeholder.com/325x500.png?text=No+Image+Provided"
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
      <Container pb="1rem" justifyContent= "center">
        <Flex direction="row" justifyContent="space-around">
          <ArrowLeftIcon color="white" onClick={subPage}></ArrowLeftIcon>
          <Text color="white">Page {pageNum}</Text>
          <ArrowRightIcon color="white" onClick={addPage}></ArrowRightIcon>
        </Flex>
      </Container>
    </div>
  );
}

export default Movies;
