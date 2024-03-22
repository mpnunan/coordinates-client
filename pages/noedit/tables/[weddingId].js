/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../../utils/context/authContext';
import { getReceptionTables } from '../../../utils/data/receptionTableData';
import { getUnseatedGuests } from '../../../utils/data/guestData';
import getParticipants from '../../../utils/data/participantData';
import ReadOnlyTableLayout from '../../../components/tables/ReadOnlyTableLayout';
import ReadOnlyUnseatedGuest from '../../../components/tables/ReadOnlyUnseatedGuest';

export default function ReadOnlyWeddingTables() {
  const [participants, setParticipants] = useState([]);
  const [tables, setTables] = useState({});
  const [unseated, setUnseated] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { weddingId } = router.query;

  const participantArray = (uid, id) => {
    getParticipants(uid, id).then((data) => {
      const idArray = [];
      data.forEach((participant) => {
        idArray.push(participant.id);
      });
      setParticipants(idArray);
    });
  };

  useEffect(() => {
    participantArray(user.uid, weddingId);
  }, [user.uid, weddingId]);

  useEffect(() => {
    getReceptionTables(user.uid, weddingId).then(setTables);
  }, [user.uid, weddingId]);

  useEffect(() => {
    getUnseatedGuests(user.uid, weddingId).then(setUnseated);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <ButtonGroup>
        <Link passHref href="/weddings">
          <Button variant="text">Back to Weddings</Button>
        </Link>
      </ButtonGroup>
      <Box className="tableLayout">
        <Box className="unseatedGuests" component="aside">
          <Typography variant="h2">Not Seated</Typography>
          {unseated.guests?.map((guest) => (
            <ReadOnlyUnseatedGuest
              key={`unseated-${guest.id}`}
              className={`layout-guest-${participants.indexOf(guest.participant.id)}`}
              fullName={guest.full_name}
              party={guest.party}
              primary={guest.primary}
              family={guest.family}
              parent={guest.parent}
              partner={guest.partner}
            />
          ))}
        </Box>
        <Box className="tableSection" component="div">
          {tables.reception_tables?.map((table) => (
            <ReadOnlyTableLayout
              key={`layout-table-${table.id}`}
              number={table.number}
              capacity={table.capacity}
              full={table.full}
              guests={table.guests}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
