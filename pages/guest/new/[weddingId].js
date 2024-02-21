import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import GuestForm from '../../../components/forms/GuestForm';

export default function NewGuest() {
  const router = useRouter();
  const { weddingId } = router.query;
  const weddingIdNum = Number(weddingId);

  return (
    <Paper elevation={24}>
      <Typography variant="h2" component="h1">New Guest</Typography>
      <GuestForm wedding={weddingIdNum} />
    </Paper>
  );
}
