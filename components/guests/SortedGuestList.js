import {
  Box,
  List,
  Paper,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import SortedGuest from './SortedGuest';

export default function SortedGuestList({
  guests,
  family,
  party,
  couples,
  problems,
  tipSide,
}) {
  return (
    <Paper className="sideList" elevation={8}>
      <Box className="sideGuestList sortedList" component="div">
        <Typography className="listTitle" variant="h3">Guests</Typography>
        <List className="guestList-list">
          {guests?.map((guest) => (
            <SortedGuest
              key={`guestList-guest-${guest.id}`}
              id={guest.id}
              uuid={guest.uuid}
              fullName={guest.full_name}
              party={guest.party}
              primary={guest.primary}
              family={guest.family}
              parent={guest.family}
              seated={guest.seated}
              tableNumber={guest.table_number}
            />
          ))}
        </List>
      </Box>
      <Box className="insideGuestList" component="div">
        <Box className="familyList sortedList" component="div">
          <Typography className="listTitle" variant="h3">Family</Typography>
          <List className="guestList-list">
            {family?.map((guest) => (
              <SortedGuest
                key={`guestList-family-${guest.id}`}
                id={guest.id}
                uuid={guest.uuid}
                fullName={guest.full_name}
                party={guest.party}
                primary={guest.primary}
                family={guest.family}
                parent={guest.family}
                seated={guest.seated}
                tableNumber={guest.table_number}
              />
            ))}
          </List>
        </Box>
        <Box className="partyList sortedList" component="div">
          <Typography className="listTitle" variant="h3">Wedding Party</Typography>
          <List className="guestList-list">
            {party?.map((guest) => (
              <SortedGuest
                key={`guestList-party-${guest.id}`}
                id={guest.id}
                uuid={guest.uuid}
                fullName={guest.full_name}
                party={guest.party}
                primary={guest.primary}
                family={guest.family}
                parent={guest.family}
                seated={guest.seated}
                tableNumber={guest.table_number}
              />
            ))}
          </List>
        </Box>
        <Box className="couplesList sortedList" component="div">
          <Typography className="listTitle" variant="h3">Couples</Typography>
          <List className="guestList-list">
            {couples?.map((guest) => (
              <SortedGuest
                key={`guestList-couples-${guest.id}`}
                id={guest.id}
                uuid={guest.uuid}
                fullName={guest.full_name}
                party={guest.party}
                primary={guest.primary}
                family={guest.family}
                parent={guest.family}
                seated={guest.seated}
                tableNumber={guest.table_number}
                partner={guest.partner?.full_name}
                tipSide={tipSide}
              />
            ))}
          </List>
        </Box>
        <Box className="ProblemsList sortedList" component="div">
          <Typography className="listTitle" variant="h3">Space Required</Typography>
          <List className="guestList-list">
            {problems?.map((guest) => (
              <SortedGuest
                key={`guestList-problems-${guest.id}`}
                id={guest.id}
                uuid={guest.uuid}
                fullName={guest.full_name}
                party={guest.party}
                primary={guest.primary}
                family={guest.family}
                parent={guest.family}
                seated={guest.seated}
                tableNumber={guest.table_number}
                problem={guest.problem?.full_name}
                tipSide={tipSide}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
}

SortedGuestList.propTypes = {
  guests: PropTypes.arrayOf(PropTypes.shape()),
  family: PropTypes.arrayOf(PropTypes.shape()),
  party: PropTypes.arrayOf(PropTypes.shape()),
  couples: PropTypes.arrayOf(PropTypes.shape()),
  problems: PropTypes.arrayOf(PropTypes.shape()),
  tipSide: PropTypes.number,
};

SortedGuestList.defaultProps = {
  guests: [],
  family: [],
  party: [],
  couples: [],
  problems: [],
  tipSide: 0,
};
