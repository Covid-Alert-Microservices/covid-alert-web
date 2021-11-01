import { GitHub, LogoutOutlined, Menu as MenuIcon, SettingsOutlined, SupervisedUserCircle, VerifiedUserOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import React, { useCallback } from "react";
import theme from "../../theme";
import { stringAvatar } from '../../utils/muiStringcolors';
import { NavbarIcon, NavbarWrapper } from "./style";

const Navbar = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const location = useGeolocation({ enableHighAccuracy: false, timeout: 1000 * 60 * 5 });
    // console.log(location);

    return (
        <>
            <NavbarWrapper>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5 }}>
                    <NavbarIcon color="primary">
                        <MenuIcon fontSize='small' />
                    </NavbarIcon>
                    <Stack spacing={2} direction="row" sx={{ marginRight: theme.spacing(2) }}>
                        <Tooltip title="Github repository">
                            <NavbarIcon color="primary" onClick={() => { window.open("https://github.com/Covid-Alert-Microservices", "_blank") }}>
                                <GitHub fontSize='small' />
                            </NavbarIcon>
                        </Tooltip>
                        <Tooltip title="Covid-Certified">
                            <NavbarIcon color="primary">
                                <VerifiedUserOutlined fontSize='small' />
                            </NavbarIcon>
                        </Tooltip>
                        <Tooltip title="Compte">
                            <NavbarIcon color="primary" onClick={handleClick}>
                                <SupervisedUserCircle fontSize='small' />
                            </NavbarIcon>
                        </Tooltip>
                    </Stack>
                </Box>
                <Divider />
            </NavbarWrapper>
            <AccountMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
        </>
    )
}

const AccountMenu = ({ open, anchorEl, handleClose }: any) => {
    const { keycloak } = useKeycloak();

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {keycloak.authenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}

        </Menu>)
}

const UnauthenticatedMenu = () => {
    const { keycloak } = useKeycloak()
    const login = useCallback(() => {
        keycloak.login();
    }, [keycloak]);
    return (
        <>
            <MenuItem>
                <ListItemIcon onClick={login}>
                    <VpnKeyOutlined fontSize="small" />
                </ListItemIcon>
                Connexion
            </MenuItem>
        </>
    )
}

const AuthenticatedMenu = () => {
    return (
        <>
            <MenuItem>
                <Avatar {...stringAvatar('Chouki Tibermacine')} /> Chouki Tibermacine
            </MenuItem><Divider /><MenuItem>
                <ListItemIcon>
                    <SettingsOutlined fontSize="small" />
                </ListItemIcon>
                Paramètres
            </MenuItem><MenuItem>
                <ListItemIcon>
                    <LogoutOutlined fontSize="small" />
                </ListItemIcon>
                Déconnexion
            </MenuItem>
        </>
    )
}

export default Navbar;