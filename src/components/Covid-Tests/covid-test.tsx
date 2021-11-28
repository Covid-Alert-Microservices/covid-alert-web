import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { CovidTestData } from "../../store/api/covid-tests";

const CovidTest = (props: { covidTest: CovidTestData }) => {

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

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
              <Button variant='outlined' size='small'>Edit</Button>
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
          <Button variant='outlined' size='small' onClick={handleCloseDeleteAlert}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(CovidTest);