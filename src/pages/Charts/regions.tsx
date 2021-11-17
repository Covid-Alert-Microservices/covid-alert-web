import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { chartsApi } from "../../store/api/charts";

const Regions = () => {
  const { data: regions } = chartsApi.useGetRegionsDataQuery(null);
  const [region, setRegion] = useState("Ain");

  const handleChange = (event: SelectChangeEvent) =>
    setRegion(event.target.value);

  if (!regions) {
    return null;
  }

  const labels = Object.keys(regions).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          labelId="region-label"
          id="region-select"
          value={region}
          label="Region"
          onChange={handleChange}
        >
          {labels.map((label: string) => (
            <MenuItem value={label} key={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={2} sx={{ marginTop: 3, marginBottom: 3 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Population
              </Typography>
              <Typography variant="h5" component="div">
                {regions[region].population}
              </Typography>
              <Typography variant="body2">
                Number of inhabitants in the area. Census conducted by INSEE in
                January 2015.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Incidence rate
              </Typography>
              <Typography variant="h5" component="div">
                {regions[region].incidence_cas}
              </Typography>
              <Typography variant="body2">
                Number of 7-day cases per 100k population. The average incidence
                in France is 76, and the alert threshold 50.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Hospital tension
              </Typography>
              <Typography variant="h5" component="div">
                {Math.round(regions[region].saturation_rea * 10) / 10}%
              </Typography>
              <Typography variant="body2">
                If greater than 100%, then Covid19 patients are occupying more
                ICU beds than were available before the outbreak.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Positive rate
              </Typography>
              <Typography variant="h5" component="div">
                {Math.round(regions[region].taux_positivite * 10) / 10}%
              </Typography>
              <Typography variant="body2">
                Proportion of positive tests in total tests. A low number may be
                due to low virus circulation or massive testing.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Hospitalization beds
              </Typography>
              <Typography variant="h5" component="div">
                {Math.round(regions[region].lits_hosp_evol * 10) / 10}%
              </Typography>
              <Typography variant="body2">
                Evolution of beds number since the beginning of covid crisis. A
                negative number may mean that some beds has been changed into
                ICU beds.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                ICU beds
              </Typography>
              <Typography variant="h5" component="div">
                {Math.round(regions[region].lits_rea_evol * 10) / 10}%
              </Typography>
              <Typography variant="body2">
                Evolution of ICU beds number since the beginning of covid
                crisis. The average rate in France is 65.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Regions);
