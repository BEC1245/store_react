import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../users/jwt/cookieUtils";
import { login } from "../../users/api/loginAPI";

// 예가 redux tool kit 으로 비동기 통신을 하는 놈
export const postLoginThunk = 
    createAsyncThunk('postLoginThunk', (formData) => {
        return login(formData)
    })

const initState = {
    nickName: '',
    profile: '',
    isAdmin: false,
    accessToken: '',
    email: '',
    refreshToken: '',
    errorMsg: '',
    loading: false,
}

const userCookie = () => {
    
    const data = getCookie("login")

    console.log(data, 'cookie data in login Slice');

    if(!data){
        return initState
    }

    return data
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: userCookie(),
    reducers: {
        initAll: (state, action) => {
            removeCookie("login")
            return initState()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLoginThunk.fulfilled, (state, action) => {
            console.log(state, 'curren state in loginSlice.js');
            console.log(action, 'curren action in loginSlice.js');

            if(action.payload.error){
                state.errorMsg = action.payload.error
                return
            }

            //state = { loading:false, ...action.payload}
            setCookie("login", JSON.stringify(action.payload), 1)
            return { loading:false, ...action.payload }
        })
        builder.addCase(postLoginThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(postLoginThunk.rejected, (state, action) => {
            console.log(action, 'rejected action in loginSlice.js');
            state.errorMsg = 'EXCEPTION'
            state.loading = false
        })
    }
})

export const { initAll } = loginSlice.actions;

export default loginSlice.reducer;