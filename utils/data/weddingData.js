import coordinates from '../axiosConfig';

const getWeddings = async (uid) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const weddings = await coordinates.get('/weddings');
  return Object.values(weddings.data);
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

const updateWedding = async (uid, payload, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const wedding = await coordinates.put(`/weddings/${weddingId}`, payload);
  return wedding.data;
};

const deleteWedding = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const wedding = await coordinates.delete(`/weddings/${weddingId}`);
  return wedding.data;
};

export {
  getWeddings,
  getSingleWedding,
  createWeddding,
  updateWedding,
  deleteWedding,
};
