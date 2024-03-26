import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Login from "../Login/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import SearchSong from "../dashboard/searchSong/SearchSong";

// List of pages and settings in the header
const pages = ["Get Music Premium"];
const settings = ["Account", "Favourites"];

// Styled components for search functionality
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

// Main Header component
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { user, isAuthenticated } = useAuth0();

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Open navigation menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // Open user menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // Close navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Close user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Remove search results on outside click
  const handleOutsideClick = (e: any) => {
    const componentContainer = document.getElementById("container-1");

    if (componentContainer && !componentContainer.contains(e.target)) {
      setSearchQuery(""); // Clear the search query to make the component vanish
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener("click", handleOutsideClick);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div style={{ zIndex: 1300, position: "fixed", width: "100vw" }}>
      {/* Main AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#19272e" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for larger screens */}
            <MusicNoteIcon
              data-testid="mus-icon"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            {/* Link to home */}
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Lemon, serif",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}>
                Music
              </Typography>
            </Link>

            {/* Sidebar icon for mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                data-testid="mus-icon"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MoreVertIcon />
              </IconButton>

              {/* Sidebar menu for mobile */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Music logo for mobile */}
            <MusicNoteIcon
              data-testid="mus-icon"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            {/* Link to home for mobile */}
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "Lemon, serif",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}>
                Music
              </Typography>
            </Link>

            {/* Search input */}
            <Search
              data-testid="search-input"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                data-testid="search-input"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e: any) => handleSearch(e.target.value)}
              />
            </Search>

            {/* Navigation buttons */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  marginLeft: "10px",
                  marginRight: "10px",
                },
              }}>
              {/* Link to premium page */}
              <Link to="/premium" style={{ textDecoration: "none" }}>
                <Button
                  data-testid="music-premium"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}>
                  Get Music Premium
                </Button>
              </Link>
            </Box>

            {/* Login button */}
            <Login />

            {/* User profile icon and settings */}
            {isAuthenticated && (
              <Box sx={{ marginLeft: "10px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src={user?.picture} />
                  </IconButton>
                </Tooltip>
                {/* User settings menu */}
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>

        {/* Search results container */}
        <div
          id="container-1"
          style={{
            margin: "60px 0px 0px 190px",
            width: "60%",
            position: "fixed",
            backgroundColor: "#3a4856",
            borderRadius: "10px",
          }}>
          {searchQuery && (
            <Link to={"/search"}>
              <SearchSong query={searchQuery} />
            </Link>
          )}
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
