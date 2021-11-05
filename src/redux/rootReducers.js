import { combineReducers } from 'redux';
import reducers from './global/reducers';

export default combineReducers({
  global: reducers,
});
