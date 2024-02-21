import { Paper, Typography } from '@mui/material';
import WeddingForm from '../../components/forms/WeddingForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewGuest() {
  const { user } = useAuth();
  return (
    <Paper elevation={24}>
      <Typography variant="h2" component="h1">New Wedding</Typography>
      <WeddingForm uid={user.uid} />
    </Paper>
  );
}
