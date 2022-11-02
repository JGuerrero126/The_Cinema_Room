import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "@chakra-ui/react";
import { urlPrefix } from "../../utils/constants";
import { useParams } from "react-router";

function Movies() {
  const { movie } = useParams();
  // create state to hold returned movie data
  const [searchedMovie, setSearchedMovie] = useState(null);
  // create state for holding search input
  const [userInput, setUserInput] = useState("");
  const handleChange = (event) => setUserInput(event.target.value)
  
  function setKeywords() {
    var keyword = movie;
    if (userInput) {
      keyword = userInput;
    }
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


  return (
    <div>
      <Input value={userInput} onChange={handleChange} placeholder="Movie.." width="15rem" />
      <Button onClick={()=> {
        setKeywords(userInput);
      }}colorScheme="blue">Search</Button>
      {searchedMovie ? <div></div> : []}
    </div>
  );
}

export default Movies;