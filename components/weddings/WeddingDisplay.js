/* eslint-disable import/no-extraneous-dependencies */
import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function WeddingDisplay({
  name,
  venue,
}) {
  return (
    <div>
      <Paper elevation={24}>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
        <Typography variant="body">
          {venue}
        </Typography>
      </Paper>
    </div>
  );
}

WeddingDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
};
