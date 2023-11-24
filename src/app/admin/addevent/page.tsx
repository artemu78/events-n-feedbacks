import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import HiddenUserIdField from '@/components/userfield';

import { formSubmitAction } from './formaction';
import Topic from './topic';

const EventForm = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add New Event
      </Typography>
      <form action={formSubmitAction}>
        <HiddenUserIdField />
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

        <Topic />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="eventDate">Logo</InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="logo"
            type="file"
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="eventDate">Event date</InputLabel>
          <TextField
            id="eventDate"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="eventDate"
            type="date"
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '24px' }}
        >
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
