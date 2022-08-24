import React from "react";
import { useState } from "react";
import { Text, Heading, Link } from "@chakra-ui/react";
import axios from "axios";

function Home() {
  const [profileData, setProfileData] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
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
      <Heading fontSize="2rem">This is the Home Page.</Heading>
      <Text fontSize="2rem">This is the Home Page.</Text>
      <Link fontSize="1.5rem" href="/genres/test">
        Click Here to go the Genre Page.
      </Link>
      <p>Test call to db for "profile": </p>
      <button onClick={getData}>Click me</button>
      {profileData && (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
