import { createSlice } from "@reduxjs/toolkit";



const LoginSlice = createSlice({
    name:'login',
    initialState:{
        loading:false,
    },
    reducers:{
        loginRequest:(state,action)=>{
            state.loading=true;
        },
        loginSuccess:(state,action)=>{
            state.loading=false;
        },
        loginFailure:(state,action)=>{
            state.loading=false;
        }
    }
})


const {actions,reducer} = LoginSlice;


export const {loginRequest,loginSuccess,loginFailure} = actions;

export default reducer;