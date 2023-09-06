import { client } from "../utils/http";

const login = async (formData) => {
  const resp = await client.post('/auth/login',formData);
  return resp.data;
}

export {
  login
}