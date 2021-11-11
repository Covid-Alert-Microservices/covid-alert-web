import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

export interface IData {
  dates: string[];
  values: number[];
}

export interface IRegionData {
  incidence_cas: number;
  incidence_dc: number;
  incidence_dc_evol: number;
  incidence_evol: number;
  incidence_hosp: number;
  incidence_rea: number;
  lits_hosp: number;
  lits_hosp_evol: number;
  lits_rea: number;
  lits_rea_evol: number;
  population: number;
  saturation_rea: number;
  taux_positivite: number;
}

export interface ChartsData {
  fetched: boolean;
  adm_hosp?: IData;
  adm_rea?: IData;
  cas?: IData;
  dc?: IData;
  hosp?: IData;
  rea?: IData;
  n_dose1?: IData;
  n_complet?: IData;
  n_dose3?: IData;
  n_cum_complet?: IData;
  n_cum_dose1?: IData;
  n_cum_dose3?: IData;
  regions?: {[key: string]: IRegionData}
}

const initialState: ChartsData = {fetched: false};


const baseQuery = fetchBaseQuery({
  baseUrl: `https://raw.githubusercontent.com/`
});

export const chartsApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getRegionsData: builder.query<any, null>({query: () => ({ url: 'CovidTrackerFr/covidtracker-data/master/data/france/stats/incidence_departements.json' })}),
    getDeconfinementData: builder.query<any, null>({query: () => ({ url: 'CovidTrackerFr/covidtracker-data/master/data/france/stats/objectif_deconfinement.json' })}),
    getVaccineData: builder.query<any, null>({query: () => ({ url: 'rozierguillaume/vaccintracker/main/data/output/vacsi-fra.json' })}),
  })
});


export const fetchRegionData = createAsyncThunk(
  'charts/fetchRegionData',
  async () => {
    const response = await chartsApi.useGetRegionsDataQuery(null);
    return response.data;
  }
);

export const fetchDeconfinementData = createAsyncThunk(
  'charts/fetchDeconfinementData',
  async () => {
    const response = await chartsApi.useGetDeconfinementDataQuery(null);
    return response.data;
  }
);

export const fetchVaccineData = createAsyncThunk(
  'charts/fetchVaccineData',
  async () => {
    const response = await chartsApi.useGetVaccineDataQuery(null);
    return response.data;
  }
);



export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegionData.fulfilled, (state, action) => {
      if(action.payload && 'donnees_departements' in action.payload){
        return {...state, regions: action.payload['donnees_departements'], fetched: true};
      }
    })
    builder.addCase(fetchDeconfinementData.fulfilled, (state, action) => {
      if(action.payload){
        return {...state, ...action.payload, fetched: true};
      }
    })
    builder.addCase(fetchVaccineData.fulfilled, (state, action) => {
      if(action.payload){
        const {dates, ...rest} = action.payload;
        let object : any= {fetched: true};
        Object.keys(rest).forEach((key: string)=>{
          object[key] = {dates, values: rest[key]}
        })
        return {...state, ...object}
      }
    })
    builder.addCase(fetchRegionData.rejected, (state, err) => {
      console.log(err)
    })
  }
});

export const isGraphDataFetched = (state:RootState) => state.charts.fetched
export const selectRegionsData = (state:RootState) => state.charts.regions
export const selectVaccineData = (state:RootState) => {
  const {n_dose1, n_complet, n_cum_complet, n_dose3,n_cum_dose1,n_cum_dose3} =  state.charts
  return {n_dose1, n_dose2:n_complet, n_cum_dose2:n_cum_complet,n_dose3,n_cum_dose1,n_cum_dose3}
}
export const selectDeconfinementData = (state:RootState) => {
  const {adm_hosp, adm_rea, cas,dc,hosp,rea} =  state.charts
  return {adm_hosp, adm_rea, cas,dc,hosp,rea}
}