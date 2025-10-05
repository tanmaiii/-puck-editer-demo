import "@measured/puck/puck.css";
import { Box } from "@mui/material";
import React from "react";
import "./index.css";
import { SurveyCreatorWrapper } from "./layouts/punk";

const App: React.FC = () => {
  return (
    <Box
      className="app"
      sx={{
        backgroundColor: "#F6F8FF",
        overflow: "hidden",
      }}
    >
      <SurveyCreatorWrapper />
    </Box>
  );
};

export default App;
