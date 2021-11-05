import { GET_ITEMS, GET_ITEM_COMMENTS, GET_USER } from './types';
import { getItems, getItemComments, getUserData } from '../../API/API';

export const dataItems = (params) => ({
  type: GET_ITEMS,
  payload: params,
});
export const dataComments = (params) => ({
  type: GET_ITEM_COMMENTS,
  payload: params,
});

export const dataUser = (params) => ({
  type: GET_USER,
  payload: params,
});

export const getDataItems = (page) => async (dispatch) => {
  await getItems(page).then((res) => {
    const newData = res.data;
    console.log(newData, 'data item');
    dispatch(dataItems({ params: { name: 'items', val: newData } }));
  });
};
export const getCommentData = (id) => async (dispatch) => {
  dispatch(dataComments({ params: { name: 'isLoadingComments', val: true } }));
  await getItemComments(id).then((res) => {
    const dataBaru = res.data;
    dispatch(dataComments({ params: { name: 'comments', val: dataBaru } }));
    dispatch(
      dataComments({ params: { name: 'isLoadingComments', val: false } })
    );
  });
};

export const getUser = (id) => async (dispatch) => {
  await getUserData(id).then((res) => {
    dispatch(dataUser({ params: { name: 'user', val: res.data } }));
  });
};

export const deleteUser = () => (dispatch) => {
  dispatch(dataUser({ params: { name: 'user', val: {} } }));
};
