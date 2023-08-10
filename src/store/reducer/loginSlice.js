import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../users/jwt/cookieUtils";
import { getOneUser, login } from "../../users/api/loginAPI";

// 예가 redux tool kit 으로 비동기 통신을 하는 놈
export const postLoginThunk = 
    createAsyncThunk('postLoginThunk', (formData) => {
        return login(formData)
    })

export const getSocialThunk = 
    createAsyncThunk('getSocialThunk', (email) => {
        return getOneUser(email);
    })

const initState = {
    id: 0,
    email: '',
    nickName: '',
    profile: '',
    roleNames: [],
    isSocial: false,
    accessToken: '',
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

    console.log(parsingData(data), 'cookie parsed data in login Slice')

    return data
}

const parsingData = (data) => {

    const nickName = encodeURIComponent(data.nickName)
    const profile = encodeURIComponent(data.profile)

    return {...data, nickName:nickName, profile:profile}

}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: userCookie(),
    reducers: {
        initAll: (state, action) => {
            removeCookie("login")
            return initState
        },
        machCookieState: () => {
            return userCookie()
        },
        setSocial: (state, action) => {

            setCookie("login", JSON.stringify(action.payload), 1)

            return { ...action.payload };
        }
    },
    extraReducers: (builder) => {
        
        // 일반 로그인 로직
        builder.addCase(postLoginThunk.fulfilled, (state, action) => {
            console.log(state, 'curren state in loginSlice.js');
            console.log(action, 'curren action in loginSlice.js');

            if(action.payload.error){
                state.errorMsg = action.payload.error
                return
            }
            
            setCookie("login", JSON.stringify(parsingData(action.payload)), 1)
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

        // 소셜 로그인 로직
        builder.addCase(getSocialThunk.fulfilled, (state, action) => {
            
            setCookie("login", JSON.stringify(parsingData(action.payload)), 1)
            return { ...action.payload }
        })
        builder.addCase(getSocialThunk.rejected, (state, action) => {
            state.errorMsg = 'EXCEPTION'
            return { ...state }
        })
    }
})

export const { initAll, machCookieState, setSocial } = loginSlice.actions;

export default loginSlice.reducer;