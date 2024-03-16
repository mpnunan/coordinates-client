/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { useAuth } from '../../../utils/context/authContext';
import { addTableGuest, getReceptionTables } from '../../../utils/data/receptionTableData';
import { getUnseatedGuests } from '../../../utils/data/guestData';
import UnseatedGuest from '../../../components/tables/UnseatedGuest';
import getParticipants from '../../../utils/data/participantData';
import TableLayout from '../../../components/tables/TableLayout';

export default function WeddingTables() {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tables, setTables] = useState({});
  const [unseated, setUnseated] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { weddingId } = router.query;

  const handleChecked = (e) => {
    const { value, checked } = e.target;
    const selectedArray = selected;
    if (checked) {
      selectedArray.push(value);
    } else {
      selectedArray.splice(selectedArray.indexOf(value), 1);
    }
    setSelected(selectedArray);
  };

  const guestLocations = () => {
    getReceptionTables(user.uid, weddingId)
      .then(setTables)
      .then(() => {
        getUnseatedGuests(user.uid, weddingId).then(setUnseated);
      });
  };
  const makeAdditions = async (tableUuid) => {
    const additions = await Promise.all([
      selected.forEach((guestUuid) => {
        addTableGuest(tableUuid, { guest: guestUuid });
      }),
    ]);
    return additions;
  };

  const addSelected = async (tableUuid) => {
    const readyToUpdate = await makeAdditions(tableUuid)
      .then(() => {
        setSelected([]);
      });
    return readyToUpdate;
  };

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
      <Box className="tableLayout">
        <Box className="unseatedGuests" component="aside">
          <Typography variant="h2">Not Seated</Typography>
          {unseated.guests?.map((guest) => (
            <UnseatedGuest
              key={`unseated-${guest.id}`}
              className={`layout-guest-${participants.indexOf(guest.participant.id)}`}
              fullName={guest.full_name}
              uuid={guest.uuid}
              party={guest.party}
              primary={guest.primary}
              family={guest.family}
              parent={guest.parent}
              partner={guest.partner}
              onChecked={handleChecked}
            />
          ))}
        </Box>
        <Box className="tableSection" component="div">
          {tables.reception_tables?.map((table) => (
            <TableLayout
              key={`layout-table-${table.id}`}
              uuid={table.uuid}
              number={table.number}
              capacity={table.capacity}
              full={table.full}
              guests={table.guests}
              onUpdateTable={guestLocations}
              selectedFunc={addSelected}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
