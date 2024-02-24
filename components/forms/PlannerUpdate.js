import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FormControl, TextField } from '@mui/material';
import { updatePlanner } from '../../utils/data/plannerData';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: 0,
};

export default function PlannerUpdate({ user }) {
  const [planner, setPlanner] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    setPlanner({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
    });
  }, [user.email, user.first_name, user.last_name, user.phone_number]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlanner(user.uid, user.id, planner).then(() => router.push('/profile'));
  };

  return (
    <FormControl
      id="plannerForm"
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        label="First Name"
        name="firstName"
        value={planner.firstName}
        required
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={planner.lastName}
        required
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        value={planner.email}
        required
        onChange={handleChange}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={planner.phoneNumber}
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

PlannerUpdate.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
