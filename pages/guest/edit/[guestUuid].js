import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { deleteGuest, getSingleGuest } from '../../../utils/data/guestData';
import GuestForm from '../../../components/forms/GuestForm';

export default function EditGuest() {
  const router = useRouter();
  const { guestUuid } = router.query;
  const [guest, setGuest] = useState({});

  const onDelete = () => {
    if (window.confirm(`Remove ${guest.first_name} ${guest.last_name} from wedding?`)) {
      deleteGuest(guestUuid).then(() => router.push(`/weddings/guests/${guest.wedding_id}`));
    }
  };

  useEffect(() => {
    getSingleGuest(guestUuid).then(setGuest);
  }, [guestUuid]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{`${guest.first_name} ${guest.last_name}`}</Typography>
      <Typography variant="body">{guest.seated ? `Table ${guest.table_number}` : null}</Typography>
      <ButtonGroup>
        <GuestForm
          uuid={guest.uuid}
          firstName={guest.first_name}
          lastName={guest.last_name}
          wedding={guest.wedding_id}
          participant={guest.participant?.uuid}
          family={guest.family}
          parent={guest.parent}
          party={guest.party}
          primary={guest.primary}
        />
        <Button variant="text" onClick={onDelete}>Remove Guest</Button>
        <Link passHref href={`/weddings/guests/${guest.wedding_id}`}>
          <Button variant="text">Back to Guest List</Button>
        </Link>
      </ButtonGroup>
    </Paper>
  );
}
