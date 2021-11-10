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

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<ArticleData[], null>({
      query: () => serviceUrl("/api/news"),
    }),
  }),
});
