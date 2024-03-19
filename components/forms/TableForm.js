import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';
import { createReceptionTable, updateReceptionTable } from '../../utils/data/receptionTableData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  capacity: 0,
  wedding: 0,
};

export default function TableForm({
  uuid,
  wedding,
  capacity,
  onUpdate,
}) {
  const [table, setTable] = useState(initialState);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tableCreated = () => {
    onUpdate();
    handleClose();
  };

  useEffect(() => {
    if (uuid.length > 0) {
      setTable({
        wedding,
        capacity,
      });
    }
  }, [uuid, wedding, capacity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uuid.length > 0) {
      updateReceptionTable(uuid, table).then(() => router.push(`/weddings/tables/${wedding}`));
    } else {
      createReceptionTable(user.uid, { ...table, wedding }).then(() => tableCreated());
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
      >
        {uuid.length > 0 ? 'Alter Table Details' : 'Create New Table'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {table.number ? `Table ${table.number}` : 'Table Creation'}
        </DialogTitle>
        <DialogContent>
          <FormControl
            id="tableForm"
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Table Capacity"
              name="capacity"
              value={table.capacity}
              required
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="text"
            >
              Submit
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}

TableForm.propTypes = {
  uuid: PropTypes.string,
  wedding: PropTypes.number,
  capacity: PropTypes.number,
  onUpdate: PropTypes.func,
};

TableForm.defaultProps = {
  uuid: '',
  capacity: initialState.capacity,
  wedding: 0,
  onUpdate: null,
};
