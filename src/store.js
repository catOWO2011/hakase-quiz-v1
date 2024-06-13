import { configureStore } from "@reduxjs/toolkit";

import collectionReducer from './features/collection/collectionSlice';

const store = configureStore({
    reducer: {
        collection: collectionReducer
    }
});

export default store;