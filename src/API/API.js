import axios from 'axios';
import { REACT_APP_URL } from '../global_variable/global';

// config
const config = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
};

// get all post item
export const getItems = async (page) => {
  return await axios.get(`${REACT_APP_URL}/posts?_page=${page}&_limit=10`);
};

// get item by userId
export const getItembyUser = async (id, page) => {
  return await axios.get(
    `${REACT_APP_URL}/posts?userId=${id}&_page=${page}&_limit=10`
  );
};

// get comment by postId
export const getItemComments = async (id) => {
  return await axios.get(`${REACT_APP_URL}/comments?postId=${id}`);
};

// get user data by idUser (for login)
export const getUserData = async (id) => {
  return await axios.get(`${REACT_APP_URL}/users/${id}`);
};

// post data
export const postData = async (data) => {
  return await axios.post(`${REACT_APP_URL}/posts`, data, config);
};

// patch data
export const patchData = async (data, id) => {
  return await axios.patch(`${REACT_APP_URL}/posts/${id}`, data, config);
};

// delete data
export const deletePost = async (id) => {
  return await axios.delete(`${REACT_APP_URL}/posts/${id}`);
};
