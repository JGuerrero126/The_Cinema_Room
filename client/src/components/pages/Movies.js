import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@chakra-ui/react";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";
import { Text, Link, Image, Container, Center} from "@chakra-ui/react";
import moment from "moment";

function Movies() {
  const { search } = useParams();
  // create state to hold returned movie data
  const [searchedMovie, setSearchedMovie] = useState(null);
  // create state for holding search input
  const [userInput, setUserInput] = useState("");
  const handleChange = (event) => setUserInput(event.target.value);
  function setKeywords() {
    var keyword = search.split(" ").concat("%20");
    if (userInput) {
      keyword = userInput.split(" ").concat("%20");
    }
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

  useEffect(() => {
    setKeywords();
  }, []);

  return (
    <div>
      <Input
        value={userInput}
        onChange={handleChange}
        placeholder="Movie.."
        width="15rem"
      />
      <Button
        onClick={() => {
          setKeywords(userInput);
        }}
        colorScheme="blue"
      >
        Search
      </Button>
      {searchedMovie
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
                        `https://image.tmdb.org/t/p/w500` + element.poster_path
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
    </div>
  );
}

export default Movies;
