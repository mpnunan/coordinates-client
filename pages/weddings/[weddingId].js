import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { deleteWedding, getSingleWedding } from '../../utils/data/weddingData';
import { useAuth } from '../../utils/context/authContext';

export default function DeleteWedding() {
  const router = useRouter();
  const { weddingId } = router.query;
  const { user } = useAuth();
  const [wedding, setWedding] = useState({});

  const onDelete = () => {
    if (window.confirm(`Delete the ${wedding.name} wedding?`)) {
      deleteWedding(user.uid, weddingId).then(() => router.push('/weddings'));
    }
  };

  useEffect(() => {
    getSingleWedding(user.uid, weddingId).then(setWedding);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h2" component="h1">{wedding.name}</Typography>
      <Typography variant="body">{wedding.venue}</Typography>
      <Button onClick={onDelete}>Cancel Wedding</Button>
    </Paper>
  );
}
