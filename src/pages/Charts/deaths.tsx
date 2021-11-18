import React from "react";
import Chart from "react-apexcharts";
import { chartsApi } from "../../store/api/charts";

const DeathChart = () => {
  const { data: deconfinement } = chartsApi.useGetDeconfinementDataQuery(null);

  if (!deconfinement) {
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
        title: { text: "Registered covid deaths in France", align: "center" },
        dataLabels: { enabled: false },
        chart: {
          id: "Deaths",
        },
        xaxis: {
          categories: deconfinement.dc.dates,
        },
        theme: {
          mode: "light",
          monochrome: {
            enabled: true,
            color: "#444444",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
      }}
      series={[
        {
          name: "deaths",
          data: deconfinement.dc.values,
        },
      ]}
    />
  );
};

export default React.memo(DeathChart);
