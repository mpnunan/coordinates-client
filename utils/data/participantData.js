import coordinates from '../axiosConfig';

const getParticipants = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const participants = await coordinates.get(`/weddings/${weddingId}/participants`);
  return Object.values(participants.data);
};

export default getParticipants;
