import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import React from "react";
import { covidTestApi } from "../../store/api/covid-tests";
import CovidTest from "./covid-test";

const CovidTestsList = () => {
  const { data: covidTests } = covidTestApi.useGetCovidTestsQuery(null);

  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

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
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' size='small' onClick={handleCloseCreateDialog}>Cancel</Button>
          <Button variant='outlined' size='small' color='success' onClick={handleCloseCreateDialog}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(CovidTestsList);