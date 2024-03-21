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
  phoneNumber: '',
  readOnly: false,
};

export default function WeddingPlannerForm({
  wedding,
  fullName,
  phoneNumber,
  readOnly,
  onUpdate,
}) {
  const [weddingPlanner, setWeddingPlanner] = useState(initialState);
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

  const remove = () => {
    if (window.confirm(`Remove ${fullName} from wedding planners?`)) {
      removeWeddingPlanner(user.uid, wedding, weddingPlanner).then(() => plannerActions());
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      setWeddingPlanner({
        phoneNumber,
        readOnly,
      });
    } else setWeddingPlanner(initialState);
  }, [phoneNumber, readOnly]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeddingPlanner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    if (phoneNumber) {
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
            {phoneNumber ? null : (
              <TextField
                label="Enter Phone Number or Email"
                name="phoneNumber"
                value={weddingPlanner.phoneNumber}
                required
                onChange={handleChange}
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
          {phoneNumber ? (
            <Button variant="text" onClick={remove}>
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
  phoneNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  readOnly: PropTypes.bool,
  onUpdate: PropTypes.func,
};

WeddingPlannerForm.defaultProps = {
  wedding: initialState.wedding,
  fullName: '',
  phoneNumber: null,
  readOnly: initialState.readOnly,
  onUpdate: null,
};
