import { api } from ".";

function serviceUrl(path: string): string {
  return `${process.env.REACT_APP_NEWS_MICROSERVICE}${path}`;
}

export interface ArticleData {
  title: string;
  summary: string;
  link: string;
  date: string;
}

function compareArticleByDateDesc(
  firstArticle: ArticleData,
  secondArticle: ArticleData
): number {
  const dateOne = new Date(firstArticle.date);
  const dateTwo = new Date(secondArticle.link);
  if (dateOne === dateTwo) {
    return 0;
  }
  if (dateOne < dateTwo) {
    return -1;
  }
  return 1;
}

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<ArticleData[], null>({
      query: () => serviceUrl("/api/news"),
      transformResponse: (data: ArticleData[]) =>
        data.sort(compareArticleByDateDesc),
    }),
  }),
});
