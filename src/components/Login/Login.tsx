import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Login: React.FC = () => {
  // Destructuring values from the useAuth0 hook
  const { user, isAuthenticated, logout, loginWithPopup } = useAuth0();

  // Log the current user information to the console
  console.log("current user", user);

  return (
    <div style={{ display: "flex" }}>
      {isAuthenticated ? (
        // Logout button for authenticated users
        <Button
          aria-label="Log out"
          variant="contained"
          endIcon={<LogoutIcon />}
          sx={{
            minWidth: { xs: 40, sm: 100 },
            px: { xs: 1, sm: 2 },
            background: "linear-gradient(135deg, #a78bfa, #7956dc)",
            color: "#fff",
            boxShadow: "0 8px 22px rgba(121, 86, 220, 0.22)",
            "& .MuiButton-endIcon": { mr: { xs: 0, sm: -0.5 } },
            "&:hover": {
              background: "linear-gradient(135deg, #b8a4ff, #8a67eb)",
              boxShadow: "0 10px 26px rgba(121, 86, 220, 0.34)",
            },
          }}
          onClick={() => logout()}>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Logout
          </Box>
        </Button>
      ) : (
        // Login button for unauthenticated users
        <Button
          aria-label="Log in"
          variant="contained"
          startIcon={<LoginIcon />}
          sx={{
            minWidth: { xs: 40, sm: 100 },
            px: { xs: 1, sm: 2 },
            background: "linear-gradient(135deg, #a78bfa, #7956dc)",
            color: "#fff",
            boxShadow: "0 8px 22px rgba(121, 86, 220, 0.22)",
            "& .MuiButton-startIcon": { ml: { xs: 0, sm: -0.5 }, mr: { xs: 0, sm: 1 } },
            "&:hover": {
              background: "linear-gradient(135deg, #b8a4ff, #8a67eb)",
              boxShadow: "0 10px 26px rgba(121, 86, 220, 0.34)",
            },
          }}
          onClick={() => loginWithPopup()}>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Login
          </Box>
        </Button>
      )}
    </div>
  );
};

export default Login;
