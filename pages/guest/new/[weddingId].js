import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GuestForm from '../../../components/forms/GuestForm';
import { useAuth } from '../../../utils/context/authContext';
import getParticipants from '../../../utils/data/participantData';

export default function NewGuest() {
  const [participants, setParticipants] = useState([]);
  const router = useRouter();
  const { weddingId } = router.query;
  const wedding = Number(weddingId);
  const { user } = useAuth();

  useEffect(() => {
    getParticipants(user.uid, weddingId).then(setParticipants);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">New Guest</Typography>
      <GuestForm
        wedding={wedding}
        participantArray={participants}
      />
    </Paper>
  );
}
