import { api } from ".";

function serviceUrl(path: string): string {
  return `${process.env.REACT_APP_COVIDTESTS_MICROSERVICE}${path}`;
}

export interface CovidTestData {
  id: number;
  disease: string;
  testType: string;
  testResult: string;
  testDate: number;
  certificationAuthorityIdentifier: string;
  memberState: string;
  certificateIssuer: string;
}

function compareCovidTestByDateDesc(
  firstCovidTest: CovidTestData,
  secondCovidTest: CovidTestData
): number {
  const dateOne = new Date(firstCovidTest.testDate);
  const dateTwo = new Date(secondCovidTest.testDate);
  if (dateOne === dateTwo) {
    return 0;
  }
  if (dateOne > dateTwo) {
    return -1;
  }
  return 1;
}

export const covidTestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCovidTests: builder.query<CovidTestData[], null>({
      query: () => ({
        url: serviceUrl("/api/covid-tests"),
      }),
      transformResponse: (data: CovidTestData[]) => data.sort(compareCovidTestByDateDesc),
      providesTags: ["CovidTests"],
    }),
    deleteCovidTest: builder.mutation<null, number>({
      query: (id) => ({
        url: serviceUrl("/api/covid-tests/" + id),
        method: "DELETE",
      }),
      invalidatesTags: ["CovidTests"],
    }),
    createCovidTest: builder.mutation<CovidTestData, Omit<CovidTestData, "id">>({
      query: (covidTest) => ({
        url: serviceUrl("/api/covid-tests"),
        method: "POST",
        body: covidTest,
      }),
      invalidatesTags: ["CovidTests"],
    }),
    updateCovidTest: builder.mutation<CovidTestData, CovidTestData>({
      query: (covidTest) => ({
        url: serviceUrl("/api/covid-tests/" + covidTest.id),
        method: "PUT",
        body: covidTest,
      }),
      invalidatesTags: ["CovidTests"],
    }),
  }),
});