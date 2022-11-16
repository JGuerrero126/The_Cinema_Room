import React, { useRef } from "react";
import {
  Button,
  Center,
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      <Button ref={btnRef} bg="red" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Text>Yo</Text>
            <Button>Test</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
