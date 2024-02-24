import { Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getPlanner } from '../../utils/data/plannerData';

export default function Profile() {
  const { user } = useAuth();
  const [planner, setPlanner] = useState();

  useEffect(() => {
    getPlanner(user.uid, user.id).then(setPlanner);
  }, [user.id, user.uid]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">
        {planner?.full_name}
      </Typography>
      <Link passHref href="/profile/update">
        <Button variant="outlined">Update Details</Button>
      </Link>
      <Typography variant="h5" component="h2">
        {planner?.email}
      </Typography>
      <Typography variant="h5" component="h3">
        {planner?.phone_number}
      </Typography>
    </Paper>
  );
}
