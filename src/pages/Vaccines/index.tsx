import { Typography } from "@mui/material";
import Vaccine from "../../components/Vaccine";

const Vaccines = () => {
  return (
    <>
      <Typography component="h1" variant="h2" mt={4}>Your vaccine</Typography>
      <Typography component="p" variant="subtitle1">To protect the people you have met, please do not lie.</Typography>
      <Vaccine />
    </>
  );
};

export default Vaccines;