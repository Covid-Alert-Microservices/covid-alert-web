import { Typography } from "@mui/material";
import ArticlesList from "../../components/News";

const News = () => {
  return (
    <>
      <Typography component="h1" variant="h2" mt={4}>News</Typography>
      <Typography component="p" variant="subtitle1">Some description</Typography>
      <ArticlesList />
    </>
  );
};

export default News;
