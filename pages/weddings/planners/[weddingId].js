import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useAuth } from '../../../utils/context/authContext';
import { getWeddingPlanners } from '../../../utils/data/plannerData';
import WeddingPlannerForm from '../../../components/forms/WeddingPlannerForm';

export default function WeddingPlanners() {
  const [weddingPlanners, setWeddingPlanners] = useState([]);
  const router = useRouter();
  const { weddingId } = router.query;
  const { user } = useAuth();

  const updateFunc = () => {
    getWeddingPlanners(user.uid, weddingId).then(setWeddingPlanners);
  };

  useEffect(() => {
    getWeddingPlanners(user.uid, weddingId).then(setWeddingPlanners);
  }, [user.uid, weddingId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Wedding Planners</Typography>
      <WeddingPlannerForm
        wedding={weddingId}
        onUpdate={updateFunc}
      />
      <Box className="weddingPlanners">
        {weddingPlanners?.map((planner) => (
          <Box
            key={`planners-${planner.planner.id}`}
            className={planner.readOnly === true ? 'weddingPlanners-planner readOnly' : 'weddingPlanners-planner'}
          >
            <WeddingPlannerForm
              plannerInfo={planner.planner.email || planner.planner.phone_number}
              email={planner.planner.email}
              phoneNumber={planner.planner.phone_number}
              fullName={`${planner.planner.first_name} ${planner.planner.last_name}`}
              readOnly={planner.readOnly}
              wedding={weddingId}
              onUpdate={updateFunc}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
