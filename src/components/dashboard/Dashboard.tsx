import { Box } from "@mui/material";
import CardContainer from "./homepage/CardContainer";

const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 5,
        ml: 24,
      }}>
      <CardContainer />
    </Box>
  );
};

export default Dashboard;
