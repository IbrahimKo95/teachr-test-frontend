import {configureStore} from '@reduxjs/toolkit'
import productReducer from './productSlicer'
import categoryReducer from './categorySlicer'
import authSlicer from "./authSlicer";
export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        auth: authSlicer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})