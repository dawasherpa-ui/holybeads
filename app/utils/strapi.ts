import axios from "axios";

const baseURL = `http://localhost:1337`;

//AUth FUnctions
export const register = async (values: any) => {
  const res = await axios.post(`${baseURL}/api/auth/local/register`, values, { headers: { "Content-Type": "application/json" } });
  console.log(res);
  return res;
}
export const UpdateUser = async (values: any, id: string, accessToken: string) => {
  const res = await axios.put(`${baseURL}/api/users/${id}`, values, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } });
  return res;
}

export const login = async (values: any) => {
  const res = await axios.post(`${baseURL}/api/auth/local`, values, { headers: { "Content-Type": "application/json" } });
  return res;
}
export const getUserFromToken = async (accessToken: string) => {
  const res = await axios.get(`${baseURL}/api/users/me`, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` } });
  return res;
}

