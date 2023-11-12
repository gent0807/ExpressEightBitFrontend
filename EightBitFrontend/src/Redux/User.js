import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        login_state: null,
        role: null,
        access_token: null,
        refresh_token: null,
        nickname: null,
        point: 0,
    },
    reducers: {
        clearLoginState: (state) => {
            state.login_state = null;
            state.role = null;
            state.access_token = null;
            state.refresh_token = null;
            state.temp_token = null;
            state.nickname = null;
            state.point = 0;
            return state;
        },
        accessToken: (state, action) => {
            state.access_token = action.payload.accessToken;
            return state;
        },
        loginState: (state, action) => {
            state.login_state = action.payload.loginState;
            state.role = action.payload.role;
            state.access_token = action.payload.accessToken;
            state.refresh_token = action.payload.refreshToken;
            state.nickname = action.payload.nickName;
            state.point = action.payload.point;
            return state;
        },
        point:(state, action) => {
            state.point = action.payload.point;
            return state;
        }

    },
});

export const { clearLoginState, accessToken, loginState, point } = userSlice.actions;
export default userSlice.reducer;