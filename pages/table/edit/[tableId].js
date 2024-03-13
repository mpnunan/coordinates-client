import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { List, Paper, Typography } from '@mui/material';
import { getSingleReceptionTable } from '../../../utils/data/receptionTableData';
import { getGuests } from '../../../utils/data/guestData';
import TableGuest from '../../../components/tables/TableGuest';
import NotTableGuest from '../../../components/tables/NotTableGuest';
import { useAuth } from '../../../utils/context/authContext';

export default function TableEdit() {
  const [table, setTable] = useState({});
  const [weddingId, setWeddingId] = useState(0);
  const [guests, setGuests] = useState([]);
  const router = useRouter();
  const { tableId } = router.query;
  const { user } = useAuth();

  const getTable = (id) => {
    getSingleReceptionTable(id).then((data) => {
      setTable(data);
      setWeddingId(data.wedding_id);
    });
  };

  const guestList = (uid, wedding) => {
    getGuests(uid, wedding).then((data) => setGuests(data.guests));
  };

  const updateGuests = () => {
    guestList(user.uid, weddingId);
  };

  useEffect(() => {
    getTable(tableId);
  }, [tableId]);

  useEffect(() => {
    guestList(user.uid, weddingId);
  }, [user.uid, weddingId]);

  console.warn(weddingId);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{`Table ${table.number}`}</Typography>
      <Paper elevation={18}>
        <Typography variant="h2">Seated Guests</Typography>
        <List>
          {guests?.map((guest) => (
            guest.table_number === table.number ? <TableGuest key={`${guest.id}-seated`} id={guest.id} fullName={guest.full_name} tableId={tableId} onUpdate={updateGuests} /> : null
          ))}
        </List>
      </Paper>
      <Paper elevation={18}>
        <Typography variant="h2">Available Guests</Typography>
        <List>
          {guests?.map((guest) => (
            guest.seated === false ? <NotTableGuest key={`${guest.id}-available`} id={guest.id} fullName={guest.full_name} tableId={tableId} onUpdate={updateGuests} /> : null
          ))}
        </List>
      </Paper>
    </Paper>
  );
}
