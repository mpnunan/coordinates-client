import { Paper, Typography } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <section>
      <Paper elevation={24}>
        <Typography variant="h1">
          {user.fbUser.displayName}
        </Typography>
        <Typography variant="h5" component="h2">
          {user.email}
        </Typography>
        <Typography variant="h5" compnent="h3">
          {user.phone_number}
        </Typography>
      </Paper>
    </section>
  );
}
