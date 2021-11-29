import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import useDialogControls from "../../hooks/useDialogControls";
import { CovidTestData } from "../../store/api/covid-tests";
import DeleteTest from './delete-test';
import UpdateTest from './update-test';

const CovidTest = (props: { covidTest: CovidTestData }) => {

  const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useDialogControls();
  const [isUpdateDialogOpen, openUpdateDialog, closeUpdateDialog] = useDialogControls();

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
              <Button size='large' color="primary" onClick={openUpdateDialog}>Edit</Button>
              <Button size='large' color="error" onClick={openDeleteDialog}>Delete</Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid>

      <DeleteTest
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        test={props.covidTest}
      />

      <UpdateTest
        open={isUpdateDialogOpen}
        onClose={closeUpdateDialog}
        test={props.covidTest}
      />
    </>
  );
}

export default React.memo(CovidTest);