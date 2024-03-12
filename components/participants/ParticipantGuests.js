import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getGuestList } from '../../utils/data/guestData';
import SortedGuestList from '../guests/SortedGuestList';

export default function ParticipantGuests({
  uid,
  weddingId,
  participantId,
  fullName,
  index,
}) {
  const [guestList, setGuestList] = useState({});

  useEffect(() => {
    getGuestList(uid, weddingId, participantId).then(setGuestList);
  }, [uid, weddingId, participantId]);

  return (
    <Box className={`guestList-participant guestList-${index}`}>
      <Typography variant="h2">{fullName}</Typography>
      <SortedGuestList
        key={`fullList-${participantId}`}
        guests={guestList.guests}
        family={guestList.family}
        party={guestList.party}
        couples={guestList.couples}
        problems={guestList.problems}
      />
    </Box>
  );
}

ParticipantGuests.propTypes = {
  uid: PropTypes.string.isRequired,
  weddingId: PropTypes.string.isRequired,
  participantId: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
