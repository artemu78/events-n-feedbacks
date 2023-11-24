'use client';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import * as React from 'react';

const Topic = () => {
  const [topic, setTopic] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageLoading, setImageLoading] = React.useState(false);

  const handleClicked = async () => {
    setImageLoading(true);
    const response = await fetch('/api/openai/dalle', {
      method: 'POST',
      body: JSON.stringify({ prompt: topic }),
    });
    const image = await response.json();
    setImageLoading(false);
    image.url && setImageUrl(image.url);
  };

  return (
    <>
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
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      {!imageLoading && (
        <Tooltip title={'Generate image based on topic'}>
          <Button
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleClicked}
            disabled={topic.length < 10}
            fullWidth
          >
            Generate logo
          </Button>
        </Tooltip>
      )}
      {imageUrl && (
        <img src={imageUrl} style={{ maxWidth: '100%', borderRadius: '5px' }} />
      )}
      {imageLoading && (
        <Stack alignItems={'center'} sx={{ width: 1 }}>
          <CircularProgress />
        </Stack>
      )}
      <TextField
        name="dallePictureUrl"
        type="hidden"
        value={imageUrl}
        sx={{ display: 'none' }}
      />
    </>
  );
};

export default Topic;
