import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import GuestForm from '../../../components/forms/GuestForm';

export default function NewGuest() {
  const router = useRouter();
  const { weddingId } = router.query;
  const wedding = Number(weddingId);
  return (
    <Paper elevation={24}>
      <Typography variant="h1">New Guest</Typography>
      <GuestForm
        wedding={wedding}
      />
    </Paper>
  );
}
