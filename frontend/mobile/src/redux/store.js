import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import webSocketMiddleware from './webSocketMiddleware';
import collaborationReducer from './collaborationSlice';

const store = configureStore({
    reducer: {
        rootReducer,
        collaborations: collaborationReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk, webSocketMiddleware),
});

export default store;