import React from "react";
import { vaccineApi } from "../../store/api/vaccine";
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";

const Vaccine = () => {
  const { data: vaccine } = vaccineApi.useGetVaccineQuery(null);

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  if (!vaccine) {
    return (
      <>
        <Button variant='outlined' size='large' sx={{ my: 5 }} onClick={handleOpenCreateDialog}>Add a vaccine</Button>

        <Dialog
          open={openCreateDialog}
          onClose={handleCloseCreateDialog}
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
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' size='small' onClick={handleCloseCreateDialog}>Cancel</Button>
            <Button variant='outlined' size='small' color='success' onClick={handleCloseCreateDialog}>Add</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Card variant='outlined' sx={{ my: 5, mx: 'auto', width: '50%' }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ mb: 5, textAlign: 'center' }}>
            {vaccine.disease}
            <br />
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Vaccine :
            </Typography>
            <Typography variant="body2">
              {vaccine.vaccine}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Vaccine medicinal product :
            </Typography>
            <Typography variant="body2">
              {vaccine.vaccineMedicinalProduct}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Manufacturer :
            </Typography>
            <Typography variant="body2">
              {vaccine.manufacturer}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Dose number :
            </Typography>
            <Typography variant="body2">
              {vaccine.doseNumber} / {vaccine.doseNumberMax}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Vaccination date :
            </Typography>
            <Typography variant="body2">
              {new Date(vaccine.vaccinationDate).toLocaleDateString()}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Member state :
            </Typography>
            <Typography variant="body2">
              {vaccine.memberState}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Certificate Issuer :
            </Typography>
            <Typography variant="body2">
              {vaccine.certificateIssuer}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} sx={{ mx: 'auto' }}>
            <Button variant='outlined' size='small'>Edit</Button>
            <Button variant='outlined' size='small' color='error' onClick={handleOpenDeleteAlert}>Delete</Button>
          </Stack>
        </CardActions>
      </Card>

      <Dialog
        open={openDeleteAlert}
        onClose={handleCloseDeleteAlert}
        aria-labelledby="delete-alert-dialog-title"
        aria-describedby="delete-alert-dialog-description"
      >
        <DialogTitle id="delete-alert-dialog-title">
          Are you sure you want to delete this vaccine ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-alert-dialog-description">
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' size='small' onClick={handleCloseDeleteAlert}>Cancel</Button>
          <Button variant='outlined' size='small' color='error' onClick={handleCloseDeleteAlert}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(Vaccine);