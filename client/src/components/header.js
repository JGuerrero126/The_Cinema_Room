import React, { useEffect, useState } from "react";
import { Center, Divider, FormLabel, Input } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { BsFillCameraReelsFill as CameraIcon } from "react-icons/bs";

function Header({ currentPage, handlePageChange }) {
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  useEffect(() => {
    console.log(value);
  });

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      console.log("ENTER WAS PRESSED!!!");
    }
  };

  useEffect(() => {
    console.log(currentPage);
  });

  return (
    <div>
      {currentPage === "Date" ? (
        <Center mt="2rem">
          <FormLabel fontSize="1.5rem">Input Date</FormLabel>
          <Input
            w="65%"
            h="2rem"
            ml="1rem"
            mr="1rem"
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            type="date"
          />
          <CameraIcon size="30" onClick={() => handlePageChange("Movie")} />
        </Center>
      ) : (
        <Center mt="2rem">
          <FormLabel fontSize="1.5rem">Input Movie</FormLabel>
          <Input
            w="65%"
            h="2rem"
            ml="1rem"
            mr="1rem"
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            type="search"
          />
          <CalendarIcon
            w="2rem"
            h="2rem"
            mr="0.5rem"
            onClick={() => handlePageChange("Date")}
          />
        </Center>
      )}
      <Divider border="null" w="80%" mt="1rem" />
    </div>
  );
}

export default Header;
