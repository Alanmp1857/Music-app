import { Box } from "@mui/material";
import CardContainer from "./homepage/CardContainer";

const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        p: 3,
        mt: 5,
        ml: {
          xs: 5, // Set ml to 2 on xs breakpoint
          sm: 8, // Set ml to 2 on sm breakpoint
          md: 14, // Default ml value for other breakpoints
        },
        mr: "auto",
        backgroundColor: "#121c21",
      }}>
      <CardContainer />
    </Box>
  );
};

export default Dashboard;
