import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { vaccineApi } from "../../store/api/vaccine";

interface IProps {
    open: boolean;
    onClose: (props: any) => any;
}

const initialState = {
    disease: "COVID-19",
    vaccine: "",
    vaccineMedicinalProduct: "",
    manufacturer: "",
    doseNumber: 0,
    doseNumberMax: 3,
    vaccinationDate: new Date().toLocaleDateString('fr-CA'),
    memberState: "",
    certificateIssuer: "",
}

const CreateVaccine = ({ open, onClose }: IProps) => {
    const [createVaccine] = vaccineApi.useCreateVaccineMutation();

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [formState, setFormState] = useState(initialState)

    const isCreateButtonDisabled = !formState.disease || !formState.vaccine || !formState.vaccineMedicinalProduct || !formState.manufacturer || formState.doseNumber < 0 || formState.doseNumberMax < 0 || formState.doseNumberMax < formState.doseNumber || !formState.vaccinationDate || !formState.memberState || !formState.certificateIssuer

    const onFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    }

    const handleCreateConfirm = () => {
        if (!isCreateButtonDisabled) {
            createVaccine({ ...formState, vaccinationDate: new Date(formState.vaccinationDate).getTime() })
                .then((res) => {
                    if ("error" in res) {
                        console.log(res.error)
                        setOpenSnackbar(true);
                    }
                    else {
                        setFormState(initialState);
                        onClose(true);
                    }
                })
        }
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
                message="Sorry, something went wrong"
            />
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="create-dialog-title"
                aria-describedby="create-dialog-description"
            >
                <DialogTitle id="create-dialog-title">
                    New vaccine
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="create-dialog-description">
                        Please enter your vaccine informations.
                    </DialogContentText>
                    <Box component="form" sx={{ margin: 3, '& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '25ch' } }}>
                        <TextField disabled id="disease" label="Disease" onChange={onFieldUpdate} value={formState.disease} />
                        <TextField required id="vaccine" label="Vaccine" onChange={onFieldUpdate} value={formState.vaccine} />
                        <TextField required id="vaccineMedicinalProduct" label="Vaccine Medicinal Product" onChange={onFieldUpdate} value={formState.vaccineMedicinalProduct} />
                        <TextField required id="manufacturer" label="Manufacturer" onChange={onFieldUpdate} value={formState.manufacturer} />
                        <TextField required id="doseNumber" label="Dose Number" type="number" onChange={onFieldUpdate} value={formState.doseNumber} />
                        <TextField required id="doseNumberMax" label="Dose Number Max" type="number" onChange={onFieldUpdate} value={formState.doseNumberMax} />
                        <TextField required id="vaccinationDate" label="Vaccination Date" type="date" onChange={onFieldUpdate} value={formState.vaccinationDate} />
                        <TextField required id="memberState" label="Member State" onChange={onFieldUpdate} value={formState.memberState} />
                        <TextField required id="certificateIssuer" label="Certificate Issuer" onChange={onFieldUpdate} value={formState.certificateIssuer} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button size='large' sx={{ color: 'text.disabled' }} onClick={onClose}>Cancel</Button>
                    <Button size='large' color='primary' variant="outlined" onClick={handleCreateConfirm} disabled={isCreateButtonDisabled}>Create vaccine</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default CreateVaccine;