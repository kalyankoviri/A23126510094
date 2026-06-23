import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Chip, Box,
  CircularProgress, Alert, Pagination
} from "@mui/material";
import { fetchNotifications } from "../api/notifications";

const TYPE_COLORS = {
  Placement: "success",
  Result: "warning",
  Event: "info",
};

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [viewed, setViewed] = useState(() => {
    const saved = localStorage.getItem("viewedNotifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setLoading(true);
    fetchNotifications({ page, limit: 10 })
      .then((data) => {
        setNotifications(Array.isArray(data) ? data : data.notifications || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch notifications");
        setLoading(false);
      });
  }, [page]);

  const markViewed = (id) => {
    const updated = [...new Set([...viewed, id])];
    setViewed(updated);
    localStorage.setItem("viewedNotifications", JSON.stringify(updated));
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h6" mb={2}>All Notifications ({notifications.length})</Typography>
      {notifications.map((n) => (
        <Card
          key={n.id}
          onClick={() => markViewed(n.id)}
          sx={{
            mb: 2,
            cursor: "pointer",
            border: viewed.includes(n.id) ? "1px solid #ccc" : "2px solid #1976d2",
            bgcolor: viewed.includes(n.id) ? "#fafafa" : "#fff",
            opacity: viewed.includes(n.id) ? 0.75 : 1,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Chip
                label={n.type}
                color={TYPE_COLORS[n.type] || "default"}
                size="small"
              />
              {!viewed.includes(n.id) && (
                <Chip label="NEW" color="primary" size="small" />
              )}
            </Box>
            <Typography variant="body1">{n.message}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(n.timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination count={5} page={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </Box>
  );
}