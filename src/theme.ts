import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a78bfa",
    },
    secondary: {
      main: "#43d9c4",
    },
    background: {
      default: "#080d18",
      paper: "#111a2b",
    },
    text: {
      primary: "#f5f7fb",
      secondary: "#a7b3c8",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#080d18",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
