import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { vaccineApi } from "../../store/api/vaccine";

const Vaccine = () => {
  const { data: vaccine, isError } = vaccineApi.useGetVaccineQuery(null);

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteVaccine] = vaccineApi.useDeleteVaccineMutation();

  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [createVaccine] = vaccineApi.useCreateVaccineMutation();

  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [updateVaccine] = vaccineApi.useUpdateVaccineMutation();

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const handleDeleteConfirm = () => {
    deleteVaccine(null);
    handleCloseDeleteAlert();
  }

  const [createFormState, setCreateFormState] = React.useState({
    disease: "COVID-19",
    vaccine: "",
    vaccineMedicinalProduct: "",
    manufacturer: "",
    doseNumber: 0,
    doseNumberMax: 3,
    vaccinationDate: new Date().toLocaleDateString('fr-CA'),
    memberState: "",
    certificateIssuer: "",
  })

  const onCreateFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFormState({ ...createFormState, [event.target.id]: event.target.value });
  }

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateConfirm = () => {
    createVaccine({ ...createFormState, vaccinationDate: new Date(createFormState.vaccinationDate).getTime() });
    handleCloseCreateDialog();
  }

  const [updateFormState, setUpdateFormState] = React.useState({
    disease: "COVID-19",
    vaccine: "",
    vaccineMedicinalProduct: "",
    manufacturer: "",
    doseNumber: 0,
    doseNumberMax: 3,
    vaccinationDate: new Date().toLocaleDateString('fr-CA'),
    memberState: "",
    certificateIssuer: "",
  })

  React.useEffect(() => {
    if (vaccine) {
      setUpdateFormState({
        disease: vaccine.disease,
        vaccine: vaccine.vaccine,
        vaccineMedicinalProduct: vaccine.vaccineMedicinalProduct,
        manufacturer: vaccine.manufacturer,
        doseNumber: vaccine.doseNumber,
        doseNumberMax: vaccine.doseNumberMax,
        vaccinationDate: new Date(vaccine.vaccinationDate).toLocaleDateString('fr-CA'),
        memberState: vaccine.memberState,
        certificateIssuer: vaccine.certificateIssuer,
      })
    }
  }, [vaccine, setUpdateFormState])

  const onUpdateFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFormState({ ...updateFormState, [event.target.id]: event.target.value });
  }

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateConfirm = () => {
    updateVaccine({ ...updateFormState, vaccinationDate: new Date(updateFormState.vaccinationDate).getTime() });
    handleCloseUpdateDialog();
  }

  if (!vaccine || isError) {
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
            <Box component="form" sx={{ margin: 3, '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
              <TextField disabled id="disease" label="Disease" onChange={onCreateFieldUpdate} value={createFormState.disease} />
              <TextField required id="vaccine" label="Vaccine" onChange={onCreateFieldUpdate} value={createFormState.vaccine} />
              <TextField required id="vaccineMedicinalProduct" label="Vaccine Medicinal Product" onChange={onCreateFieldUpdate} value={createFormState.vaccineMedicinalProduct} />
              <TextField required id="manufacturer" label="Manufacturer" onChange={onCreateFieldUpdate} value={createFormState.manufacturer} />
              <TextField required id="doseNumber" label="Dose Number" type="number" onChange={onCreateFieldUpdate} value={createFormState.doseNumber} />
              <TextField required id="doseNumberMax" label="Dose Number Max" type="number" onChange={onCreateFieldUpdate} value={createFormState.doseNumberMax} />
              <TextField required id="vaccinationDate" label="Vaccination Date" type="date" onChange={onCreateFieldUpdate} value={createFormState.vaccinationDate} />
              <TextField required id="memberState" label="Member State" onChange={onCreateFieldUpdate} value={createFormState.memberState} />
              <TextField required id="certificateIssuer" label="Certificate Issuer" onChange={onCreateFieldUpdate} value={createFormState.certificateIssuer} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button size='large' sx={{ color: 'text.disabled' }} onClick={handleCloseCreateDialog}>Cancel</Button>
            <Button size='large' color='primary' variant="outlined" onClick={handleCreateConfirm}>Create vaccine</Button>
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
            <Button variant='outlined' size='small' onClick={handleOpenUpdateDialog}>Edit</Button>
            <Button size='small' color='error' onClick={handleOpenDeleteAlert}>Delete</Button>
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
          <Button size='large' sx={{ color: 'text.disabled' }} onClick={handleCloseDeleteAlert}>Cancel</Button>
          <Button size='large' color="primary" variant='outlined' onClick={handleDeleteConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        aria-labelledby="update-dialog-title"
        aria-describedby="update-dialog-description"
      >
        <DialogTitle id="update-dialog-title">
          Update vaccine
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="update-dialog-description">
            Please enter your vaccine informations.
          </DialogContentText>
          <Box component="form" sx={{ margin: 3, '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            <TextField disabled id="disease" label="Disease" onChange={onUpdateFieldUpdate} value={updateFormState.disease} />
            <TextField required id="vaccine" label="Vaccine" onChange={onUpdateFieldUpdate} value={updateFormState.vaccine} />
            <TextField required id="vaccineMedicinalProduct" label="Vaccine Medicinal Product" onChange={onUpdateFieldUpdate} value={updateFormState.vaccineMedicinalProduct} />
            <TextField required id="manufacturer" label="Manufacturer" onChange={onUpdateFieldUpdate} value={updateFormState.manufacturer} />
            <TextField required id="doseNumber" label="Dose Number" type="number" onChange={onUpdateFieldUpdate} value={updateFormState.doseNumber} />
            <TextField required id="doseNumberMax" label="Dose Number Max" type="number" onChange={onUpdateFieldUpdate} value={updateFormState.doseNumberMax} />
            <TextField required id="vaccinationDate" label="Vaccination Date" type="date" onChange={onUpdateFieldUpdate} value={updateFormState.vaccinationDate} />
            <TextField required id="memberState" label="Member State" onChange={onUpdateFieldUpdate} value={updateFormState.memberState} />
            <TextField required id="certificateIssuer" label="Certificate Issuer" onChange={onUpdateFieldUpdate} value={updateFormState.certificateIssuer} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size='large' sx={{ color: 'text.disabled' }} onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button size='large' color="primary" variant='outlined' onClick={handleUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(Vaccine);