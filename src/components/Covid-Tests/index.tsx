import { Button, Grid } from "@mui/material";
import React from "react";
import useDialogControls from "../../hooks/useDialogControls";
import { covidTestApi } from "../../store/api/covid-tests";
import CovidTest from "./covid-test";
import CreateTest from './create-test';

const CovidTestsList = () => {
  const { data: covidTests } = covidTestApi.useGetCovidTestsQuery(null);

  const [isCreateDialogOpen, openCreateDialog, closeCreateDialog] = useDialogControls();

  return (
    <>
      <Button variant='outlined' size='large' sx={{ my: 5 }} onClick={openCreateDialog}>Add a test</Button>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {covidTests && covidTests.map((covidTest) => (
          <CovidTest key={covidTest.id} covidTest={covidTest} />
        ))}
      </Grid>
      <CreateTest
        open={isCreateDialogOpen}
        onClose={closeCreateDialog}
      />
    </>
  );
}

export default React.memo(CovidTestsList);