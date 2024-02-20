import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { addTableGuest } from '../../utils/data/receptionTableData';

export default function NotTableGuest({
  id,
  fullName,
  tableId,
  onUpdate,
}) {
  const thisGuest = {
    guest: id,
  };

  const addGuest = () => {
    addTableGuest(tableId, thisGuest).then(() => {
      onUpdate();
    });
  };

  return (
    <ListItem>
      <ListItemText>{fullName}</ListItemText>
      <ListItemButton onClick={addGuest}>Add to Table</ListItemButton>
    </ListItem>
  );
}

NotTableGuest.propTypes = {
  id: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  tableId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
