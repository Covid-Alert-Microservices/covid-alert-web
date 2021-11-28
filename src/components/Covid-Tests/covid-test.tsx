import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { CovidTestData } from "../../store/api/covid-tests";
import { covidTestApi } from "../../store/api/covid-tests";

const CovidTest = (props: { covidTest: CovidTestData }) => {

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteTest] = covidTestApi.useDeleteCovidTestMutation();

  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [updateTest] = covidTestApi.useUpdateCovidTestMutation();

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const handleDeleteConfirm = () => {
    deleteTest(props.covidTest.id);
    handleCloseDeleteAlert();
  }

  const [formState, setFormState] = React.useState({
    disease: props.covidTest.disease,
    testType: props.covidTest.testType,
    testResult: props.covidTest.testResult,
    testDate: new Date(props.covidTest.testDate).toLocaleDateString('fr-CA'),
    certificationAuthorityIdentifier: props.covidTest.certificationAuthorityIdentifier,
    memberState: props.covidTest.memberState,
    certificateIssuer: props.covidTest.certificateIssuer,
  })

  const onFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  }

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateConfirm = () => {
    updateTest({ id: props.covidTest.id, ...formState, testDate: new Date(formState.testDate).getTime(), testResult: formState.testResult.toUpperCase() });
    handleCloseUpdateDialog();
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ mb: 5, textAlign: 'center' }}>
              {props.covidTest.disease}
              <br />
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Test type :
              </Typography>
              <Typography variant="body2">
                {props.covidTest.testType}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Test result :
              </Typography>
              <Typography variant="body2">
                {props.covidTest.testResult}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Test date :
              </Typography>
              <Typography variant="body2">
                {new Date(props.covidTest.testDate).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Certification authority identifier :
              </Typography>
              <Typography variant="body2">
                {props.covidTest.certificationAuthorityIdentifier}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Member state :
              </Typography>
              <Typography variant="body2">
                {props.covidTest.memberState}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Certificate issuer :
              </Typography>
              <Typography variant="body2">
                {props.covidTest.certificateIssuer}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={2} sx={{ mx: 'auto' }}>
              <Button variant='outlined' size='small' onClick={handleOpenUpdateDialog}>Edit</Button>
              <Button size='small' color='error' onClick={handleOpenDeleteAlert}>Delete</Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid>

      <Dialog
        open={openDeleteAlert}
        onClose={handleCloseDeleteAlert}
        aria-labelledby="delete-alert-dialog-title"
        aria-describedby="delete-alert-dialog-description"
      >
        <DialogTitle id="delete-alert-dialog-title">
          Are you sure you want to delete this test ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-alert-dialog-description">
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' color='error' onClick={handleCloseDeleteAlert}>Cancel</Button>
          <Button variant='outlined' size='small' onClick={handleDeleteConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
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
          <Button size='small' color='error' onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button variant="outlined" size='small' onClick={handleUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(CovidTest);