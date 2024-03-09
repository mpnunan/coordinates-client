import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getGuestList } from '../../../utils/data/guestData';
import { useAuth } from '../../../utils/context/authContext';
import getParticipants from '../../../utils/data/participantData';
import SortedGuestList from '../../../components/guests/SortedGuestList';

export default function WeddingGuestList() {
  const [participantA, setParticipantA] = useState({});
  const [participantB, setParticipantB] = useState({});
  const [sideAGuestList, setSideAGuestList] = useState({});
  const [sideBGuestList, setSideBGuestList] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { weddingId } = router.query;

  useEffect(() => {
    getGuestList(user.uid, weddingId, participantA.id)
      .then(setSideAGuestList);
  }, [participantA.id, user.uid, weddingId]);

  useEffect(() => {
    getGuestList(user.uid, weddingId, participantB.id)
      .then(setSideBGuestList);
  }, [participantB.id, user.uid, weddingId]);

  useEffect(() => {
    getParticipants(user.uid, weddingId).then((weddingData) => {
      setParticipantA(weddingData[0]);
      setParticipantB(weddingData[1]);
    });
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Guest List</Typography>
      <Box className="guestListSection">
        <Box className="guestListLeft">
          <Typography variant="h2">{participantA.full_name}</Typography>
          <SortedGuestList key={`fullList-${participantA.id}`} guestListObj={sideAGuestList} />
        </Box>
        <Box className="guestListRight">
          <Typography variant="h2">{participantB.full_name}</Typography>
          <SortedGuestList key={`fullList-${participantB.id}`} guestListObj={sideBGuestList} />
        </Box>
      </Box>
    </Paper>
  );
}
