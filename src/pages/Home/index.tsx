import { Typography } from "@mui/material";
import React from "react";
import Guidelines from "../../components/Guidelines";

const Home = () => {
  return (
    <>
      <Typography component="h1" variant="h2" mt={4}>Covid Tracker</Typography>
      <Typography component="p" variant="subtitle1">Welcome to you, stay connected and follow the latest news about covid-19 with this collaborative app. To protect yourself and your friends, make sure you enable geolocation in your web browser.</Typography>
      <Guidelines />
      <Typography mt={4} mb={4}>The stored data is anonymized and will never be sold. We believe that all together we can act ❤️</Typography>
    </>
  );
};

export default React.memo(Home);
