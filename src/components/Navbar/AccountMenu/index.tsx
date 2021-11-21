import { LogoutOutlined, PersonOffOutlined, SettingsOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import React, { useCallback } from "react";
import { INavbarAccountMenu } from "../../../hooks/useNavbarAccountMenu";
import theme from "../../../theme";
import { stringAvatar } from "../../../utils/muiStringcolors";

const AccountMenu = (controls: INavbarAccountMenu) => {
    const { keycloak } = useKeycloak();
    return (
        <Menu
            anchorEl={controls.anchorEl}
            open={controls.isOpen}
            onClose={controls.close}
            onClick={controls.close}
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

        </Menu>
    )
}

const UnauthenticatedMenu = React.memo(() => {
    const { keycloak } = useKeycloak()
    const login = useCallback(() => { keycloak.login() }, [keycloak]);
    return (
        <>
            <MenuItem>
                <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                    <PersonOffOutlined />
                </Avatar> Anonyme
            </MenuItem>
            <Divider />
            <MenuItem onClick={login}>
                <ListItemIcon >
                    <VpnKeyOutlined fontSize="small" />
                </ListItemIcon>
                Connexion
            </MenuItem>
        </>
    )
});

const AuthenticatedMenu = React.memo(() => {
    const { keycloak } = useKeycloak();
    return (
        <>
            <MenuItem>
                <Avatar {...stringAvatar(keycloak.profile?.username || 'random')} /> {keycloak.profile?.username}
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <SettingsOutlined fontSize="small" />
                </ListItemIcon>
                Paramètres
            </MenuItem>
            <MenuItem onClick={(e) => keycloak.logout()}>
                <ListItemIcon>
                    <LogoutOutlined fontSize="small" />
                </ListItemIcon>
                Déconnexion
            </MenuItem>
        </>
    )
})

export default React.memo(AccountMenu);