import {configureStore} from '@reduxjs/toolkit'
import productReducer from './productSlicer'
import categoryReducer from './categorySlicer'
export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})