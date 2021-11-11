import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectDeconfinementData } from "../../store/charts";

const DeathChart = () => {
    const deconfinement = useSelector(selectDeconfinementData);
    if (!deconfinement) return null;
    return (
        <Chart
            height='500px'
            type="area"
            options={{
                responsive: [{
                    breakpoint: 1000, options: {
                        chart: {
                            id: "Cases",
                            toolbar: {
                                show: false
                            }
                        },
                    }
                }],
                title: { text: 'Registered covid deaths in France', align: 'center' },
                dataLabels: { enabled: false },
                chart: {
                    id: "Deaths",
                },
                xaxis: {
                    categories: deconfinement.dc?.dates,

                },
                theme: {
                    mode: 'light',
                    monochrome: {
                        enabled: true,
                        color: '#444444',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                }
            }}
            series={[
                {
                    name: "deaths",
                    data: deconfinement.dc?.values
                },
            ]}
        />
    )
}

export default React.memo(DeathChart);