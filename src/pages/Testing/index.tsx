import { Typography } from "@mui/material";
import CovidTestsList from "../../components/Covid-Tests";

const Testing = () => {
  return (
    <>
      <Typography component="h1" variant="h2" mt={4}>Your tests</Typography>
      <Typography component="p" variant="subtitle1">To protect the people you have met, please do not lie.</Typography>
      <CovidTestsList />
    </>
  )
}


export default Testing;