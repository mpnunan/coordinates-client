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
import ParticipantGuests from '../../../components/participants/ParticipantGuests';
import GuestForm from '../../../components/forms/GuestForm';

export default function WeddingGuestList() {
  const [participants, setParticipants] = useState([]);
  const [toggleNum, setToggleNum] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  const { weddingId } = router.query;
  const wedding = Number(weddingId);

  const updateFunc = () => {
    const toggled = toggleNum + 1;
    setToggleNum(toggled);
    return toggleNum;
  };

  useEffect(() => {
    getParticipants(user.uid, weddingId).then(setParticipants);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Guest List</Typography>
      <ButtonGroup>
        <GuestForm
          wedding={wedding}
          onUpdate={updateFunc}
        />
        <Link passHref href="/weddings">
          <Button variant="text">Back to Weddings</Button>
        </Link>
      </ButtonGroup>
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
              updateToggle={toggleNum}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
