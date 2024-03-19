import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import { useAuth } from '../../../utils/context/authContext';
import { deleteWedding, getSingleWedding } from '../../../utils/data/weddingData';
import WeddingForm from '../../../components/forms/WeddingForm';

export default function EditWedding() {
  const router = useRouter();
  const { weddingId } = router.query;
  const { user } = useAuth();
  const [wedding, setWedding] = useState({});

  const onDelete = () => {
    if (window.confirm(`Delete the ${wedding.name} wedding?`)) {
      deleteWedding(user.uid, wedding.uuid).then(() => router.push('/weddings'));
    }
  };

  useEffect(() => {
    getSingleWedding(user.uid, weddingId).then(setWedding);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{wedding.name}</Typography>
      <Typography variant="body">{wedding.venue}</Typography>
      <ButtonGroup>
        <WeddingForm
          uuid={wedding.uuid}
          venue={wedding.venue}
          weddingName={wedding.name}
          uid={user.uid}
        />
        <Button variant="text" onClick={onDelete}>Cancel Wedding</Button>
      </ButtonGroup>
    </Paper>
  );
}
