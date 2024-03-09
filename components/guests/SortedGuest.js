import { EventSeat, EventSeatOutlined } from '@mui/icons-material';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
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

  const guestClassList = async (identObj) => {
    let classString = '';
    const classes = Object.entries(identObj);
    classes.forEach((identifier) => {
      if (identifier[1] !== false) {
        classString += identifier[0];
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
    <>
      <ListItem
        key={`guestList-${id}`}
        className={tableNumber ? `${classList} table${tableNumber}` : classList}
      >
        <ListItemIcon>
          {seated ? <EventSeat /> : <EventSeatOutlined />}
        </ListItemIcon>
        <ListItemText>
          {uuid
            ? (
              <Link passHref href={`/guest/edit/${uuid}`}>
                {fullName}
              </Link>
            )
            : (
              <Link passHref href={`/guest/details/${id}`}>
                {fullName}
              </Link>
            )}
        </ListItemText>
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
