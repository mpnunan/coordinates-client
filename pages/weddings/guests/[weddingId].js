/* eslint-disable react-hooks/exhaustive-deps */
import { List, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getGuests } from '../../../utils/data/guestData';
import GuestList from '../../../components/guests/GuestList';

export default function WeddingGuests() {
  const [guests, setGuests] = useState([]);
  const router = useRouter();
  const { weddingId } = router.query;

  const allGuests = () => {
    getGuests(weddingId).then(setGuests);
  };

  useEffect(() => {
    allGuests();
  }, []);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Guest List</Typography>
      <List>
        {guests?.map((guest) => (
          <GuestList
            key={guest.id}
            id={guest.id}
            fullName={guest.full_name}
            seated={guest.seated}
          />
        ))}
      </List>
    </Paper>
  );
}
