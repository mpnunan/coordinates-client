import coordinates from '../axiosConfig';

const getReceptionTables = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const receptionTables = await coordinates.get(`/weddings/${weddingId}/reception_tables`);
  return receptionTables.data;
};

const getSingleReceptionTable = async (tableId) => {
  const receptionTable = await coordinates.get(`/reception_tables/${tableId}/read_only`);
  return receptionTable.data;
};

const createReceptionTable = async (payload) => {
  const receptionTable = await coordinates.post('/reception_tables', payload);
  return receptionTable.data;
};

const updateReceptionTable = async (uuid, payload) => {
  const receptionTable = await coordinates.put(`/reception_tables/${uuid}`, payload);
  return receptionTable.data;
};

const deleteReceptionTable = async (uuid) => {
  const receptionTable = await coordinates.delete(`/reception_tables/${uuid}`);
  return receptionTable.data;
};

const addTableGuest = async (uuid, payload) => {
  const tableGuest = await coordinates.post(`/reception_tables/${uuid}/add_guest`, payload);
  return tableGuest.data;
};

const removeTableGuest = async (uuid, payload) => {
  const tableGuest = await coordinates.put(`/reception_tables/${uuid}/remove_guest`, payload);
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
