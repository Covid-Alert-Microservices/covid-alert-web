import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { covidTestApi, CovidTestData } from "../../store/api/covid-tests";

interface IProps {
    open: boolean;
    onClose: (props: any) => any;
    test: CovidTestData;
}

const UpdateTest = ({ open, onClose, test }: IProps) => {
    const [updateTest] = covidTestApi.useUpdateCovidTestMutation();

    const [formState, setFormState] = React.useState({
        disease: test.disease,
        testType: test.testType,
        testResult: test.testResult,
        testDate: new Date(test.testDate).toLocaleDateString('fr-CA'),
        certificationAuthorityIdentifier: test.certificationAuthorityIdentifier,
        memberState: test.memberState,
        certificateIssuer: test.certificateIssuer,
    })

    const onFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    }

    const handleUpdateConfirm = () => {
        updateTest({ id: test.id, ...formState, testDate: new Date(formState.testDate).getTime(), testResult: formState.testResult.toUpperCase() });
        onClose(true);
    }


    return (
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
                <Button size='small' color='error' onClick={onClose}>Cancel</Button>
                <Button variant="outlined" size='small' onClick={handleUpdateConfirm}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}


export default React.memo(UpdateTest);