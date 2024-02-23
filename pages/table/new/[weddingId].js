import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import TableForm from '../../../components/forms/TableForm';

export default function NewTable() {
  const router = useRouter();
  const { weddingId } = router.query;
  const wedding = Number(weddingId);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">New Table</Typography>
      <TableForm wedding={wedding} />
    </Paper>
  );
}
