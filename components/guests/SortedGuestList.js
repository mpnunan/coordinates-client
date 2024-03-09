// import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
import {
  Box,
  List,
  Paper,
  Typography,
} from '@mui/material';
// import { getGuests } from '../../utils/data/guestData';
import PropTypes from 'prop-types';
import SortedGuest from './SortedGuest';

export default function SortedGuestList({
  guests,
  family,
  party,
  couples,
  problems,
}) {
  return (
    <Paper className="sideList" elevation={8}>
      <Box className="sideGuestList" component="div">
        <Typography variant="h3">Guests</Typography>
        <List>
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
      <Box component="div">
        <Box className="familyList" component="div">
          <List>
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
        <Box className="partyList" component="div">
          <List>
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
        <Box className="couplesList" component="div">
          <List>
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
              />
            ))}
          </List>
        </Box>
        <Box className="ProblemsList" component="div">
          <List>
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
};

SortedGuestList.defaultProps = {
  guests: [],
  family: [],
  party: [],
  couples: [],
  problems: [],
};
