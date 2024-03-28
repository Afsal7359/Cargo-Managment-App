import { createStore } from 'redux';
import rootReducer from './Rootreducer';

const Store = createStore(rootReducer);

export default Store;