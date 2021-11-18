import { Alert, Stack } from "@mui/material";
import React from "react";
import { alertsApi, IAlert } from "../../store/api/alerts";


// const defaultAlerts: IAlert[] = [
//     {
//         id: '11',
//         content: 'You may have forgotten to share your position. Ensure it is active to stay safe and protect people around you.',
//         severity: 'warning',
//         canClose: true,
//         onclick: (e) => console.log('warning')
//     },
//     {
//         id: '12',
//         content: "You are considered as contact case since November 10, 2021. In order to ensure your safety and that of your loved ones, get tested quickly and don't forget the barrier gestures.",
//         severity: 'error',
//         canClose: false,
//         onclick: (e) => console.log('error')
//     }
// ]

const Alerts = () => {
    const { data: alerts } = alertsApi.useGetAlertsQuery(null);

    return (
        <Stack sx={{ width: '100%', marginTop: 3 }} spacing={2}>
            {alerts && alerts.map((a: IAlert) => {
                if (a.canClose) return <Alert key={a.id} onClose={() => { console.log('close') }} onClick={a.onclick} severity={a.severity}>{a.content}</Alert>
                return <Alert key={a.id} severity={a.severity} onClick={a.onclick}>{a.content}</Alert>
            })}
        </Stack>
    )
}

export default React.memo(Alerts)