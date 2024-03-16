import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Fade,
  Tooltip,
  Typography,
} from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import LayoutGuest from './LayoutGuest';

export default function TableLayout({
  uuid,
  number,
  capacity,
  full,
  guests,
  onUpdateTable,
  selectedFunc,
}) {
  const addSelectedGuests = () => {
    selectedFunc(uuid).then(() => {
      onUpdateTable();
    });
  };

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
                <Button
                  onClick={addSelectedGuests}
                  sx={{
                    '@media (max-width: 480px)': {
                      padding: '2px 2px',
                      minWidth: 0,
                      '& .MuiSvgIcon-root': {
                        fontSize: 20,
                      },
                    },
                  }}
                >
                  <Tooltip
                    title="Add Guest(s)"
                    placement="top"
                    TransitionComponent={Fade}
                  >
                    <GroupAdd />
                  </Tooltip>
                </Button>
              </Box>
            )}
        </Box>
      </Box>
      <Box className="seatedGuests">
        {guests.map((guest) => (
          <LayoutGuest
            key={`tableLayoutGuest-${guest.id}`}
            guestUuid={guest.uuid}
            fullName={guest.full_name}
            tableUuid={uuid}
            onUpdate={onUpdateTable}
          />
        ))}
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
  selectedFunc: PropTypes.func.isRequired,
};
