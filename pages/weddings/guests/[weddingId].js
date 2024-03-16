import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Paper, Typography } from '@mui/material';
import { useAuth } from '../../../utils/context/authContext';
import getParticipants from '../../../utils/data/participantData';
import ParticipantGuests from '../../../components/participants/ParticipantGuests';

export default function WeddingGuestList() {
  const [participants, setParticipants] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { weddingId } = router.query;

  useEffect(() => {
    getParticipants(user.uid, weddingId).then(setParticipants);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Guest List</Typography>
      <Box className="guestListSection">
        <Box className="guestList">
          {participants.map((participant) => (
            <ParticipantGuests
              key={`listDisplay-${participant.id}`}
              uid={user.uid}
              weddingId={weddingId}
              participantId={participant.id}
              fullName={participant.full_name}
              index={participants.indexOf(participant)}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
