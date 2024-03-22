import PropTypes from 'prop-types';
import {
  Box,
  Fade,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function ReadOnlyUnseatedGuest({
  fullName,
  party,
  primary,
  family,
  parent,
  partner,
}) {
  const [classList, setClassList] = useState('');

  const guestClassList = async (identObj) => {
    let classString = '';
    const classes = Object.entries(identObj);
    classes.forEach((identifier) => {
      if (identifier[1] !== false) {
        classString += ` ${identifier[0]}`;
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
      <Box className={`layout-unseated-guest ${classList}`} component="div">
        <Typography variant="body">{fullName}</Typography>
      </Box>
    </Tooltip>
  );
}

ReadOnlyUnseatedGuest.propTypes = {
  fullName: PropTypes.string.isRequired,
  party: PropTypes.bool.isRequired,
  primary: PropTypes.bool.isRequired,
  family: PropTypes.bool.isRequired,
  parent: PropTypes.bool.isRequired,
  partner: PropTypes.shape({
    full_name: PropTypes.string,
  }),
};

ReadOnlyUnseatedGuest.defaultProps = {
  partner: {},
};
