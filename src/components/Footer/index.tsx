import { Avatar, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { FooterWrapper } from "./styles";

const Footer = () => (
    <FooterWrapper>
        <Link href="https://github.com/BrokenSwing" underline="none" target="_blank" rel="noreferrer">
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Florent Hugouvieux's avatar" src="https://avatars.githubusercontent.com/u/12006453?v=4" />
                </ListItemAvatar>
                <ListItemText
                    primary="Florent Hugouvieux"
                    secondary="Polytech Montpellier"
                />
            </ListItem>
        </Link>
        <Link href="https://github.com/Axel-Duval" underline="none" target="_blank" rel="noreferrer">
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Axel Duval's avatar" src="https://avatars.githubusercontent.com/u/55990319?v=4" />
                </ListItemAvatar>
                <ListItemText
                    primary="Axel Duval"
                    secondary="Polytech Montpellier"
                />
            </ListItem>
        </Link>
        <Link href="https://github.com/KevenDvorianoff" underline="none" target="_blank" rel="noreferrer">
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Keven Dvorianoff's avatar" src="https://avatars.githubusercontent.com/u/92625839?s=400&v=4" />
                </ListItemAvatar>
                <ListItemText
                    primary="Keven Dvorianoff"
                    secondary="Polytech Montpellier"
                />
            </ListItem>
        </Link>
    </FooterWrapper>
)

export default React.memo(Footer);