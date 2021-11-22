import { api } from ".";

function serviceUrl(path: string): string {
  return `${process.env.REACT_APP_COMPASS_MICROSERVICE}${path}`;
}

export interface SendGeolocationDto {
  timestamp: number;
  latitude: number;
  longitude: number;
}

export const geolocationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendPosition: builder.mutation<any, SendGeolocationDto>({
      query: dto => ({
        url: serviceUrl("/api"),
        method: 'POST',
        body: dto,
      }),
    }),
  }),
});
