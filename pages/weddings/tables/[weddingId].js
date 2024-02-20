/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getReceptionTables } from '../../../utils/data/receptionTableData';
import TableDisplay from '../../../components/tables/TableDisplay';

export default function WeddingTables() {
  const [tables, setTables] = useState([]);
  const router = useRouter();
  const { weddingId } = router.query;

  const getTables = () => {
    getReceptionTables(weddingId).then(setTables);
  };

  useEffect(() => {
    getTables();
  }, []);

  console.warn(tables);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">Wedding Tables</Typography>
      {tables?.map((table) => (
        <TableDisplay
          key={`${table.id}-display`}
          id={table.id}
          number={table.number}
          capacity={table.capacity}
          guests={table.guests}
          full={table.full}
        />
      ))}
    </Paper>
  );
}
