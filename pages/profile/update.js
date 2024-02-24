import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PlannerUpdate from '../../components/forms/PlannerUpdate';
import { useAuth } from '../../utils/context/authContext';
import { getPlanner } from '../../utils/data/plannerData';

export default function TableDetailEdit() {
  let { user } = useAuth();
  const [planner, setPlanner] = useState({});

  useEffect(() => {
    getPlanner(user.uid, user.id).then(setPlanner);
  }, [user.id, user.uid]);

  user = { ...user, ...planner };

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Edit Table Details</Typography>
      <PlannerUpdate
        user={user}
      />
    </Paper>
  );
}
