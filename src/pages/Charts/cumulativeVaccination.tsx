import React from "react";
import Chart from "react-apexcharts";
import { chartsApi } from "../../store/api/charts";

const CumulativeVaccinationChart = () => {
  const { data: vaccines } = chartsApi.useGetVaccineDataQuery(null);

  if (!vaccines) {
    return null;
  }

  return (
    <Chart
      height="500px"
      type="area"
      options={{
        responsive: [
          {
            breakpoint: 1000,
            options: {
              chart: {
                id: "Cases",
                toolbar: {
                  show: false,
                },
              },
            },
          },
        ],
        title: {
          text: "Cumulative complete vaccination in France",
          align: "center",
        },
        dataLabels: { enabled: false },
        chart: {
          id: "Vaccines cumulative",
        },
        xaxis: {
          categories: vaccines.n_cum_complet.dates,
        },
      }}
      series={[
        {
          name: "complete vaccination",
          data: vaccines.n_cum_complet.values,
        },
        {
          name: "recall vaccination",
          data: vaccines.n_cum_dose3.values,
        },
      ]}
    />
  );
};

export default React.memo(CumulativeVaccinationChart);
