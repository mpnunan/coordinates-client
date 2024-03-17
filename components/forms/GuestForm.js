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
import { useAuth } from '../../utils/context/authContext';
import getParticipants from '../../utils/data/participantData';

const initialState = {
  firstName: '',
  lastName: '',
  family: false,
  participant: '',
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
}) {
  const [guest, setGuest] = useState(initialState);
  const [participants, setParticipants] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getParticipants(user.uid, wedding).then(setParticipants);
  }, [user.uid, wedding]);

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
        required
        onChange={handleSelect}
        aria-label="Select which side of the wedding for this guest"
      >
        {participants.map((person) => (
          <ToggleButton
            key={`guestSide-toggle-${person.uuid}`}
            name={person.uuid}
            value={person.uuid}
          >
            {person.full_name}
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
  participant: PropTypes.string,
  family: PropTypes.bool,
  parent: PropTypes.bool,
  party: PropTypes.bool,
  primary: PropTypes.bool,
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
