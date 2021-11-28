import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { covidTestApi } from "../../store/api/covid-tests";
import CovidTest from "./covid-test";

const CovidTestsList = () => {
  const { data: covidTests } = covidTestApi.useGetCovidTestsQuery(null);

  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [createTest] = covidTestApi.useCreateCovidTestMutation()

  const [formState, setFormState] = React.useState({
    disease: "COVID-19",
    testType: "",
    testResult: "",
    testDate: new Date().toLocaleDateString('fr-CA'),
    certificationAuthorityIdentifier: "",
    memberState: "",
    certificateIssuer: "",
  })

  const onFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  }

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateConfirm = () => {
    createTest({ ...formState, testDate: new Date(formState.testDate).getTime(), testResult: formState.testResult.toUpperCase() });
    handleCloseCreateDialog();
  }

  return (
    <>
      <Button variant='outlined' size='large' sx={{ my: 5 }} onClick={handleOpenCreateDialog}>Add a test</Button>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {covidTests && covidTests.map((covidTest) => (
          <CovidTest key={covidTest.id} covidTest={covidTest} />
        ))}
      </Grid>

      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
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
          <Box component="form" sx={{ margin: 3, '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            <TextField disabled id="disease" label="Disease" defaultValue="COVID-19" onChange={onFieldUpdate} value={formState.disease} />
            <TextField required id="testType" label="Test Type" onChange={onFieldUpdate} value={formState.testType} />
            <TextField required id="testResult" label="Test Result" onChange={onFieldUpdate} value={formState.testResult} />
            <TextField required id="testDate" label="Test Date" type="date" onChange={onFieldUpdate} value={formState.testDate} />
            <TextField required id="certificationAuthorityIdentifier" label="Certification Authority Identifier" onChange={onFieldUpdate} value={formState.certificationAuthorityIdentifier} />
            <TextField required id="memberState" label="Member State" onChange={onFieldUpdate} value={formState.memberState} />
            <TextField required id="certificateIssuer" label="Certificate Issuer" onChange={onFieldUpdate} value={formState.certificateIssuer} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size='small' color='error' onClick={handleCloseCreateDialog}>Cancel</Button>
          <Button variant="outlined" size='small' onClick={handleCreateConfirm}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(CovidTestsList);