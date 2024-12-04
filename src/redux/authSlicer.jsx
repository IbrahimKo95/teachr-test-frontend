import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL

export const login = createAsyncThunk("login", async (user, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/login_check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk("logout", async () => {
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state) => {
            state.isLoading = false
            state.isAuthenticated = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'An error occurred while login.';
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false
            state.isAuthenticated = false
        })
    }
});


export default authSlice.reducer