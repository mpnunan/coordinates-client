import { useRouter } from 'next/router';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSingleReceptionTable } from '../../../utils/data/receptionTableData';
import TableForm from '../../../components/forms/TableForm';

export default function TableDetailEdit() {
  const router = useRouter();
  const { tableId } = router.query;
  const [table, setTable] = useState({});

  useEffect(() => {
    getSingleReceptionTable(tableId).then(setTable);
  }, [tableId]);

  return (
    <Paper elevation={24}>
      <Typography variant="h2" component="h1">Edit Table Details</Typography>
      <TableForm
        key={`update-${table.id}`}
        id={table.id}
        wedding={table.wedding_id}
        number={table.number}
        capacity={table.capacity}
      />
    </Paper>
  );
}
