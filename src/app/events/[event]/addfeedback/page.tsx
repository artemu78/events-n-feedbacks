'use client';
import { useWhisper } from '@kkaczynski/use-whisper';
import {
  KeyboardVoice as KeyboardVoiceIcon,
  StopCircle as StopCircleIcon,
} from '@mui/icons-material';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  Link as MUILink,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import HiddenUserIdField from '@/components/userfield';

import { formSubmitAction } from './formaction';

const AddFeedbackPage = ({ params }: { params: { event: string } }) => {
  const [suggestions, setSuggestions] = useState('');

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_TOKEN,
  });
  const eventId = params.event;
  // const eventData = await getEventData(eventId);

  const handleRecord = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // useEffect(() => {
  //   console.log('adding suggestion', transcript.text, 'to', suggestions);
  //   setSuggestions(suggestions + '\n' + transcript.text);
  // }, [transcript.text || '', suggestions]);

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
            {/* {eventData?.date} */} fake date
          </MUILink>
        </Link>
        <Typography color="text.primary">Add feedback 1</Typography>
      </Breadcrumbs>

      <Stack
        direction="row"
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography component="h1" variant="h5">
          Add new feedback
        </Typography>
        <IconButton onClick={handleRecord}>
          {recording ? (
            <StopCircleIcon />
          ) : transcribing ? (
            <CircularProgress />
          ) : (
            <KeyboardVoiceIcon />
          )}
        </IconButton>
      </Stack>

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
          // onChange={(e) => setSuggestions(e.target.value)}
          value={transcript.text}
          defaultValue={''}
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
