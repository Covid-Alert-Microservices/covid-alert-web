import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectDeconfinementData } from "../../store/charts";

const ReanimationChart = () => {
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
                title: { text: 'Hospitalization & Reanimation status in France', align: 'center' },
                dataLabels: { enabled: false },
                chart: {
                    id: "HospRea",
                },
                xaxis: {
                    categories: deconfinement.rea?.dates,

                },
            }}
            series={[
                {
                    name: "reanimation",
                    data: deconfinement.rea?.values
                },
                {
                    name: "hospitalization",
                    data: deconfinement.hosp?.values
                },
            ]}
        />
    )
}

export default React.memo(ReanimationChart);