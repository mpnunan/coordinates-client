import { EventSeat, EventSeatOutlined } from '@mui/icons-material';
import {
  Fade,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ReadOnlySortedGuest({
  id,
  fullName,
  party,
  primary,
  family,
  parent,
  seated,
  tableNumber,
  problem,
  partner,
  tipSide,
}) {
  const [classList, setClassList] = useState('');

  const guestClassList = async (identObj) => {
    let classString = '';
    const classes = Object.entries(identObj);
    classes.forEach((identifier) => {
      if (identifier[1] !== false) {
        classString += ` ${identifier[0]}`;
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
        <Tooltip
          title={problem || partner}
          placement={tipSide === 1 ? 'left' : 'right'}
          TransitionComponent={Fade}
        >
          <ListItemText>
            <Link passHref href={`/guest/details/${id}`}>
              {fullName}
            </Link>
          </ListItemText>
        </Tooltip>
      </ListItem>
    </>
  );
}

ReadOnlySortedGuest.propTypes = {
  id: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  party: PropTypes.bool.isRequired,
  primary: PropTypes.bool.isRequired,
  family: PropTypes.bool.isRequired,
  parent: PropTypes.bool.isRequired,
  seated: PropTypes.bool.isRequired,
  tableNumber: PropTypes.number,
  problem: PropTypes.string,
  partner: PropTypes.string,
  tipSide: PropTypes.number,
};

ReadOnlySortedGuest.defaultProps = {
  tableNumber: null,
  problem: null,
  partner: null,
  tipSide: 0,
};
