import { Alert, Stack } from "@mui/material";
import React from "react";
import { alertsApi, IAlert } from "../../store/api/alerts";


const Alerts = () => {
    const { data: alerts } = alertsApi.useGetAlertsQuery(null);

    const [deleteAlert] = alertsApi.useDeleteAlertMutation();

    return (
        <Stack sx={{ width: '100%', marginTop: 3 }} spacing={2}>
            {alerts && alerts.map((a: IAlert) => {
                if (a.canClose) return <Alert key={a.id} onClose={() => { deleteAlert(a.id) }} onClick={a.onclick} severity={a.severity}>{a.content}</Alert>
                return <Alert key={a.id} severity={a.severity} onClick={a.onclick}>{a.content}</Alert>
            })}
        </Stack>
    )
}

export default Alerts;