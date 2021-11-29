import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { covidTestApi } from "../../store/api/covid-tests";

interface IProps {
    open: boolean;
    onClose: (props: any) => any;
}

const CreateTest = ({ open, onClose }: IProps) => {
    const [createTest] = covidTestApi.useCreateCovidTestMutation()

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [formState, setFormState] = React.useState({
        disease: "COVID-19",
        testType: "",
        testResult: "",
        testDate: new Date().toLocaleDateString('fr-CA'),
        certificationAuthorityIdentifier: "",
        memberState: "",
        certificateIssuer: "",
    })

    const isCreateButtonDisabled = !formState.disease || !formState.testType || !formState.testResult || !formState.testDate || !formState.certificationAuthorityIdentifier || !formState.memberState || !formState.certificateIssuer

    const onFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    }

    const handleCreateConfirm = () => {
        if (!isCreateButtonDisabled) {
            createTest({ ...formState, testDate: new Date(formState.testDate).getTime(), testResult: formState.testResult.toUpperCase() })
                .then((res) => {
                    if ("error" in res) {
                        console.log(res.error)
                        setOpenSnackbar(true);
                    }
                    else {
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
                    New test
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="create-dialog-description">
                        Please enter your test informations.
                    </DialogContentText>
                    <Box component="form" sx={{ margin: 3, '& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '25ch' } }}>
                        <TextField disabled id="disease" label="Disease" onChange={onFieldUpdate} value={formState.disease} />
                        <TextField required id="testType" label="Test Type" onChange={onFieldUpdate} value={formState.testType} />
                        <TextField required id="testResult" label="Test Result" onChange={onFieldUpdate} value={formState.testResult} />
                        <TextField required id="testDate" label="Test Date" type="date" onChange={onFieldUpdate} value={formState.testDate} />
                        <TextField required id="certificationAuthorityIdentifier" label="Certification Authority Identifier" onChange={onFieldUpdate} value={formState.certificationAuthorityIdentifier} />
                        <TextField required id="memberState" label="Member State" onChange={onFieldUpdate} value={formState.memberState} />
                        <TextField required id="certificateIssuer" label="Certificate Issuer" onChange={onFieldUpdate} value={formState.certificateIssuer} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button size='large' sx={{ color: 'text.disabled' }} onClick={onClose}>Cancel</Button>
                    <Button size='large' color='primary' variant="outlined" onClick={handleCreateConfirm} disabled={isCreateButtonDisabled}>Create test</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default CreateTest;