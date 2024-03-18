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
import { createWeddding, updateWedding } from '../../utils/data/weddingData';

const initialState = {
  venue: '',
  weddingName: '',
};

export default function WeddingForm({
  uuid,
  venue,
  weddingName,
  uid,
  onUpdate,
}) {
  const router = useRouter();
  const [wedding, setWedding] = useState(initialState);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const weddingCreated = () => {
    onUpdate();
    handleClose();
  };

  useEffect(() => {
    if (uuid.length > 0) {
      setWedding({
        venue,
        weddingName,
      });
    }
  }, [uuid, venue, weddingName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWedding((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uuid.length > 0) {
      updateWedding(uid, uuid, wedding).then(() => router.push('/weddings'));
    } else {
      createWeddding(uid, wedding).then(() => weddingCreated());
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
      >
        {uuid.length ? 'Alter Wedding Details' : 'Create New Wedding'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {wedding.weddingName}
        </DialogTitle>
        <DialogContent>
          <FormControl
            id="weddingForm"
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Wedding Venue"
              name="venue"
              value={wedding.venue}
              required
              onChange={handleChange}
            />
            <TextField
              label="Wedding Name"
              name="weddingName"
              value={wedding.weddingName}
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

WeddingForm.propTypes = {
  uuid: PropTypes.string,
  venue: PropTypes.string,
  weddingName: PropTypes.string,
  uid: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};

WeddingForm.defaultProps = {
  uuid: '',
  venue: initialState.venue,
  weddingName: initialState.name,
  onUpdate: null,
};
