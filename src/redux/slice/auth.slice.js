import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        // action
        setAuthUser: (state, action) => {
            state.user = action.payload;
        }
    }
})
// export reducer
export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;