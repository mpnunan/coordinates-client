import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { deleteGuest, getSingleGuest } from '../../utils/data/guestData';

export default function DeleteTable() {
  const router = useRouter();
  const { guestId } = router.query;
  const [guest, setGuest] = useState({});

  const onDelete = () => {
    if (window.confirm(`Remove ${guest.first_name} ${guest.last_name} from wedding?`)) {
      deleteGuest(guestId).then(() => router.push(`/weddings/guests/${guest.wedding_id}`));
    }
  };

  useEffect(() => {
    getSingleGuest(guestId).then(setGuest);
  }, [guestId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{guest.first_name} {guest.last_name}</Typography>
      <Typography variant="body">{guest.seated ? `Table ${guest.table_number}` : null}</Typography>
      <Button onClick={onDelete}>Remove Guest</Button>
    </Paper>
  );
}
