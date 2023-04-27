import { useState } from "react";
import { Menu, MenuItem, SubMenu, Sidebar, useProSidebar, MenuItemStyles } from 'react-pro-sidebar';
import { Box, IconButton, Typography, colors, useTheme } from "@mui/material";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import wallet from "./../../components/wallet.svg";
import riders from "./../../components/riders.svg";
import orders from "./../../components/orders.svg";
import customers from "./../../components/customers.svg";
import collapse from "./../../components/Collapse.svg";
import logo from "./../../components/Logo.svg";
import dash from "./../../components/dash.svg";



const Sidebare = () => {
    const { collapseSidebar } = useProSidebar();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dasboard");

    return (
        <Box  display="flex" justifyContent="space-between">
            <Sidebar>
                <Menu menuItemStyles={{}}>

                    <MenuItem >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <img src={logo} alt="logo" />
                            <img src={collapse} alt="collapse" onClick={collapseSidebar} />
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/"style={{textDecoration: "none", color: "black"}} >
                            <div style={{ display: "flex", paddingTop: "50px",  }}>
                                <img src={dash} alt="dashboard" />
                                <p>Dashboard</p>
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <div style={{ display: "flex", paddingTop: "50px" }}>
                            <img src={wallet} alt="wallet" />
                            <p>Transactions</p>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div style={{ display: "flex", paddingTop: "50px" }}>
                            <img src={customers} alt="customers" />
                            <p>Customers</p>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div style={{ display: "flex", paddingTop: "50px" }}>
                            <img src={riders} alt="riders" />
                            <p>Riders</p>
                        </div>
                    </MenuItem>
                    <MenuItem >
                        <Link to="/orders" style={{textDecoration: "none", color: "black"}}>
                            <div style={{ display: "flex", paddingTop: "50px" }}>
                                <img src={orders} alt="orders" />
                                <p>Orders</p>
                            </div>
                        </Link>
                    </MenuItem>
                </Menu>
            </Sidebar>
        </Box>

    );
}

export default Sidebare;