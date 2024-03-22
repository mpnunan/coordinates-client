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
  uuid,
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
          {uuid ? (
            <Link passHref href={`/weddings/edit/${id}`}>
              <Button>Alter Wedding</Button>
            </Link>
          )
            : null}
        </ButtonGroup>
      </Paper>
    </div>
  );
}

WeddingDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string,
  name: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
};

WeddingDisplay.defaultProps = {
  uuid: '',
};
