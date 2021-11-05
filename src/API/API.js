import axios from 'axios';
import { REACT_APP_URL } from '../global_variable/global';

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
