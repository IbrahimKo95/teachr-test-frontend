import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteProduct, fetchProduct} from "./productSlicer";

const apiUrl = process.env.REACT_APP_API_URL

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
    const response = await fetch(`${apiUrl}/categories`)
    return response.json()
})


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isLoading: false,
        data: null,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.isLoading = true
            state.error = false
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCategory.rejected, (state) => {
            state.isLoading = false
            state.error = true
        })
    }
})

export default categorySlice.reducer