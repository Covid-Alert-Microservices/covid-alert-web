import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AccountForm from "../../components/Account/Form";
import { selectUser } from "../../store/api/user";


const Account = () => {
    const user = useSelector(selectUser);

    return (
        <>
            <Typography component="h1" variant="h2" mt={4}>Welcome back, <b>{user.username}</b></Typography>
            <Typography component="p" variant="subtitle1">Thank you for trusting Covid Alert. To protect your loved ones think of activating the geolocation. You can disable this feature at any time.</Typography>
            <Typography sx={{ mt: 4 }} variant="button" display="block" gutterBottom>Application settings</Typography>
            <AccountForm />
        </>
    )
}


export default Account;