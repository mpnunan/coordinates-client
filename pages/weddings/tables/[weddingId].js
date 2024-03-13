import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
} from '@mui/material';
import { useAuth } from '../../../utils/context/authContext';
import { getReceptionTables } from '../../../utils/data/receptionTableData';
import { getUnseatedGuests } from '../../../utils/data/guestData';
import UnseatedGuest from '../../../components/tables/UnseatedGuest';
import getParticipants from '../../../utils/data/participantData';
import TableLayout from '../../../components/tables/TableLayout';

export default function WeddingTables() {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tables, setTables] = useState([]);
  const [unseated, setUnseated] = useState([]);
  const router = useRouter();
  const { weddingId } = router.query;
  const { user } = useAuth();

  const handleChecked = (e) => {
    const { value, checked } = e.target;
    const selectedArray = selected;
    if (checked) {
      selectedArray.push(value);
    } else {
      selectedArray.splice(selectedArray.indexOf(value), 1);
    }
    setSelected(selectedArray);
    console.warn(selected);
  };

  const reRender = () => {
    getReceptionTables(user.uid, weddingId.then((data) => setTables(data.reception_tables)));
    getUnseatedGuests(user.uid, weddingId).then((data) => setUnseated(data.guests));
  };

  useEffect(() => {
    getReceptionTables(user.uid, weddingId).then((data) => setTables(data.reception_tables));
  }, [user.uid, weddingId]);

  useEffect(() => {
    getUnseatedGuests(user.uid, weddingId).then((data) => setUnseated(data.guests));
  }, [user.uid, weddingId]);

  useEffect(() => {
    getParticipants(user.uid, weddingId).then((data) => {
      const idArray = [];
      data.forEach((participant) => {
        idArray.push(participant.id);
      });
      setParticipants(idArray);
    });
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Box className="unseatedGuests" component="aside">
        {unseated.map((guest) => (
          <UnseatedGuest
            key={guest.id}
            fullName={guest.full_name}
            uuid={guest.uuid}
            party={guest.party}
            primary={guest.primary}
            family={guest.family}
            parent={guest.parent}
            partner={guest.partner}
            side={participants.indexOf(guest.participant.id)}
            onChecked={handleChecked}
          />
        ))}
      </Box>
      <Box className="tableLayout" component="div">
        {tables.map((table) => (
          <TableLayout
            key={table.id}
            uuid={table.uuid}
            number={table.number}
            capacity={table.capacity}
            full={table.full}
            guests={table.guests}
            onUpdateTable={reRender}
          />
        ))}
      </Box>
    </Paper>
  );
}
