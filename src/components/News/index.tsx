import { Grid } from "@mui/material";
import { newsApi } from "../../store/api/news";
import Article from "./article";

const ArticlesList = () => {
  const { data: articles } = newsApi.useGetNewsQuery(null);

  if (!articles) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: 3, marginBottom: 3 }}>
      {articles.map((article) => (
        <Article key={article.title} article={article} />
      ))}
    </Grid>
  );
};

export default ArticlesList;
