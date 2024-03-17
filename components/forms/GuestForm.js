import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { createGuest, updateGuest } from '../../utils/data/guestData';

const initialState = {
  firstName: '',
  lastName: '',
  participant: 0,
  family: false,
  parent: false,
  party: false,
  primary: false,
};

export default function GuestForm({
  uuid,
  firstName,
  lastName,
  wedding,
  participant,
  family,
  parent,
  party,
  primary,
  participantArray,
}) {
  const [guest, setGuest] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (uuid.length > 0) {
      setGuest({
        firstName,
        lastName,
        wedding,
        participant,
        family,
        parent,
        party,
        primary,
      });
    }
  }, [uuid, firstName, lastName, wedding, participant, family, parent, party, primary]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    setGuest((prevState) => ({
      ...prevState,
      participant: e.target.value,
    }));
  };

  const handleToggle = (e) => {
    const { name } = e.target;
    setGuest((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uuid.length > 0) {
      updateGuest(uuid, guest).then(() => router.push(`/weddings/guests/${wedding}`));
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
      <ToggleButtonGroup
        name="participant"
        value={guest.participant}
        exclusive
        onChange={handleSelect}
        aria-label="Select which side of the wedding for this guest"
      >
        {participantArray.map((weddingParticipant) => (
          <ToggleButton
            key={`guestSide-toggle-${weddingParticipant.id}`}
            name={weddingParticipant.id}
            value={weddingParticipant.id}
          >
            {weddingParticipant.full_name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
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
      <FormControlLabel
        control={<Switch />}
        label="Family Member"
        name="family"
        role="checkbox"
        checked={guest.family}
        onChange={handleToggle}
        aria-label="Family Member select toggle"
      />
      <FormControlLabel
        control={<Switch />}
        label="Parent"
        name="parent"
        role="checkbox"
        disabled={!guest.family}
        checked={guest.parent}
        onChange={handleToggle}
        aria-label="Parent select toggle"
      />
      <FormControlLabel
        control={<Switch />}
        label="Wedding Party Member"
        name="party"
        role="checkbox"
        checked={guest.party}
        onChange={handleToggle}
        aria-label="Wedding Party member select toggle"
      />
      <FormControlLabel
        control={<Switch />}
        label="Primary Wedding Party Member"
        name="primary"
        role="checkbox"
        disabled={!guest.party}
        checked={guest.primary}
        onChange={handleToggle}
        aria-label="Wedding Party member select toggle"
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
  uuid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  wedding: PropTypes.number.isRequired,
  participant: PropTypes.number,
  family: PropTypes.bool,
  parent: PropTypes.bool,
  party: PropTypes.bool,
  primary: PropTypes.bool,
  participantArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
  })).isRequired,
};

GuestForm.defaultProps = {
  uuid: '',
  firstName: initialState.firstName,
  lastName: initialState.lastName,
  participant: initialState.participant,
  family: initialState.family,
  parent: initialState.parent,
  party: initialState.party,
  primary: initialState.primary,
};
