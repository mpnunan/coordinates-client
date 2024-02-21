import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { createGuest, updateGuest } from '../../utils/data/guestData';

const initialState = {
  firstName: '',
  lastName: '',
  wedding: 0,
};

export default function GuestForm({
  id,
  firstName,
  lastName,
  wedding,
}) {
  const [guest, setGuest] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (id > 0) {
      setGuest({
        firstName,
        lastName,
        wedding,
      });
    }
  }, [id, firstName, lastName, wedding]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id > 0) {
      updateGuest(id, guest).then(() => router.push(`/weddings/guests/${wedding}`));
    } else {
      createGuest({ ...guest, wedding }).then(() => router.push(`/weddings/guests/${wedding}`));
    }
  };

  return (
    <FormControl
      id="guestForm"
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        label="First Name"
        name="firstName"
        value={guest.firstName}
        required
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={guest.lastName}
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

GuestForm.propTypes = {
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  wedding: PropTypes.number,
};

GuestForm.defaultProps = {
  id: 0,
  firstName: initialState.firstName,
  lastName: initialState.lastName,
  wedding: 0,
};
