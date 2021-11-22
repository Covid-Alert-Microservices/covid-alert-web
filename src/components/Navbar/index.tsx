import { GitHub, Menu as MenuIcon, SupervisedUserCircle, VerifiedUserOutlined } from "@mui/icons-material";
import { Box, Divider, Stack, Tooltip } from "@mui/material";
import React from "react";
import useNavbarAccountMenu from "../../hooks/useNavbarAccountMenu";
import useNavbarDrawer from "../../hooks/useNavbarDrawer";
import theme from "../../theme";
import AccountMenu from "./AccountMenu";
import Drawer from "./Drawer";
import { NavbarIcon, NavbarWrapper } from "./style";

const Navbar = () => {

    const accountMenuControls = useNavbarAccountMenu();
    const drawerControls = useNavbarDrawer();

    return (
        <>
            <Drawer {...drawerControls} />
            <AccountMenu {...accountMenuControls} />
            <NavbarWrapper>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5 }}>
                    <NavbarIcon color="primary" onClick={drawerControls.open}>
                        <MenuIcon fontSize='small' />
                    </NavbarIcon>
                    <Stack spacing={2} direction="row" sx={{ marginRight: theme.spacing(2) }}>
                        <Tooltip title="Github repository">
                            <NavbarIcon color="primary" onClick={() => { window.open("https://github.com/Covid-Alert-Microservices", "_blank") }}>
                                <GitHub fontSize='small' />
                            </NavbarIcon>
                        </Tooltip>
                        <Tooltip title="Open documentation">
                            <NavbarIcon color="primary" onClick={() => { window.open("https://covid-alert-microservices.github.io/specs/", "_blank") }}>
                                <VerifiedUserOutlined fontSize='small' />
                            </NavbarIcon>
                        </Tooltip>
                        <Tooltip title="Account">
                            <NavbarIcon color="primary" onClick={accountMenuControls.open}>
                                <SupervisedUserCircle fontSize='small' />
                            </NavbarIcon>
                        </Tooltip>
                    </Stack>
                </Box>
                <Divider />
            </NavbarWrapper>
        </>
    )
}

export default React.memo(Navbar);