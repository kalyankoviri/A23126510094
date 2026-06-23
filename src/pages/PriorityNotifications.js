import React, { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Chip, Box,
  CircularProgress, Alert, FormControl,
  InputLabel, Select, MenuItem, TextField, Button
} from "@mui/material";
import { fetchNotifications } from "../api/notifications";

const TYPE_COLORS = {
  Placement: "success",
  Result: "warning",
  Event: "info",
};

const PRIORITY = { Placement: 1, Result: 2, Event: 3 };

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [viewed, setViewed] = useState(() => {
    const saved = localStorage.getItem("viewedNotifications");
    return saved ? JSON.parse(saved) : [];
  });

  const loadData = () => {
    setLoading(true);
    const params = { limit };
    if (type) params.notification_type = type;
    fetchNotifications(params)
      .then((data) => {
        const list = Array.isArray(data) ? data : data.notifications || [];
        const sorted = list.sort((a, b) => {
          const pd = (PRIORITY[a.type] || 99) - (PRIORITY[b.type] || 99);
          if (pd !== 0) return pd;
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNotifications(sorted.slice(0, limit));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch notifications");
        setLoading(false);
      });
  };

  useEffect(() => { loadData(); }, []);

  const markViewed = (id) => {
    const updated = [...new Set([...viewed, id])];
    setViewed(updated);
    localStorage.setItem("viewedNotifications", JSON.stringify(updated));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small" label="Limit" type="number"
          value={limit} onChange={(e) => setLimit(Number(e.target.value))}
          sx={{ width: 100 }}
        />
        <Button variant="contained" onClick={loadData}>Apply</Button>
      </Box>

      {loading && <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h6" mb={2}>Priority Notifications (Top {limit})</Typography>
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
              <Chip label={n.type} color={TYPE_COLORS[n.type] || "default"} size="small" />
              {!viewed.includes(n.id) && <Chip label="NEW" color="primary" size="small" />}
            </Box>
            <Typography variant="body1">{n.message}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(n.timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
