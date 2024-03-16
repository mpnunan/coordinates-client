import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Fade,
  Tooltip,
  Typography,
} from '@mui/material';
import { PersonRemove } from '@mui/icons-material';
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
      <Button onClick={remove}>
        <Tooltip
          title="Remove Guest"
          placement="top-end"
          TransitionComponent={Fade}
        >
          <PersonRemove />
        </Tooltip>
      </Button>
    </Box>
  );
}

LayoutGuest.propTypes = {
  guestUuid: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  tableUuid: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
