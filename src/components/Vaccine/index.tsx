import { Button } from "@mui/material";
import React from "react";
import useDialogControls from "../../hooks/useDialogControls";
import { vaccineApi } from "../../store/api/vaccine";
import CreateVaccine from "./create-vaccine";
import VaccineItem from "./vaccine";

const Vaccine = () => {
  const { data: vaccine, isError } = vaccineApi.useGetVaccineQuery(null);

  const [isCreateDialogOpen, openCreateDialog, closeCreateDialog] = useDialogControls();

  if (!isError && vaccine) return <VaccineItem vaccine={vaccine} />;

  return (
    <>
      <Button variant='outlined' size='large' sx={{ my: 5 }} onClick={openCreateDialog}>Add a vaccine</Button>
      <CreateVaccine open={isCreateDialogOpen} onClose={closeCreateDialog} />
    </>
  );
}

export default Vaccine;