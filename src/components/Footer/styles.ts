import styled from "@emotion/styled";
import theme from "../../theme";

export const FooterWrapper = styled.div({
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
})