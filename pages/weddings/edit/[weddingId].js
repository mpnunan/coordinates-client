import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WeddingForm from '../../../components/forms/WeddingForm';
import { getSingleWedding } from '../../../utils/data/weddingData';
import { useAuth } from '../../../utils/context/authContext';

export default function WeddingEdits() {
  const router = useRouter();
  const { weddingId } = router.query;
  const [wedding, setWedding] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleWedding(user.uid, weddingId).then(setWedding);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h2" component="h1">Edit Wedding</Typography>
      <WeddingForm
        key={`update-${wedding.id}`}
        id={wedding.id}
        venue={wedding.venue}
        weddingName={wedding.name}
        uid={user.uid}
      />
    </Paper>
  );
}
