import { AlertColor } from "@mui/material";
import { MouseEventHandler } from "react";
import { api } from ".";

function serviceUrl(path: string): string {
  return `${process.env.REACT_APP_ALERTS_MICROSERVICE}${path}`;
}

export interface AlertData {
  id: number;
  message: string;
}

export interface IAlert {
    id: string;
    content: string;
    severity: AlertColor;
    canClose: boolean;
    onclick?: MouseEventHandler<HTMLDivElement>
}

export const alertsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlerts: builder.query<IAlert[], null>({
      query: () => serviceUrl("/api"),
      transformResponse: (data: AlertData[]) : IAlert[] => data.map(({id, message}) => ({id: id.toString(), content: message, severity: 'error', canClose: true } as IAlert)),
      providesTags: ["Alerts"]
    }),
    deleteAlert: builder.mutation<null, string>({
      query: (id) => ({
        url: serviceUrl("/api/" + id),
        method: "DELETE",
      }),
      invalidatesTags: ['Alerts']
    }),
  }),
});
