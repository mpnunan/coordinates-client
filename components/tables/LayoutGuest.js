import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { removeTableGuest } from '../../utils/data/receptionTableData';

export default function LayoutGuest({
  guestUuid,
  fullName,
  tableUuid,
  onUpdate,
}) {
  const remove = () => {
    removeTableGuest(tableUuid, { guest: guestUuid }).then(() => {
      onUpdate();
    });
  };

  return (
    <Box className="layout-guest" component="div">
      <Typography variant="body">{fullName}</Typography>
      <Button onClick={remove}>Remove</Button>
    </Box>
  );
}

LayoutGuest.propTypes = {
  guestUuid: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  tableUuid: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
