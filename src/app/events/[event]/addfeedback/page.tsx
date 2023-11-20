import {
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link as MUILink,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { getEventData } from '@/app/events/[event]/formaction';
import HiddenUserIdField from '@/components/userfield';

import { formSubmitAction } from './formaction';

const AddFeedbackPage = async ({ params }: { params: { event: string } }) => {
  const eventId = params.event;
  const eventData = await getEventData(eventId);

  return (
    <Container component="main" sx={{ width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Link href="/events" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Events
          </MUILink>
        </Link>
        <Link href={`/events/${eventId}`} passHref>
          <MUILink component="span" underline="hover" color="inherit">
            {eventData?.date}
          </MUILink>
        </Link>
        <Typography color="text.primary">Add feedback</Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h5">
        Add new feedback
      </Typography>
      <form action={formSubmitAction}>
        <HiddenUserIdField />
        <TextField
          name="eventId"
          value={eventId}
          type="hidden"
          sx={{ display: 'none' }}
        />

        <TextField
          label="Addressee"
          id="addressee"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="addressee"
          type="text"
        />

        <TextField
          label="What was good"
          multiline
          rows={3}
          id="good"
          variant="outlined"
          margin="normal"
          fullWidth
          name="good"
          type="text"
        />

        <TextField
          label="What could be better"
          multiline
          rows={3}
          id="improve"
          variant="outlined"
          margin="normal"
          fullWidth
          name="improve"
          type="text"
        />

        <TextField
          label="Any other suggestions"
          multiline
          rows={3}
          id="suggestion"
          variant="outlined"
          margin="normal"
          fullWidth
          name="suggestion"
          type="text"
        />
        <FormControlLabel
          control={<Switch name="anonymous" id="anonymous" value={true} />}
          label="Send anonymously"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '24px' }}
        >
          Add feedback
        </Button>
      </form>
    </Container>
  );
};

export default AddFeedbackPage;
