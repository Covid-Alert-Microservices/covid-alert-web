import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import theme from "../../theme";

export const NavbarWrapper = styled.nav({
    position: 'sticky',
    top: 0,
    width: '100%',
    background: theme.palette.background.default,
    height: '62px'
})

export const NavbarIcon = styled(IconButton)({
    border: '1px solid #E5E8EC',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '10px',
    padding: theme.spacing(1) + ' ' + theme.spacing(1.3),
}) 