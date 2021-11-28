import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { geolocationApi } from "../../../store/api/geolocation";

const DebugGeolocation = () => {
    const [sendPosition] = geolocationApi.useSendPositionMutation()

    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [timestamp, setTimestamp] = useState<Date | null>(null);

    const isSendButtonDisabled: boolean = !latitude || !longitude || !timestamp;

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => reason !== 'backdropClick' && setOpen(false);
    const handleSend = () => {
        const dto = { latitude: latitude!, longitude: longitude!, timestamp: timestamp!.getTime() };
        sendPosition(dto).then((res) => {
            if ("error" in res) console.error(res.error);
            else {
                setOpen(false);
                setOpenSnackbar(true);
            }
        })
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => { setOpenSnackbar(false) }}
                message="Geolocation sent"
            />
            <Button onClick={() => { setOpen(true); }} sx={{ mt: 4 }} >Debug geolocation</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Fake geolocation</DialogTitle>
                <DialogContent>
                    <Box component="form">
                        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                            <InputLabel id="lat-form">Latitude</InputLabel>
                            <Select
                                labelId="lat-form-label"
                                id="lat-form"
                                value={latitude}
                                onChange={(event) => { setLatitude(Number(event.target.value) || null); }}
                                input={<OutlinedInput label="Latitude" />}
                            >
                                <MenuItem value={43.63271334019341}>Polytech</MenuItem>
                                <MenuItem value={43.55466473551608}>Plage</MenuItem>
                                <MenuItem value={43.60847039613634}>Comédie</MenuItem>
                                <MenuItem value={43.608741129358236}>Polygone</MenuItem>
                                <MenuItem value={43.634566337506854}>Occitanie</MenuItem>
                                <MenuItem value={43.60774149000149}>Destination Tapas</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                            <InputLabel id="demo-dialog-select-label">Longitude</InputLabel>
                            <Select
                                labelId="lon-form-label"
                                id="lon-form"
                                value={longitude}
                                onChange={(event) => { setLongitude(Number(event.target.value) || null); }}
                                input={<OutlinedInput label="Longitude" />}
                            >
                                <MenuItem value={3.862621221428528}>Polytech</MenuItem>
                                <MenuItem value={4.020847815844458}>Plage</MenuItem>
                                <MenuItem value={3.879375647074107}>Comédie</MenuItem>
                                <MenuItem value={3.8835945097202096}>Polygone</MenuItem>
                                <MenuItem value={3.848463923326555}>Occitanie</MenuItem>
                                <MenuItem value={3.876664214573171}>Destination Tapas</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Timestamp"
                                    value={timestamp}
                                    onChange={(newValue) => { setTimestamp(newValue); }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend} disabled={isSendButtonDisabled}>Send</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DebugGeolocation;