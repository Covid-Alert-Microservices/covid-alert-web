import { Typography } from "@mui/material";
import ArticlesList from "../../components/News";

const News = () => {
  return (
    <>
      <Typography component="h1" variant="h2" mt={4}>News</Typography>
      <Typography component="p" variant="subtitle1">Here is some information about covid-19. Covid-Alert is in no way responsible for the veracity of the content of the articles.</Typography>
      <ArticlesList />
    </>
  );
};

export default News;
