import { Box } from "@mui/material";
import CardContainer from "./homepage/CardContainer";

const Dashboard = () => {
  return (
    <Box component="div" className="content-page dashboard-page">
      <section className="welcome-panel">
        <p className="welcome-eyebrow">A better kind of listening</p>
        <h1 className="welcome-title">
          Find your next <span>favorite.</span>
        </h1>
        <p className="welcome-copy">
          Explore fresh picks, familiar sounds, and the music you’ll want to
          come back to.
        </p>
      </section>
      <CardContainer />
    </Box>
  );
};

export default Dashboard;
