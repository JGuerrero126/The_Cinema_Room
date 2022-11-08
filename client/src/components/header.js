import React, { useRef } from "react";
import {
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
  Heading,
  Input,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const inputField = useRef();

  return (
    <div>
      {/* <Stack spacing={4} direction="row">
        <Button ref={btnRef} colorScheme="black" onClick={onOpen}>
          Open
        </Button>
        <Drawer
          trapFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          initialFocusRef={inputField}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input ref={inputField} placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Stack> */}
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
