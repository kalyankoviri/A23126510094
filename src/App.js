import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, CssBaseline } from "@mui/material";
import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <Box sx={{ bgcolor: "#1976d2", color: "white", p: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Campus Notifications
          </Typography>
        </Box>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="All Notifications" />
          <Tab label="Priority Notifications" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {tab === 0 && <AllNotifications />}
          {tab === 1 && <PriorityNotifications />}
        </Box>
      </Box>
    </>
  );
}

export default App;