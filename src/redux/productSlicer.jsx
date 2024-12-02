import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
    const response = await fetch("http://localhost:8000/api/products")
    return response.json()
})


const todoSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        data: null,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true
            state.error = false
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchProduct.rejected, (state) => {
            state.isLoading = false
            state.error = true
        })
    }
})

export default todoSlice.reducer