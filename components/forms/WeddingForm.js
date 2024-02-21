import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { createWeddding, updateWedding } from '../../utils/data/weddingData';

const initialState = {
  venue: '',
  name: '',
};

export default function WeddingForm({
  id,
  venue,
  weddingName,
  uid,
}) {
  const router = useRouter();
  const [wedding, setWedding] = useState(initialState);

  useEffect(() => {
    if (id > 0) {
      setWedding({
        venue,
        name: weddingName,
      });
    }
  }, [id, venue, weddingName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWedding((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id > 0) {
      updateWedding(uid, wedding, id).then(() => router.push(`/weddings/guests/${id}`));
    } else {
      createWeddding(uid, wedding).then((response) => router.push(`/weddings/guests/${response.id}`));
    }
  };

  return (
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
        name="name"
        value={wedding.name}
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

WeddingForm.propTypes = {
  id: PropTypes.number,
  venue: PropTypes.string,
  weddingName: PropTypes.string,
  uid: PropTypes.string.isRequired,
};

WeddingForm.defaultProps = {
  id: 0,
  venue: initialState.venue,
  weddingName: initialState.name,
};
