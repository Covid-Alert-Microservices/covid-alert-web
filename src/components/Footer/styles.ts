import styled from "@emotion/styled";
import theme from "../../theme";

export const FooterWrapper = styled.div({
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing(3)
})