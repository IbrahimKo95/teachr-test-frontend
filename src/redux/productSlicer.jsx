import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const apiUrl = process.env.REACT_APP_API_URL

export const fetchProduct = createAsyncThunk("fetchProduct", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id, {rejectWithValue}) => {
    try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const updateProduct = createAsyncThunk("updateProduct", async ({ id, product }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createProduct = createAsyncThunk("createProduct", async ({ product }, { rejectWithValue }) => {
    console.log(product)
    try {
        const response = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const searchProduct = createAsyncThunk("searchProduct", async (query, { rejectWithValue }) => {
    return query;
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'An error occurred while fetching the products.';
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((product) => product.id !== action.payload);
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = state.action
            state.error = action.payload || 'An error occurred while deleting the product.';
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.map((product) =>
                product.id === action.payload.id ? { ...product, ...action.payload } : product
            );
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'An error occurred while updating the product.';
        });
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = [...state.data, action.payload]
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'An error occurred while creating a product.';
        });
        builder.addCase(searchProduct.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()));
        })
    }
})

export default productSlice.reducer