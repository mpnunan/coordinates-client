import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { addWeddingPlanner, removeWeddingPlanner, updateWeddingPlanner } from '../../utils/data/plannerData';

const initialState = {
  wedding: '',
  email: '',
  phoneNumber: '',
  readOnly: false,
};

const initialInput = {
  input: '',
};

export default function WeddingPlannerForm({
  wedding,
  fullName,
  email,
  phoneNumber,
  readOnly,
  onUpdate,
}) {
  const [weddingPlanner, setWeddingPlanner] = useState(initialState);
  const [input, setInput] = useState(initialInput);
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const plannerActions = () => {
    onUpdate();
    handleClose();
  };

  const deleteFunc = (info) => {
    if (window.confirm(`Remove ${fullName} from wedding planners?`)) {
      removeWeddingPlanner(user.uid, wedding, info).then(() => plannerActions());
    }
  };

  const deleteWithEmail = () => {
    deleteFunc(email);
  };

  const deleteWithPhoneNumber = () => {
    deleteFunc(phoneNumber);
  };

  useEffect(() => {
    if (email.length > 0) {
      setWeddingPlanner({
        email,
        readOnly,
      });
    }
  }, [email, readOnly]);

  useEffect(() => {
    if (phoneNumber > 0) {
      setWeddingPlanner({
        phoneNumber,
        readOnly,
      });
    }
  }, [phoneNumber, readOnly]);

  const handleInput = (e) => {
    setInput(e.target.value);
    if (Number.isNaN(input)) {
      setWeddingPlanner((prevState) => ({
        ...prevState,
        email: input,
      }));
    } else {
      setWeddingPlanner((prevState) => ({
        ...prevState,
        phoneNumber: input,
      }));
    }
  };

  const handleToggle = (e) => {
    const { name } = e.target;
    setWeddingPlanner((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0 || phoneNumber.length > 0) {
      updateWeddingPlanner(user.uid, wedding, weddingPlanner).then(() => plannerActions());
    } else {
      addWeddingPlanner(user.uid, wedding, weddingPlanner).then(() => plannerActions());
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
      >
        {fullName || 'Add Wedding Planner'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {fullName || 'Add Wedding Planner'}
        </DialogTitle>
        <DialogContent>
          <FormControl
            id="guestForm"
            component="form"
            onSubmit={handleSubmit}
          >
            {email.length > 0 || phoneNumber > 0 ? null : (
              <TextField
                label="Enter Phone Number or Email"
                name="formInput"
                value={input.input}
                required
                onChange={handleInput}
              />
            )}
            <FormControlLabel
              control={<Switch />}
              label="Read Only"
              name="readOnly"
              role="checkbox"
              checked={weddingPlanner.readOnly}
              onChange={handleToggle}
              aria-label="Read only select toggle"
            />
            <Button
              type="submit"
              variant="text"
            >
              Submit
            </Button>
          </FormControl>
          {email.length > 0 || phoneNumber > 0 ? (
            <Button variant="text" onClick={deleteWithEmail || deleteWithPhoneNumber}>
              Remove Wedding Planner
            </Button>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

WeddingPlannerForm.propTypes = {
  wedding: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.number,
  readOnly: PropTypes.bool,
  onUpdate: PropTypes.func,
};

WeddingPlannerForm.defaultProps = {
  wedding: initialState.wedding,
  fullName: '',
  email: initialState.email,
  phoneNumber: initialState.phoneNumber,
  readOnly: initialState.readOnly,
  onUpdate: null,
};
