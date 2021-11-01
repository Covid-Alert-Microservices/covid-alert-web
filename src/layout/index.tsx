import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { DefaultLayoutContainer } from "./style";

const DefaultLayout = (props: React.PropsWithChildren<{}>) => {
    return (
        <DefaultLayoutContainer>
            <Navbar />
            {props.children}
            <Footer />
        </DefaultLayoutContainer>
    )
}

export default DefaultLayout;