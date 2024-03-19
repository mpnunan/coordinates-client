import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { getSingleReadOnlyGuest } from '../../utils/data/guestData';

export default function ViewGuest() {
  const router = useRouter();
  const { guestId } = router.query;
  const [guest, setGuest] = useState({});

  useEffect(() => {
    getSingleReadOnlyGuest(guestId).then(setGuest);
  }, [guestId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{guest.full_name}</Typography>
      <Typography variant="body">{guest.seated ? `Table ${guest.table_number}` : null}</Typography>
    </Paper>
  );
}
