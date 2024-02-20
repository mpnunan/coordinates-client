import { EventSeat, EventSeatOutlined } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function GuestList({
  id,
  fullName,
  seated,
}) {
  return (
    <ListItem>
      <ListItemText>{fullName}</ListItemText>
      <ListItemIcon>
        {seated ? <EventSeat /> : <EventSeatOutlined />}
      </ListItemIcon>
      <Link passHref href={`/guest/${id}`}>
        <ListItemButton>Details</ListItemButton>
      </Link>
    </ListItem>
  );
}

GuestList.propTypes = {
  id: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  seated: PropTypes.bool.isRequired,
};
