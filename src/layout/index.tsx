import { Container } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { DefaultLayoutContainer } from "./style";

const DefaultLayout = (props: React.PropsWithChildren<{}>) => (
    <DefaultLayoutContainer>
        <Navbar />
        <Container maxWidth="md" sx={{ minHeight: 'calc(100vh - 203px)' }}>
            {props.children}
        </Container>
        <Footer />
    </DefaultLayoutContainer>
)

export default DefaultLayout;