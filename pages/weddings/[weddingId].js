import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { getSingleWedding } from '../../utils/data/weddingData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewWedding() {
  const router = useRouter();
  const { weddingId } = router.query;
  const { user } = useAuth();
  const [wedding, setWedding] = useState({});

  useEffect(() => {
    getSingleWedding(user.uid, weddingId).then(setWedding);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{wedding.name}</Typography>
    </Paper>
  );
}
