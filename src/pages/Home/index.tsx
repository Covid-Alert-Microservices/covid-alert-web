import { Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <>
      <Typography component="h1" variant="h2" mt={4}>Covid Tracker</Typography>
      <Typography component="p" variant="subtitle1">Some description</Typography>
    </>
  );
};

export default React.memo(Home);
