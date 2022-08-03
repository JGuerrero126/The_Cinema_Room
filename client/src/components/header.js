import React from "react";
import { Center, Divider, FormLabel, Input, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { BsFillCameraReelsFill as CameraIcon } from "react-icons/bs";

function Header() {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  return (
    <div>
      <Center mt="4rem">
        <FormLabel fontSize="1.5rem">Input Date</FormLabel>
        <Input
          w="65%"
          h="2rem"
          ml="1rem"
          mr="1rem"
          placeholder="Date"
          value={value}
          onChange={handleChange}
        />
        <CalendarIcon w="2rem" h="2rem" mr="0.5rem" />
        <CameraIcon size="30" />
      </Center>
      <Divider border="null" w="80%" mt="1rem" />
    </div>
  );
}

export default Header;
