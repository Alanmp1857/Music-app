import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
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
          variant="contained"
          endIcon={<LogoutIcon />}
          sx={{
            backgroundColor: "darkgray",
            color: "white",
            "&:hover": {
              backgroundColor: "darkgray",
            },
          }}
          onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        // Login button for unauthenticated users
        <Button
          variant="contained"
          startIcon={<LoginIcon />}
          sx={{
            backgroundColor: "darkgray",
            color: "white",
            "&:hover": {
              backgroundColor: "darkgray",
            },
          }}
          onClick={() => loginWithPopup()}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Login;
