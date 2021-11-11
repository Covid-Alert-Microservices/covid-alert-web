import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import CasesChart from './cases';
import CumulativeVaccinationChart from './cumulativeVaccination';
import DeathChart from './deaths';
import ReanimationChart from './hospRea';
import Regions from './regions';
import VaccinationChart from './vaccination';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = React.memo((props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingTop: 3 }}>{children}</Box>
            )}
        </div>
    );
})

const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
})


const Charts = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <Typography component="h1" variant="h2" mt={4}>Charts</Typography>
            <Typography component="p" variant="subtitle1">These charts make it possible to monitor and better understand the evolution of the epidemic. Data provided by <a href="https://www.santepubliquefrance.fr/" rel="noreferrer" target="_blank">Santé Pulique France</a>.</Typography>
            <Box sx={{ width: '100%', height: '100%', marginTop: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Tabs" variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile>
                        <Tab label="Regions" {...a11yProps(0)} />
                        <Tab label="Positive cases" {...a11yProps(1)} />
                        <Tab label="Vaccination" {...a11yProps(2)} />
                        <Tab label="Cumulative vaccination" {...a11yProps(3)} />
                        <Tab label="Deaths" {...a11yProps(4)} />
                        <Tab label="Hospitalization & Reanimation" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Regions />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CasesChart />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <VaccinationChart />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <CumulativeVaccinationChart />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <DeathChart />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <ReanimationChart />
                </TabPanel>

            </Box>
        </>
    )
}
export default React.memo(Charts);