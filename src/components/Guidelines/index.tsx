import styled from "@emotion/styled";
import { Card, CardContent, Grid, Typography } from "@mui/material";
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
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }} gutterBottom>Security and privacy is our priority</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg3} />
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }} gutterBottom>Make sure you share your position</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg1} />
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }} gutterBottom>Follows you wherever you go</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg5} />
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }} gutterBottom>Keep you and your friends safe</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg4} />
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }} gutterBottom>Stay updated with the latest news</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <StyledImg src={Svg6} />
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }} gutterBottom>View and analyse many relevant charts</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default React.memo(Guidelines);