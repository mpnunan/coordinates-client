import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import { createWeddding, updateWedding } from '../../utils/data/weddingData';

const initialState = {
  venue: '',
  weddingName: '',
  participantOneFirst: '',
  participantOneLast: '',
  participantTwoFirst: '',
  participantTwoLast: '',
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
    setWedding(initialState);
    handleClose();
  };

  useEffect(() => {
    if (uuid.length > 1) {
      setWedding({
        venue,
        weddingName,
      });
    } else setWedding(initialState);
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
            {venue ? null : (
              <>
                <FormGroup>
                  <FormLabel>Participant One</FormLabel>
                  <TextField
                    label="First Name"
                    name="participantOneFirst"
                    value={wedding.participantOneFirst}
                    required
                    onChange={handleChange}
                  />
                  <TextField
                    label="Last Name"
                    name="participantOneLast"
                    value={wedding.participantOneLast}
                    required
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Participant Two</FormLabel>
                  <TextField
                    label="First Name"
                    name="participantTwoFirst"
                    value={wedding.participantTwoFirst}
                    required
                    onChange={handleChange}
                  />
                  <TextField
                    label="Last Name"
                    name="participantTwoLast"
                    value={wedding.participantTwoLast}
                    required
                    onChange={handleChange}
                  />
                </FormGroup>
              </>
            )}
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
