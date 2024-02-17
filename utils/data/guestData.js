import coordinates from '../axiosConfig';

const getGuests = async (weddingId) => {
  const guests = await coordinates.get(`/guests?wedding=${weddingId}`);
  return Object.values(guests.data);
};

const getSingleGuest = async (guestId) => {
  const guest = await coordinates.get(`/guests/${guestId}`);
  return guest.data;
};

const createGuest = async (payload) => {
  const guest = await coordinates.post('/guests', payload);
  return guest.data;
};

const updateGuest = async (guestId, payload) => {
  const guest = await coordinates.put(`/guests/${guestId}`, payload);
  return guest.data;
};

const deleteGuest = async (guestId) => {
  const guest = await coordinates.delete(`/guests/${guestId}`);
  return guest.data;
};

export {
  getGuests,
  getSingleGuest,
  createGuest,
  updateGuest,
  deleteGuest,
};
