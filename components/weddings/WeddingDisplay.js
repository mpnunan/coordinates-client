import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function WeddingDisplay({
  id,
  name,
  venue,
}) {
  return (
    <div>
      <Paper elevation={16}>
        <Typography variant="h3">
          {name}
        </Typography>
        <Typography variant="body">
          {venue}
        </Typography>
        <ButtonGroup>
          <Link passHref href={`/weddings/guests/${id}`}>
            <Button>Guest List</Button>
          </Link>
          <Link passHref href={`/weddings/tables/${id}`}>
            <Button>Tables</Button>
          </Link>
          <Link passHref href={`/weddings/${id}`}>
            <Button>Wedding Details</Button>
          </Link>
          <Link passHref href={`/weddings/edit/${id}`}>
            <Button>Alter Wedding</Button>
          </Link>
        </ButtonGroup>
      </Paper>
    </div>
  );
}

WeddingDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
};
