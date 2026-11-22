import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Login from "../Login/Login";
import SearchSong from "../dashboard/searchSong/SearchSong";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import RadioRoundedIcon from "@mui/icons-material/RadioRounded";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

// Styling constants
const COLORS = {
  primary: "#19272e",
  secondary: "#25aae1",
  text: "#fff",
  hover: "#1f2f37",
} as const;

const STYLES = {
  link: {
    textDecoration: "none",
    color: COLORS.text,
    width: "100%",
  },
  hoverButton: {
    "&:hover": { backgroundColor: COLORS.secondary },
  },
  navigationButton: {
    my: 2,
    color: COLORS.text,
    display: { xs: "none", sm: "flex", md: "flex" },
    "&:hover": {
      backgroundColor: COLORS.secondary,
    },
  },
} as const;

// Navigation configuration
interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    id: "listen-now",
    label: "Listen Now",
    path: "/listen-now",
    icon: <PlayCircleRoundedIcon sx={{ color: COLORS.text }} />,
  },
  {
    id: "browse",
    label: "Browse",
    path: "/browse",
    icon: <ManageSearchRoundedIcon sx={{ color: COLORS.text }} />,
  },
  {
    id: "library",
    label: "Library",
    path: "/library",
    icon: <RadioRoundedIcon sx={{ color: COLORS.text }} />,
    requiresAuth: true,
  },
];

// Search types
type SearchType = "songs" | "artists";

const searchTypes: {
  value: SearchType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "songs", label: "Songs", icon: <SearchIcon /> },
  { value: "artists", label: "Artists", icon: <PersonIcon /> },
];

const pages = ["Get Music Premium"];
const settings = ["Account", "Favourites"];

// Reusable NavigationItem component
interface NavigationItemProps {
  item: NavigationItem;
  isAuthenticated: boolean;
  onLoginClick: (event: any) => void;
}

const NavigationItemComponent: React.FC<NavigationItemProps> = ({
  item,
  isAuthenticated,
  onLoginClick,
}) => {
  const requiresAuth = item.requiresAuth && !isAuthenticated;

  if (requiresAuth) {
    return (
      <ListItem disablePadding data-testid={item.id}>
        <ListItemButton
          onClick={onLoginClick}
          style={{ color: COLORS.text }}
          sx={STYLES.hoverButton}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText sx={{ color: COLORS.text }}>{item.label}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding data-testid={item.id}>
      <Link to={item.path} style={STYLES.link}>
        <ListItemButton sx={STYLES.hoverButton}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.label}</ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#19272e",
    color: "#fff", // Set the background color here
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    ...(open && {
      ...openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
    }),
  },
}));

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

const HeaderV2 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("songs");

  const { user, isAuthenticated, loginWithPopup } = useAuth0();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Navigate to search results page with query and type
      const query = searchQuery.trim();
      navigate(`/search/${searchType}/${encodeURIComponent(query)}`);
      setSearchQuery(""); // Clear search query
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  const handleLoginClick = (event: any) => {
    event.preventDefault();
    loginWithPopup();
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#19272e" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>
          {/* Logo for larger screens */}
          <MusicNoteIcon
            data-testid="mus-icon"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          {/* Sidebar icon for mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}>
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
                display: { xs: "block", md: "flex" },
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
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "Lemon, serif",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}>
              Music
            </Typography>
          </Link>

          {/* Search input with type toggle */}
          <Box sx={{ display: "flex", flexGrow: 1, maxWidth: "600px" }}>
            {/* Search type toggle */}
            <ToggleButtonGroup
              value={searchType}
              exclusive
              onChange={(_, newType) => newType && setSearchType(newType)}
              aria-label="search type"
              sx={{
                mr: 1,
                "& .MuiToggleButton-root": {
                  color: COLORS.text,
                  borderColor: alpha(COLORS.text, 0.3),
                  "&.Mui-selected": {
                    backgroundColor: alpha(COLORS.secondary, 0.2),
                    color: COLORS.text,
                    "&:hover": {
                      backgroundColor: alpha(COLORS.secondary, 0.3),
                    },
                  },
                  "&:hover": {
                    backgroundColor: alpha(COLORS.text, 0.1),
                  },
                },
              }}>
              {searchTypes.map((type) => (
                <ToggleButton
                  key={type.value}
                  value={type.value}
                  aria-label={type.label}
                  sx={{ px: 1, py: 0.5 }}>
                  {type.icon}
                  <Typography
                    variant="caption"
                    sx={{ ml: 0.5, display: { xs: "none", sm: "inline" } }}>
                    {type.label}
                  </Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* Search input */}
            <Search
              data-testid="search-input"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "flex", md: "flex" },
              }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                data-testid="search-input"
                placeholder={`Search ${searchType}…`}
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e: any) => handleSearch(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
            </Search>
          </Box>

          {/* menu */}
          <IconButton
            data-testid="mus-icon"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
            <MoreVertIcon
              sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
            />
          </IconButton>

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
                sx={{
                  my: 2,
                  color: "white",
                  display: { xs: "none", sm: "flex", md: "flex" },
                  "&:hover": {
                    backgroundColor: "#25aae1",
                  },
                }}>
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

        {/* Search results container */}
        <div
          id="container-1"
          style={{
            margin: "60px 0px 0px 230px",
            width: "60%",
            position: "fixed",
            backgroundColor: "#3a4856",
            borderRadius: "10px",
          }}>
          {searchQuery && (
            <Link to={`/search/${searchType}`}>
              <SearchSong query={searchQuery} searchType={searchType} />
            </Link>
          )}
        </div>
      </AppBar>
      {/*  */}

      {/* Sidebar for desktop */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              isAuthenticated={isAuthenticated}
              onLoginClick={handleLoginClick}
            />
          ))}
        </List>

        <Divider />
      </Drawer>
    </Box>
  );
};

export default HeaderV2;
