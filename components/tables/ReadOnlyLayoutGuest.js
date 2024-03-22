import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@mui/material';

export default function ReadOnlyLayoutGuest({
  fullName,
}) {
  return (
    <Box className="layout-guest" component="div">
      <Typography variant="body">{fullName}</Typography>
    </Box>
  );
}

ReadOnlyLayoutGuest.propTypes = {
  fullName: PropTypes.string.isRequired,
};
