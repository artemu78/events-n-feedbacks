import {
  Button,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from "react";

import { formSubmitAction } from "./formaction";

const EventForm = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add New Event
      </Typography>
      <form action={formSubmitAction}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Moderator name"
          name="moderatorName"
          type="text"
          autoFocus
        />

        <TextField
          label="Address"
          id="address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="address"
          type="text"
        />

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="eventDate">Event date</InputLabel>
          <TextField
            id="eventDate"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            //   label="Event date"
            name="eventDate"
            type="date"
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "24px" }}
        >
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
