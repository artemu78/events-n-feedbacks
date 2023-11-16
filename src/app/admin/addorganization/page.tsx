import {
  Button,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

import { formSubmitAction } from './action';

const EventForm = () => {
  // const currentUser = useSelector((state: RootState) => state.user.user);
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add New Organization
      </Typography>
      <form action={formSubmitAction}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Title"
          name="title"
          type="text"
          autoFocus
        />

        <TextField
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          fullWidth
          name="description"
          type="text"
        />

        <TextField
          label="Site"
          variant="outlined"
          margin="normal"
          fullWidth
          name="site"
          type="url"
        />

        <TextField
          label="Instagram"
          variant="outlined"
          margin="normal"
          fullWidth
          name="instagram"
          type="url"
        />

        <TextField
          label="Facebook"
          variant="outlined"
          margin="normal"
          fullWidth
          name="facebook"
          type="url"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '24px' }}
        >
          Add organization
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
