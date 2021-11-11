import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectDeconfinementData } from "../../store/charts";

const CasesChart = () => {
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
                title: { text: 'Positive cases in France', align: 'center' },
                dataLabels: { enabled: false },
                chart: {
                    id: "Cases",
                },
                xaxis: {
                    categories: deconfinement.cas?.dates,
                },
            }}
            series={
                [
                    {
                        name: "avg potitive cases in a week",
                        data: deconfinement.cas?.values
                    },
                ]}
        />
    )
}

export default React.memo(CasesChart);