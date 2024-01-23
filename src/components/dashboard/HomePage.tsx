import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import RadioRoundedIcon from "@mui/icons-material/RadioRounded";
import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 240;

const HomePage = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  // Handle login button click
  const handleLoginClick = (event: any) => {
    event.preventDefault();
    loginWithPopup();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "black",
        }}>
        <Toolbar>
          {/* Header component */}
          <Header />
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "gray",
          },
        }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Listen Now */}
            <ListItem disablePadding data-testid="listen-now">
              <Link
                to="/listen-now"
                style={{ textDecoration: "none", color: "white" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <PlayCircleRoundedIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Listen Now</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Browse */}
            <ListItem disablePadding data-testid="browse">
              <Link
                to="/browse"
                style={{ textDecoration: "none", color: "white" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <ManageSearchRoundedIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText>Browse</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Library */}
            <ListItem disablePadding data-testid="library">
              {/* Check if the user is authenticated */}
              {isAuthenticated ? (
                // Authenticated: Redirect to Library
                <Link
                  to="/library"
                  style={{ textDecoration: "none", color: "white" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <RadioRoundedIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "white" }}>Library</ListItemText>
                  </ListItemButton>
                </Link>
              ) : (
                // Not authenticated: Show login button
                <ListItemButton
                  onClick={handleLoginClick}
                  style={{ color: "white" }}>
                  <ListItemIcon>
                    <RadioRoundedIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }}>Library</ListItemText>
                </ListItemButton>
              )}
            </ListItem>
          </List>
          {/* Divider */}
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
};

export default HomePage;
