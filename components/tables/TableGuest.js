import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { removeTableGuest } from '../../utils/data/receptionTableData';

export default function TableGuest({
  id,
  fullName,
  tableId,
  onUpdate,
}) {
  const thisGuest = {
    guest: id,
  };

  const removeGuest = () => {
    removeTableGuest(tableId, thisGuest).then(() => {
      onUpdate();
    });
  };

  return (
    <ListItem>
      <ListItemText>{fullName}</ListItemText>
      <ListItemButton onClick={removeGuest}>Remove from Table</ListItemButton>
    </ListItem>
  );
}

TableGuest.propTypes = {
  id: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  tableId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
