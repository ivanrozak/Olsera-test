import { configureStore } from '@reduxjs/toolkit';
// import logger from "redux-logger"; // If u want use, please add in array middleware, and do not commit on git
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
