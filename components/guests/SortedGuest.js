import { EventSeat, EventSeatOutlined } from '@mui/icons-material';
import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function SortedGuest({
  id,
  uuid,
  fullName,
  party,
  primary,
  family,
  parent,
  seated,
  tableNumber,
}) {
  const [classList, setClassList] = ('');

  const guestClassList = (identObj) => {
    let classString = '';
    const classes = Object.entries(identObj);
    classes.forEach((identifier) => {
      if (identifier[1] !== false) {
        classString += identifier[0];
      }
    });
    setClassList(classString);
  };

  useEffect(() => {
    guestClassList({
      party,
      primary,
      family,
      parent,
    });
  }, [party, primary, family, parent]);

  return (
    <>
      <ListItem
        key={`guestList-${id}`}
        className={tableNumber ? `${classList} table${tableNumber}` : classList}
      >
        <ListItemIcon>
          {seated ? <EventSeat /> : <EventSeatOutlined />}
        </ListItemIcon>
        <ListItemText>{fullName}</ListItemText>
        <Link passhref href={uuid ? `/guest/edit/${uuid}` : `/guest/details/${id}`}>
          <ListItemButton>Details</ListItemButton>
        </Link>
      </ListItem>
    </>
  );
}

SortedGuest.propTypes = {
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  party: PropTypes.bool.isRequired,
  primary: PropTypes.bool.isRequired,
  family: PropTypes.bool.isRequired,
  parent: PropTypes.bool.isRequired,
  seated: PropTypes.bool.isRequired,
  tableNumber: PropTypes.number,
};

SortedGuest.defaultProps = {
  uuid: null,
  tableNumber: null,
};
