/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { List } from '@mui/material';
import { getSingleReceptionTable } from '../../../utils/data/receptionTableData';
import { getGuests } from '../../../utils/data/guestData';
import TableGuest from '../../../components/tables/TableGuest';
import NotTableGuest from '../../../components/tables/NotTableGuest';

export default function TableEdit() {
  const [table, setTable] = useState({});
  const [weddingId, setWeddingId] = useState(0);
  const [guests, setGuests] = useState([]);
  const router = useRouter();
  const { tableId } = router.query;

  const tableIdProp = Number(tableId);

  const getTable = (id) => {
    getSingleReceptionTable(id).then((data) => {
      setTable(data);
      setWeddingId(data.wedding_id);
    });
  };

  const guestList = (wedding) => {
    getGuests(wedding).then(setGuests);
  };

  const updateGuests = () => {
    guestList(weddingId);
  };

  useEffect(() => {
    getTable(tableId);
  }, [tableId]);

  useEffect(() => {
    guestList(weddingId);
  }, [weddingId]);

  return (
    <section>
      <h1>{`Table ${table.number}`}</h1>
      <div>
        <h2>Seated Guests</h2>
        <List>
          {guests?.map((guest) => (
            guest.table_number === table.number ? <TableGuest key={`${guest.id}-seated`} id={guest.id} fullName={guest.full_name} tableId={tableIdProp} onUpdate={updateGuests} /> : null
          ))}
        </List>
      </div>
      <div>
        <h2>Available Guests</h2>
        <List>
          {guests?.map((guest) => (
            guest.seated === false ? <NotTableGuest key={`${guest.id}-available`} id={guest.id} fullName={guest.full_name} tableId={tableIdProp} onUpdate={updateGuests} /> : null
          ))}
        </List>
      </div>
    </section>
  );
}
