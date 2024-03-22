import coordinates from '../axiosConfig';

const getWeddings = async (uid) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const weddings = await coordinates.get('/wedding_list');
  return weddings.data;
};

const getSingleWedding = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const wedding = await coordinates.get(`/weddings/${weddingId}`);
  return wedding.data;
};

const createWeddding = async (uid, payload) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const wedding = await coordinates.post('/weddings', payload);
  return wedding.data;
};

const updateWedding = async (uid, uuid, payload) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const wedding = await coordinates.put(`/weddings/${uuid}`, payload);
  return wedding.data;
};

const deleteWedding = async (uid, uuid) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const wedding = await coordinates.delete(`/weddings/${uuid}`);
  return wedding.data;
};

export {
  getWeddings,
  getSingleWedding,
  createWeddding,
  updateWedding,
  deleteWedding,
};
