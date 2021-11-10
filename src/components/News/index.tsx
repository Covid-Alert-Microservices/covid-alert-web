import { newsApi } from "../../store/api/news";
import Article from "./article";

const ArticlesList = () => {
  const { data: articles } = newsApi.useGetNewsQuery(null);

  if (!articles) {
    return null;
  }

  return (
    <div>
      {articles.map((article) => (
        <Article key={article.title} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
