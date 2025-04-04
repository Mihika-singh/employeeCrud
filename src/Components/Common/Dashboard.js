import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from '@mui/icons-material/Person2';
import Divider from "@mui/material/Divider";
import EmployeesList from "../Views/EmployeesList";
import NewEmployee from "../Views/NewEmployee";
import EditOrDelete from "../Views/EditOrDelete";
import PageNotFound from "./PageNotFound";

export default function Dashboard(){
    const [drawerOpen, setDrawerOpen] = useState(false);
const location=useLocation();
const navigate=useNavigate();
const addNewMember=()=>{
    navigate('/addEmp')
}
const handleNavigation = () => {
    navigate("/");
  };
    const toggleDrawer = (open) => (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
      setDrawerOpen(open);
    };
    return(
        <><AppBar position="static" style={{backgroundColor:'#753A51',margin:'0',padding:0}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                    <MenuIcon style={{fontSize:'30px'}}/>
                </IconButton>
                <Typography variant="h5" sx={{ flexGrow: 1 ,fontWeight:'600'}}>
                {location.pathname==="/" ? 'Employees List' :location.pathname==="/addEmp" && "Add New Employee" }
                </Typography>
            </Toolbar>
        </AppBar><Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    <ListItem disablePadding onClick={handleNavigation}>
                        <ListItemButton> 
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={addNewMember}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Person2Icon />
                            </ListItemIcon>
                            <ListItemText primary="Add New Employee" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
 
                 
                   
                    
                </List>
            </Drawer>
            <Routes>
            <Route path="/" element={<EmployeesList />} />
            <Route path="/addEmp" element={<NewEmployee />} />
            <Route path="/editDelete/:id" element={<EditOrDelete />} />
             <Route path="*" element={<PageNotFound />} />
          </Routes>
            </>
    )
}

