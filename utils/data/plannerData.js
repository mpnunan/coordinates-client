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

const getWeddingPlanners = async (uid, weddingId) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const weddingPlanners = await coordinates.get(`/weddings/${weddingId}/planners`);
  return Object.values(weddingPlanners.data);
};

const addWeddingPlanner = async (uid, weddingId, payload) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const weddingPlanner = await coordinates.post(`/weddings/${weddingId}/add_planner`, payload);
  return weddingPlanner.data;
};

const updateWeddingPlanner = async (uid, weddingId, payload) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const weddingPlanner = await coordinates.put(`/weddings/${weddingId}/update_planner`, payload);
  return weddingPlanner.data;
};

const removeWeddingPlanner = async (uid, weddingId, payload) => {
  coordinates.defaults.headers.common.Authorization = uid;
  const weddingPlanner = await coordinates.put(`/weddings/${weddingId}/remove_planner`, payload);
  return weddingPlanner.data;
};

export {
  getPlanner,
  updatePlanner,
  getWeddingPlanners,
  addWeddingPlanner,
  updateWeddingPlanner,
  removeWeddingPlanner,
};
