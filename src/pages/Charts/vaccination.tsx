import React from "react";
import Chart from "react-apexcharts";
import { chartsApi } from "../../store/api/charts";

const VaccinationChart = () => {
  const { data: vaccines } = chartsApi.useGetVaccineDataQuery(null);

  if (!vaccines) {
    return null;
  }

  return (
    <Chart
      height="500px"
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
        title: { text: "Vaccination in France", align: "center" },
        chart: {
          id: "Vaccines injections",
        },
        xaxis: {
          categories: vaccines.n_dose1.dates,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
      }}
      series={[
        {
          name: "first injection",
          data: vaccines.n_dose1.values,
        },
        {
          name: "second injection",
          data: vaccines.n_complet.values,
        },
        {
          name: "third injection",
          data: vaccines.n_dose3.values,
        },
      ]}
    />
  );
};

export default React.memo(VaccinationChart);
