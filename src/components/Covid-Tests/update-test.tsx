import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { covidTestApi, CovidTestData } from "../../store/api/covid-tests";

interface IProps {
    open: boolean;
    onClose: (props: any) => any;
    test: CovidTestData;
}

const UpdateTest = ({ open, onClose, test }: IProps) => {
    const [updateTest] = covidTestApi.useUpdateCovidTestMutation();

    const [openSnackbar, setOpenSnackbar] = useState(false);


    const [formState, setFormState] = React.useState({
        disease: test.disease,
        testType: test.testType,
        testResult: test.testResult,
        testDate: new Date(test.testDate).toLocaleDateString('fr-CA'),
        certificationAuthorityIdentifier: test.certificationAuthorityIdentifier,
        memberState: test.memberState,
        certificateIssuer: test.certificateIssuer,
    })

    const isUpdateButtonDisabled = !formState.disease || !formState.testType || !formState.testResult || !formState.testDate || !formState.certificationAuthorityIdentifier || !formState.memberState || !formState.certificateIssuer


    const onFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    }

    const handleUpdateConfirm = () => {
        if (!isUpdateButtonDisabled) {
            updateTest({ id: test.id, ...formState, testDate: new Date(formState.testDate).getTime(), testResult: formState.testResult.toUpperCase() })
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
                aria-labelledby="update-dialog-title"
                aria-describedby="update-dialog-description"
            >
                <DialogTitle id="update-dialog-title">
                    Update test
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="update-dialog-description">
                        Please enter your test informations.
                    </DialogContentText>
                    <Box component="form" sx={{ margin: 3, '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
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
                    <Button size='large' color='primary' variant="outlined" onClick={handleUpdateConfirm} disabled={isUpdateButtonDisabled}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default UpdateTest;