import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@mui/material';
import ReadOnlyLayoutGuest from './ReadOnlyLayoutGuest';

export default function ReadOnlyTableLayout({
  number,
  capacity,
  full,
  guests,
}) {
  const available = (capacity - guests.length);

  return (
    <Box className={`layout-table full-${full}`} component="div">
      <Box className="tableHead">
        <Typography variant="h2">{`Table ${number}`}</Typography>
        <Box className="tableHead-sub">
          {full
            ? 'None Available'
            : (
              <Box className="tableHead-sub-available">
                <Typography variant="h3">{`Seats Available: ${available} of ${capacity}`}</Typography>
              </Box>
            )}
        </Box>
      </Box>
      <Box className="seatedGuests">
        {guests.map((guest) => (
          <ReadOnlyLayoutGuest
            key={`tableLayoutGuest-${guest.id}`}
            fullName={guest.full_name}
          />
        ))}
      </Box>
    </Box>
  );
}

ReadOnlyTableLayout.propTypes = {
  number: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  full: PropTypes.bool.isRequired,
  guests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
  })).isRequired,
};
