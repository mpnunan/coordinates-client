import coordinates from '../axiosConfig';

const getReceptionTables = async (weddingId) => {
  const receptionTables = await coordinates.get(`/reception_tables?wedding=${weddingId}`);
  return Object.values(receptionTables.data);
};

const getSingleReceptionTable = async (receptionTableId) => {
  const receptionTable = await coordinates.get(`/reception_tables/${receptionTableId}`);
  return receptionTable.data;
};

const createReceptionTable = async (payload) => {
  const receptionTable = await coordinates.post('/reception_tables', payload);
  return receptionTable.data;
};

const updateReceptionTable = async (receptionTableId, payload) => {
  const receptionTable = await coordinates.put(`/reception_tables/${receptionTableId}`, payload);
  return receptionTable.data;
};

const deleteReceptionTable = async (receptionTableId) => {
  const receptionTable = await coordinates.delete(`/reception_tables/${receptionTableId}`);
  return receptionTable.data;
};

const addTableGuest = async (receptionTableId, payload) => {
  const tableGuest = await coordinates.post(`/reception_tables/${receptionTableId}/add_guest`, payload);
  return tableGuest.data;
};

const removeTableGuest = async (receptionTableId, payload) => {
  const tableGuest = await coordinates.put(`/reception_tables/${receptionTableId}/remove_guest`, payload);
  return tableGuest.data;
};

export {
  getReceptionTables,
  getSingleReceptionTable,
  createReceptionTable,
  updateReceptionTable,
  deleteReceptionTable,
  addTableGuest,
  removeTableGuest,
};
