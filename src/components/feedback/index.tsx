import { Grid, Paper, Typography } from '@mui/material';

import { Feedback } from '@/types';

const SingleFeedback = ({ feedback }: { feedback: Feedback }) => {
  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            From
          </Typography>
        </Grid>
        <Grid item xs={6} sm={10}>
          <Typography variant="body1">
            {feedback.anonymous === 'true' ? 'Anonimous' : feedback.sender}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            What was good
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body1">{feedback.good}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            What could be improved
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body1">{feedback.improve}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ color: '#757575' }}>
            Suggestion
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body1">{feedback.suggestion}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleFeedback;
