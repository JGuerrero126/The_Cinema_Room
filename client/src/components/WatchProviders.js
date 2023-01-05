import React, { useEffect, useState } from "react";
import { Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../utils/constants";

function WatchProvider({ movie, region }) {
  const [watchProviders, setWatchProviders] = useState(null);

  function getWatchProviders(target) {
    axios({
      method: "POST",
      url: urlPrefix + "/watch-providers/",
      data: { movie_id: target },
    }).then((res) => {
      console.log(res.data.results);
      setWatchProviders(res.data.results);
    });
  }
  useEffect(() => {
    getWatchProviders(movie);
  }, [region]);
  return (
    <div>
      {watchProviders !== null && watchProviders[region] ? (
        <div>
          <Link isExternal href={watchProviders[region].link}>
            <Text>Link To Watch Providers</Text>
          </Link>
        </div>
      ) : (
        <Text>Watch providers Not found</Text>
      )}
    </div>
  );
}

export default WatchProvider;
