import {
  Button,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import HiddenUserIdField from '@/components/userfield';

import { formSubmitAction } from './formaction';

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

        <TextField
          label="Topic"
          id="topic"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          fullWidth
          name="topic"
          type="text"
        />

        <TextField
          label="Logo"
          variant="outlined"
          margin="normal"
          fullWidth
          name="logo"
          type="file"
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
          style={{ marginTop: '24px' }}
        >
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
