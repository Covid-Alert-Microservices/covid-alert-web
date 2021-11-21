import { BiotechOutlined, HealthAndSafetyOutlined, LogoutOutlined, PersonOffOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Skeleton, Tooltip } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { INavbarAccountMenu } from "../../../hooks/useNavbarAccountMenu";
import { selectUser, setUser } from "../../../store/api/user";
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
                </Avatar> Not protected
            </MenuItem>
            <Divider />
            <MenuItem onClick={login}>
                <ListItemIcon >
                    <VpnKeyOutlined fontSize="small" />
                </ListItemIcon>
                Log in
            </MenuItem>
        </>
    )
});

const AuthenticatedMenu = React.memo(() => {
    const { keycloak } = useKeycloak();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const history = useHistory();

    if (!('id' in user)) {
        keycloak.loadUserProfile().then((profile) => { dispatch(setUser(profile)) })
        return SkeletonAuthenticatedMenu();
    }

    return (
        <>
            <Tooltip title="Account">
                <MenuItem onClick={(e) => history.push('/account')}>
                    <Avatar {...stringAvatar(user?.username || 'random')} /> {user?.username || 'random'}
                </MenuItem>
            </Tooltip>
            <Divider />
            <MenuItem onClick={(e) => history.push('/vaccines')}>
                <ListItemIcon>
                    <HealthAndSafetyOutlined fontSize="small" />
                </ListItemIcon>
                Vaccines
            </MenuItem>
            <MenuItem onClick={(e) => history.push('/testing')}>
                <ListItemIcon>
                    <BiotechOutlined fontSize="small" />
                </ListItemIcon>
                Testing
            </MenuItem>
            <Divider light />
            <MenuItem onClick={(e) => keycloak.logout()}>
                <ListItemIcon>
                    <LogoutOutlined fontSize="small" />
                </ListItemIcon>
                Log out
            </MenuItem>
        </>
    )
})

const SkeletonAuthenticatedMenu = () => (
    <>
        <MenuItem>
            <Skeleton variant="circular">
                <Avatar />
            </Skeleton>
            <Skeleton variant="text" width={60} height={30} sx={{ ml: 1 }} />
        </MenuItem>
        <Divider />
        <MenuItem>
            <ListItemIcon>
                <Skeleton variant="circular" width={20} height={20} />
            </ListItemIcon>
            <Skeleton variant="text" width={60} />
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <Skeleton variant="circular" width={20} height={20} />
            </ListItemIcon>
            <Skeleton variant="text" width={60} />
        </MenuItem>
        <Divider light />
        <MenuItem>
            <ListItemIcon>
                <Skeleton variant="circular" width={20} height={20} />
            </ListItemIcon>
            <Skeleton variant="text" width={60} />
        </MenuItem>
    </>
)

export default React.memo(AccountMenu);