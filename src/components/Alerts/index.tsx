import { Alert, AlertColor, Stack } from "@mui/material"
import React, { useCallback, useState } from "react"

interface IAlert {
    id: string;
    content: string;
    severity: AlertColor;
    canClose: boolean;
}

const Alerts = () => {
    const [alerts, setAlerts] = useState<IAlert[]>([
        {
            id: 'zqmziuf',
            content: 'You may have forgotten to share your position. Ensure it is active to stay safe and protect people around you.',
            severity: 'warning',
            canClose: true
        },
        {
            id: 'zoeufee',
            content: "You are considered as contact case since November 10, 2021. In order to ensure your safety and that of your loved ones, get tested quickly and don't forget the barrier gestures.",
            severity: 'error',
            canClose: false
        }
    ])

    const handleAlertClose = useCallback((alertId) => setAlerts((a) => a.filter((b) => b.id !== alertId)), [setAlerts])

    return (
        <Stack sx={{ width: '100%', marginTop: 3 }} spacing={2}>
            {alerts.map((a) => {
                if (a.canClose) return <Alert onClose={() => { handleAlertClose(a.id) }} severity={a.severity}>{a.content}</Alert>
                return <Alert severity={a.severity}>{a.content}</Alert>
            })}
        </Stack>
    )
}

export default React.memo(Alerts)