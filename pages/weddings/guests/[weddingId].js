/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getGuestList } from '../../../utils/data/guestData';
import { useAuth } from '../../../utils/context/authContext';
import getParticipants from '../../../utils/data/participantData';
import SortedGuestList from '../../../components/guests/SortedGuestList';

export default function WeddingGuestList() {
  const [participantA, setParticipantA] = useState([]);
  const [participantB, setParticipantB] = useState({});
  const [sideAGuestList, setSideAGuestList] = useState({});
  const [sideBGuestList, setSideBGuestList] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { weddingId } = router.query;

  const setGuestList = (a, b) => {
    getGuestList(user.uid, weddingId, a.id)
      .then(setSideAGuestList)
      .then(() => {
        getGuestList(user.uid, weddingId, b.id)
          .then(setSideBGuestList);
      });
  };

  useEffect(() => {
    getParticipants(user.uid, weddingId)
      .then((data) => {
        setParticipantA(data[0]);
        setParticipantB(data[1]);
      });
  }, [user.uid, weddingId]);

  useEffect(() => {
    setGuestList(participantA, participantB);
  }, [participantA, participantB]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Guest List</Typography>
      <Box className="guestListSection">
        <Box className="guestListLeft">
          <Typography variant="h2">{participantA.full_name}</Typography>
          <SortedGuestList
            key={`fullList-${participantA.id}`}
            guests={sideAGuestList.guests}
            family={sideAGuestList.family}
            party={sideAGuestList.party}
            couples={sideAGuestList.couples}
            problems={sideAGuestList.problems}
          />
        </Box>
        <Box className="guestListRight">
          <Typography variant="h2">{participantB.full_name}</Typography>
          <SortedGuestList
            key={`fullList-${participantB.id}`}
            guests={sideBGuestList.guests}
            family={sideBGuestList.family}
            party={sideBGuestList.party}
            couples={sideBGuestList.couples}
            problems={sideBGuestList.problems}
          />
        </Box>
      </Box>
    </Paper>
  );
}
