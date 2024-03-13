import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  Fade,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function UnseatedGuest({
  fullName,
  uuid,
  party,
  primary,
  family,
  parent,
  partner,
  side,
  onChecked,
}) {
  const [classList, setClassList] = useState('');

  const guestClassList = async (identObj) => {
    let classString = '';
    const classes = Object.entries(identObj);
    classes.forEach((identifier) => {
      if (identifier[1] !== false) {
        classString += identifier[0];
      }
    });
    return classString;
  };

  useEffect(() => {
    guestClassList({
      party,
      primary,
      family,
      parent,
    }).then(setClassList);
  }, [party, primary, family, parent]);

  return (
    <Tooltip
      title={partner ? partner.full_name : null}
      placement="right"
      TransitionComponent={Fade}
    >
      <Box className={`layout-unseated-guest layout-guest-${side} ${classList}`} component="div">
        <Typography variant="body">{fullName}</Typography>
        <Checkbox
          value={uuid}
          onChange={onChecked}
          inputProps={{
            'aria-label': `Select ${fullName} to add to table or group`,
          }}
        />
      </Box>
    </Tooltip>
  );
}

UnseatedGuest.propTypes = {
  fullName: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  party: PropTypes.bool.isRequired,
  primary: PropTypes.bool.isRequired,
  family: PropTypes.bool.isRequired,
  parent: PropTypes.bool.isRequired,
  partner: PropTypes.shape({
    full_name: PropTypes.string,
  }),
  side: PropTypes.number.isRequired,
  onChecked: PropTypes.func.isRequired,
};

UnseatedGuest.defaultProps = {
  partner: {},
};
