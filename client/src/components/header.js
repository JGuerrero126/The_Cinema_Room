import React, { useEffect, useState } from "react";
import {
  Center,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  // Input,
  Select,
  // Spacer,
} from "@chakra-ui/react";
// import { CalendarIcon } from "@chakra-ui/icons";
// import { BsFillCameraReelsFill as CameraIcon } from "react-icons/bs";
import Moviepage from "./pages/Moviepage";

function Header({ currentPage, handlePageChange }) {
  const [genre, setGenre] = useState("");
  const handleChange = (event) => setGenre(event.target.value);

  useEffect(() => {
    console.log(genre);
  });

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      console.log("ENTER WAS PRESSED!!!");
    }
  };

  // useEffect(() => {
  //   console.log(currentPage);
  // });

  return (
    <div>
      <Heading>TOP MOVIES BY GENRE</Heading>
      <FormControl>
        <FormLabel fontSize="1.5rem" textAlign="center">
          Select Genre:
        </FormLabel>
        <Center>
          <Select
            fontSize="1.5rem"
            h="2rem"
            borderRadius="0.25rem"
            value={genre}
            onChange={handleChange}
            onKeyDown={handleEnter}
            position=""
            sx={{ width: "65%" }}
          >
            <option>Horror</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Romance</option>
            <option>Documentation</option>
            <option>Action</option>
            <option>Thriller</option>
            <option>European</option>
            <option>Crime</option>
            <option>War</option>
            <option>Music</option>
            <option>Fantasy</option>
            <option>Family</option>
            <option>Sci-Fi</option>
            <option>Animation</option>
            <option>Western</option>
          </Select>
        </Center>
      </FormControl>
      <Divider border="null" w="80%" mt="1rem" />
      <Moviepage genre={genre} />
    </div>
  );
}

export default Header;
