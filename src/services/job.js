import { client } from "../utils/http";

const getJobs = async () => {
  const resp = await client.get('/job');
  return resp.data;
}

const addJob = async (formData) => {
  const resp = await client.post('/job', formData);
  console.log(resp.data);
  return resp.data;
}

const removeJob = async (id) => {
  const resp = await client.delete(`/job/${id}`)
  console.log(resp.data);
  return resp.data;
}

const updateJob = async (formData) => {
  const resp = await client.put('/job', formData);
  console.log(resp);
  return resp.data;
}

export {
  getJobs, addJob, removeJob, updateJob,
}