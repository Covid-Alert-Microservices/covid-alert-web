import { api } from ".";

interface IData {
  dates: string[];
  values: number[];
}

interface IRegionData {
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

interface IDeconfinementData {
  hosp: IData;
  adm_hosp: IData;
  rea: IData;
  adm_rea: IData;
  dc: IData;
  cas: IData;
  cas_spf: IData;
}

interface IVaccinesData {
  dates: string[];
  n_dose1: number[];
  n_cum_dose1: number[];
  n_dose1_moyenne7j: number[];
  n_dose3: number[];
  n_cum_dose3: number[];
  n_dose3_moyenne7j: number[];
  n_complet: number[];
  n_cum_complet: number[];
  n_complet_moyenne7j: number[];
}

type ITransformedVaccinesData = {
  [Property in keyof Omit<IVaccinesData, "dates">]: IData;
};

function rawGithub(path: string): string {
  return `https://raw.githubusercontent.com/${path}`;
}

export const chartsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRegionsData: build.query<Record<string, IRegionData>, null>({
      query: () =>
        rawGithub(
          "CovidTrackerFr/covidtracker-data/master/data/france/stats/incidence_departements.json"
        ),
      transformResponse: (data: {
        donnees_departements: Record<string, IRegionData>;
      }) => data.donnees_departements,
    }),
    getDeconfinementData: build.query<IDeconfinementData, null>({
      query: () =>
        rawGithub(
          "CovidTrackerFr/covidtracker-data/master/data/france/stats/objectif_deconfinement.json"
        ),
    }),
    getVaccineData: build.query<ITransformedVaccinesData, null>({
      query: () =>
        rawGithub(
          "rozierguillaume/vaccintracker/main/data/output/vacsi-fra.json"
        ),
      transformResponse: (data: IVaccinesData) => {
        const { dates, ...features } = data;
        return (Object.keys(features) as (keyof typeof features)[]).reduce(
          (acc, curr) => {
            acc[curr] = {
              dates,
              values: data[curr],
            };
            return acc;
          },
          {} as ITransformedVaccinesData
        );
      },
    }),
  }),
});
