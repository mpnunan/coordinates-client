import { Paper, Typography } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <Paper elevation={22}>
      <Typography variant="h1">Coordinates</Typography>
      <Typography variant="h2">Welcome {user.fbUser.displayName}!</Typography>
    </Paper>
  );
}

export default Home;
