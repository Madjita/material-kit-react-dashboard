import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
    id: string | null;
    avatar: string | null;
    firstName: string | null;
    lastName: string | null;
    login: string | null;
    email: string | null;
    isActive: boolean;
    
    role: string | null;
    ruleGroups: string | null;
}

export enum RequestStatus {
    UserNotFound,
    SUCCESS,
    ERROR,
    LOADING,
    INITIAL,
    REMOVED,
}

// Создаем тип для значения статуса аутентификации
export interface RequestStatusValue {
    status: RequestStatus;
  }

export interface UserState {
    userDto : User | null
    isAuthorized: boolean,
    requsetStatus: RequestStatusValue
}

const INITIAL_USER_STATE: UserState = {
    userDto: null,
    isAuthorized: false,
    requsetStatus: {status: RequestStatus.INITIAL}
}


export const userSlice = createSlice({
    name:'userSlice',
    initialState: INITIAL_USER_STATE,
    reducers: {
        setUser: (state:UserState, {payload}:PayloadAction<User>)=> {
            console.log("DTA:",state,payload);
            state.userDto = payload
            state.userDto.avatar = '/assets/avatars/avatar-anika-visser.png'
            state.isAuthorized = true
            state.requsetStatus = {status: RequestStatus.SUCCESS}
            console.log("state.userDto =",state.userDto);

        },
        removeUser: (state)=> {
            state.userDto = null
            state.isAuthorized = false
            state.requsetStatus = {status: RequestStatus.REMOVED}
        },
        changeRequestStatus: (state,{payload}: PayloadAction<RequestStatus>)=> {
            state.requsetStatus={status: payload}
        },
        haveCookie: (state) => {
            console.log("haveCookie start.")
            state.isAuthorized = true
        },
    }
})

export const {actions,reducer} = userSlice

export const UserActions = userSlice.actions
