import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material';

import { Feedback } from '@/types';

const SingleFeedback = ({ feedback }: { feedback: Feedback }) => {
  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <UserData feedback={feedback} />
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

const UserData = ({ feedback }: { feedback: Feedback }) => {
  const isAnonymous = feedback.anonymous === 'true';
  let user = { ...feedback.user };
  const createDateTime = feedback.createDateTime;
  const date = new Date(createDateTime);
  if (isAnonymous) {
    user.photoURL = undefined;
    user.displayName = 'Anonimous';
  }
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt={user?.displayName || undefined}
        src={user?.photoURL || undefined}
      />
      <Typography variant="body1" color="#757575">
        {user?.displayName}
      </Typography>
      <Typography variant="body2" color="#757575">
        {date.toLocaleString() || ''}
      </Typography>
    </Stack>
  );
};

export default SingleFeedback;
