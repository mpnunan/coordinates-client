import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { getSingleReadOnlyReceptionTable } from '../../utils/data/receptionTableData';

export default function DeleteTable() {
  const router = useRouter();
  const { tableId } = router.query;
  const [table, setTable] = useState({});

  useEffect(() => {
    getSingleReadOnlyReceptionTable(tableId).then(setTable);
  }, [tableId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{`Table ${table.number}`}</Typography>
      <Typography variant="body">{`Seats ${table.capacity} guests`}</Typography>
    </Paper>
  );
}
