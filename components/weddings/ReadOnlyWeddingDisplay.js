import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function ReadOnlyWeddingDisplay({
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
          <Link passHref href={`/noedit/guests/${id}`}>
            <Button>Guest List</Button>
          </Link>
          <Link passHref href={`/noedit/tables/${id}`}>
            <Button>Tables</Button>
          </Link>
        </ButtonGroup>
      </Paper>
    </div>
  );
}

ReadOnlyWeddingDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
};
