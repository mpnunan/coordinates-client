/* eslint-disable import/no-extraneous-dependencies */
import { Paper, Typography } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <section>
      <Paper elevation={24}>
        <Typography variant="h2" component="h1">
          {user.fbUser.displayName}
        </Typography>
        <Typography variant="body">
          {user.email}
        </Typography>
        <Typography variant="body">
          {user.phone_number}
        </Typography>
      </Paper>
    </section>
  );
}
