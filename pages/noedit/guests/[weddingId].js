import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../../utils/context/authContext';
import getParticipants from '../../../utils/data/participantData';
import ReadOnlyParticipantGuests from '../../../components/participants/ReadOnlyParticipantGuests';

export default function ReadOnlyWeddingGuestList() {
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
      <ButtonGroup>
        <Link passHref href="/weddings">
          <Button variant="text">Back to Weddings</Button>
        </Link>
      </ButtonGroup>
      <Box className="guestListSection">
        <Box className="guestList">
          {participants.map((participant) => (
            <ReadOnlyParticipantGuests
              key={`read_only-listDisplay-${participant.id}`}
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
