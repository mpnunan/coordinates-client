import { useRouter } from 'next/router';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSingleGuest } from '../../../utils/data/guestData';
import GuestForm from '../../../components/forms/GuestForm';

export default function GuestEdit() {
  const router = useRouter();
  const { guestId } = router.query;
  const [guest, setGuest] = useState({});

  useEffect(() => {
    getSingleGuest(guestId).then(setGuest);
  }, [guestId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Edit Table Details</Typography>
      <GuestForm
        key={`update-${guest.id}`}
        id={guest.id}
        firstName={guest.first_name}
        lastName={guest.last_name}
        wedding={guest.wedding_id}
      />
    </Paper>
  );
}
