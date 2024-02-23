/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  List,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
      <Link passHref href={`/guest/new/${weddingId}`}>
        <Button>Add a Guest</Button>
      </Link>
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
