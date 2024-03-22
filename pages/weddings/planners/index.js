import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import Link from 'next/link';
import { useAuth } from '../../../utils/context/authContext';
import { getWeddings } from '../../../utils/data/weddingData';

export default function PlannerInvite() {
  const [weddings, setWeddings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getWeddings(user.uid).then(setWeddings);
  }, [user.uid]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">
        Choose Wedding
      </Typography>
      <Box className="weddingPlannerWeddings">
        {weddings.primary?.map((wedding) => (
          <Box
            key={`plannerWeddings-${wedding.wedding.id}`}
            className="weddingPlannerWeddings-wedding"
          >
            <Typography variant="h2">{wedding.wedding.name}</Typography>
            <Link passHref href={`/weddings/planners/${wedding.wedding.id}`}>
              <Button variant="text">Wedding Planners</Button>
            </Link>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
