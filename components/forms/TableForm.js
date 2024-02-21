import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { createReceptionTable, updateReceptionTable } from '../../utils/data/receptionTableData';

const initialState = {
  number: 0,
  capacity: 0,
};

export default function TableForm({
  id,
  wedding,
  number,
  capacity,
}) {
  const [table, setTable] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (id > 0) {
      setTable({
        wedding,
        number,
        capacity,
      });
    }
  }, [id, wedding, number, capacity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id > 0) {
      updateReceptionTable(id, table).then(() => router.push(`/weddings/tables/${wedding}`));
    } else {
      createReceptionTable({ ...table, wedding }).then(() => router.push(`/weddings/tables/${wedding}`));
    }
  };

  return (
    <FormControl
      id="tableForm"
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Table Number"
        name="number"
        value={table.number}
        required
        onChange={handleChange}
      />
      <TextField
        label="Table Capacity"
        name="capacity"
        value={table.capacity}
        required
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="outlined"
        color="success"
      >
        Submit
      </Button>
    </FormControl>
  );
}

TableForm.propTypes = {
  id: PropTypes.number,
  wedding: PropTypes.number,
  number: PropTypes.number,
  capacity: PropTypes.number,
};

TableForm.defaultProps = {
  id: 0,
  number: initialState.number,
  capacity: initialState.capacity,
  wedding: 0,
};
