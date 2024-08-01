import React from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import {
  FaPlus as AddIcon,
  FaPlay as PlayArrowIcon,
  FaCalendarAlt as CalendarTodayIcon,
  FaEllipsisV as MoreVertIcon,
} from "react-icons/fa";

const Tracker: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "50px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="What are you working on?"
        />
        <IconButton>
          <AddIcon color="primary" />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "0 16px",
            whiteSpace: "nowrap",
          }}
        >
          <span>00:00:00</span>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrowIcon />}
        >
          Start
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
          This week <span style={{ float: "right" }}>Week total: 00:00:02</span>
        </Typography>
        <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Today
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add description"
              //   InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1 } }}
            />

            <Button variant="text" startIcon={<AddIcon />} sx={{ ml: 2 }}>
              Project
            </Button>

            <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>
              21:22 - 21:22
            </Typography>
            <IconButton>
              <CalendarTodayIcon color="primary" />
            </IconButton>
            <Typography sx={{ mx: 2, whiteSpace: "nowrap" }}>
              00:00:02
            </Typography>
            <IconButton>
              <PlayArrowIcon color="primary" />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Divider />
          <Typography sx={{ mt: 1, textAlign: "right" }}>
            Total: 00:00:02
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Tracker;
