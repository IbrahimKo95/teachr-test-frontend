import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
    const response = await fetch(`${apiUrl}/categories`)
    return response.json()
})

export const deleteCategory = createAsyncThunk("deleteCategory", async (id, {rejectWithValue}) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${apiUrl}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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

export const updateCategory = createAsyncThunk("updateCategory", async ({ id, category }, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(`${apiUrl}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(category),
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

export const createCategory = createAsyncThunk("createCategory", async ({ category }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
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


export const searchCategory = createAsyncThunk("searchProduct", async (query, { rejectWithValue }) => {
    return query;
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
        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((product) => product.id !== action.payload);
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = state.action
            state.error = action.payload || 'An error occurred while deleting the product.';
        })
        builder.addCase(updateCategory.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.map((product) =>
                product.id === action.payload.id ? { ...product, ...action.payload } : product
            );
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'An error occurred while updating the product.';
        });
        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = [...state.data, action.payload]
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'An error occurred while creating a category.';
        });
        builder.addCase(searchCategory.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(searchCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((category) => category.name.toLowerCase().includes(action.payload.toLowerCase()));
        })
    }
})

export default categorySlice.reducer