import { Card, FormControlLabel, Switch, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPositionEnabled, setPositionState } from "../../../store/api/position";

const AccountForm = () => {
    const dispatch = useDispatch();
    const active = useSelector(isPositionEnabled);
    const toggle = useCallback(() => dispatch(setPositionState({ enable: !active })), [active, dispatch])

    const label = useMemo(() => {
        if (active) return <Typography sx={{ color: 'primary.main' }}>I trust CovidAlert and agree to the terms and conditions of position tracking.</Typography>
        return <Typography sx={{ color: 'error.main' }}>I do not consent to share my position for the moment.</Typography>
    }, [active])

    return (
        <Card variant="outlined" sx={{ p: 3, borderColor: active ? 'primary.main' : 'error.main' }}>
            <FormControlLabel control={<Switch checked={active} onChange={toggle} />} label={label} />
        </Card>
    )
}

export default AccountForm;