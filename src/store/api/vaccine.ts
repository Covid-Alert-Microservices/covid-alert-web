import { api } from ".";

function serviceUrl(path: string): string {
  return `${process.env.REACT_APP_VACCINE_MICROSERVICE}${path}`;
}

export interface Vaccine {
  disease: string;
  vaccine: string;
  vaccineMedicinalProduct: string;
  manufacturer: string;
  doseNumber: number;
  doseNumberMax: number;
  vaccinationDate: number;
  memberState: string;
  certificateIssuer: string;
}

export const vaccineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVaccine: builder.query<Vaccine, null>({
      query: () => ({
        url: serviceUrl("/api/vaccine"),
      }),
    }),
    deleteVaccine: builder.mutation<null, null>({
      query: () => ({
        url: serviceUrl("/api/vaccine"),
        method: "DELETE",
      }),
    }),
    createVaccine: builder.mutation<Vaccine, Vaccine>({
      query: (vaccine) => ({
        url: serviceUrl("/api/vaccine"),
        method: "POST",
        body: vaccine,
      }),
    }),
    updateVaccine: builder.mutation<Vaccine, Vaccine>({
      query: (vaccine) => ({
        url: serviceUrl("/api/vaccine"),
        method: "PUT",
        body: vaccine,
      }),
    }),
  }),
});