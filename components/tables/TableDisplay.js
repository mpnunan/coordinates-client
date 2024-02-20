import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function TableDisplay({
  id,
  number,
  capacity,
  guests,
  full,
}) {
  return (
    <Paper elevation={12}>
      <Typography variant="h3" component="h2">{`Table ${number}`}</Typography>
      <Typography variant="h4" component="h3">
        {full ? 'Table Full' : `${guests.length} of ${capacity} seats`}
      </Typography>
      <Typography key={`${id}-body`} variant="body">Guests</Typography>
      <List>
        {guests.map((guest) => (
          <ListItem key={guest.id}>
            <ListItemText>{guest.full_name}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Link passHref href={`/table/edit/${id}`}>
        <Button>Alter Table Guests</Button>
      </Link>
    </Paper>
  );
}

TableDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  guests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
  })),
  full: PropTypes.bool.isRequired,
};

TableDisplay.defaultProps = {
  guests: [],
};
