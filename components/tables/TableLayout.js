import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import LayoutGuest from './LayoutGuest';

export default function TableLayout({
  uuid,
  number,
  capacity,
  full,
  guests,
  onUpdateTable,
}) {
  return (
    <Box className={`layout-table full-${full}`} component="div">
      <Box className="tableHead">
        <Typography variant="body">{`Table ${number}: Seats ${capacity}`}</Typography>
        <Box className="seatedGuests">
          {guests.map((guest) => (
            <LayoutGuest
              key={guest.id}
              guestUuid={guest.uuid}
              fullName={guest.full_name}
              tableUuid={uuid}
              onUpdate={onUpdateTable}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

TableLayout.propTypes = {
  uuid: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  full: PropTypes.bool.isRequired,
  guests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    uuid: PropTypes.string,
    full_name: PropTypes.string,
  })).isRequired,
  onUpdateTable: PropTypes.func.isRequired,
};
