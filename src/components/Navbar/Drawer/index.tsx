import { AodOutlined, BarChartOutlined, ChevronLeftOutlined, HomeOutlined } from "@mui/icons-material";
import { Divider, Drawer as MUIDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { IDrawer } from "../../../hooks/useNavbarDrawer";

interface IMenuItem {
    id: number;
    name: string;
    icon: JSX.Element;
    path: string;
}

const menu: IMenuItem[] = [
    {
        id: 1,
        name: 'Home',
        icon: <HomeOutlined />,
        path: '/'
    },
    {
        id: 2,
        name: 'News',
        icon: <AodOutlined />,
        path: '/news'
    },
    {
        id: 3,
        name: 'Charts',
        icon: <BarChartOutlined />,
        path: '/charts'
    }
]


const Drawer = (controls: IDrawer) => {
    const { push } = useHistory();

    return (
        <MUIDrawer
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: 200
                },
            }}
            variant="persistent"
            anchor="left"
            open={controls.isOpen}
        >
            <div>
                <IconButton onClick={controls.close}>
                    <ChevronLeftOutlined />
                </IconButton>
            </div>
            <Divider />
            <List>
                {menu.map((item) => (
                    <ListItem button key={item.id} onClick={(e) => { push(item.path); controls.close(e) }}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </MUIDrawer>
    )
}

export default React.memo(Drawer);