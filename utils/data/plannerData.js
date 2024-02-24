import coordinates from '../axiosConfig';

const getPlanner = async (uid, id) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const planner = await coordinates.get(`/planners/${id}`);
  return planner.data;
};

const updatePlanner = async (uid, id, payload) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const planner = await coordinates.put(`/planners/${id}`, payload);
  return planner.data;
};

export {
  getPlanner,
  updatePlanner,
};
