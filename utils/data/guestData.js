import coordinates from '../axiosConfig';

const getGuests = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const guests = await coordinates.get(`/weddings/${weddingId}/guests`);
  return guests.data;
};

const getGuestList = async (uid, weddingId, participantId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const guests = await coordinates.get(`/guest_list/${weddingId}?side=${participantId}`);
  return guests.data;
};

const getUnseatedGuests = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const guests = await coordinates.get(`/unseated/${weddingId}`);
  return guests.data;
};

const getSingleGuest = async (guestId) => {
  const guest = await coordinates.get(`/guests/${guestId}/read_only`);
  return guest.data;
};

const createGuest = async (payload) => {
  const guest = await coordinates.post('/guests', payload);
  return guest.data;
};

const updateGuest = async (uuid, payload) => {
  const guest = await coordinates.put(`/guests/${uuid}`, payload);
  return guest.data;
};

const deleteGuest = async (uuid) => {
  const guest = await coordinates.delete(`/guests/${uuid}`);
  return guest.data;
};

export {
  getGuests,
  getGuestList,
  getUnseatedGuests,
  getSingleGuest,
  createGuest,
  updateGuest,
  deleteGuest,
};
