/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  ButtonGroup,
  List,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getGuests } from '../../../utils/data/guestData';
import GuestList from '../../../components/guests/GuestList';
import { useAuth } from '../../../utils/context/authContext';

export default function WeddingGuestsOld() {
  const [guests, setGuests] = useState([]);
  const router = useRouter();
  const { weddingId } = router.query;
  const { user } = useAuth();

  const allGuests = () => {
    getGuests(user.uid, weddingId).then((data) => setGuests(data.guests));
  };

  useEffect(() => {
    allGuests();
  }, []);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Guest List</Typography>
      <ButtonGroup>
        <Link passHref href="/weddings">
          <Button>Back to Weddings</Button>
        </Link>
        <Link passHref href={`/guest/new/${weddingId}`}>
          <Button>Add a Guest</Button>
        </Link>
        <Link passHref href={`/weddings/tables/${weddingId}`}>
          <Button>Manage Tables</Button>
        </Link>
      </ButtonGroup>
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
