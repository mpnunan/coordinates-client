import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { deleteReceptionTable, getSingleReceptionTable } from '../../utils/data/receptionTableData';

export default function DeleteTable() {
  const router = useRouter();
  const { tableId } = router.query;
  const [table, setTable] = useState({});

  const onDelete = () => {
    if (window.confirm(`Delete Table ${table.number}?`)) {
      deleteReceptionTable(tableId).then(() => router.push(`/weddings/tables/${table.wedding_id}`));
    }
  };

  useEffect(() => {
    getSingleReceptionTable(tableId).then(setTable);
  }, [tableId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{`Table ${table.number}`}</Typography>
      <Typography variant="body">{`Seats ${table.capacity} guests`}</Typography>
      <Button onClick={onDelete}>Remove Table</Button>
    </Paper>
  );
}
