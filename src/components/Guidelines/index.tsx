import styled from "@emotion/styled";
import { Button, Card, CardContent, Grid } from "@mui/material";
import React from "react";
import Svg1 from '../../svg/1.svg';
import Svg2 from '../../svg/2.svg';
import Svg3 from '../../svg/3.svg';
import Svg4 from '../../svg/4.svg';
import Svg5 from '../../svg/5.svg';
import Svg6 from '../../svg/6.svg';
import theme from "../../theme";


const StyledImg = styled.img({
    margin: theme.spacing(2),
    height: 150
})


const Guidelines = () => {
    return (
        <Grid container spacing={2} sx={{ marginTop: 3, marginBottom: 3 }}>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg2} />
                        <Button variant="outlined" sx={{ marginTop: 2 }}>Security and privacy is our priority</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg3} />
                        <Button variant="outlined" sx={{ marginTop: 2 }}>Make sure you share your position</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg1} />
                        <Button variant="outlined" sx={{ marginTop: 2 }}>Follows you wherever you go</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg5} />
                        <Button variant="outlined" sx={{ marginTop: 2 }}>Keep you and your friends safe</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg4} />
                        <Button variant="outlined" sx={{ marginTop: 2 }}>Stay updated with the latest news</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg6} />
                        <Button variant="outlined" sx={{ marginTop: 2 }} >View and analyse many relevant charts</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default React.memo(Guidelines);