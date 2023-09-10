import { client } from "../utils/http";

const login = async (formData) => {
  const resp = await client.post('/auth/login',formData);
  return resp.data;
}

const logout = async () => {
  const {result, success} = await client.post(`/auth/logout?token=${localStorage.getItem('token')}`)
  if(success){
    localStorage.removeItem('token');
    return true;
  }
}

export {
  login, logout,
}