import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { deleteReceptionTable, getSingleReceptionTable } from '../../../utils/data/receptionTableData';
import TableForm from '../../../components/forms/TableForm';

export default function DeleteTable() {
  const router = useRouter();
  const { tableUuid } = router.query;
  const [table, setTable] = useState({});

  const onDelete = () => {
    if (window.confirm(`Delete Table ${table.number}?`)) {
      deleteReceptionTable(tableUuid).then(() => router.push(`/weddings/tables/${table.wedding_id}`));
    }
  };

  useEffect(() => {
    getSingleReceptionTable(tableUuid).then(setTable);
  }, [tableUuid]);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{`Table ${table.number}: Seats ${table.capacity}`}</Typography>
      <TableForm
        uuid={table.uuid}
        wedding={table.wedding_id}
        capacity={table.capacity}
      />
      <Button onClick={onDelete}>Remove Table</Button>
    </Paper>
  );
}
