import type { ReduxState } from '../redux/store'


export const selectUserIsAuthorized = (state: ReduxState) =>  state.user.isAuthorized
export const selectUserDtoLogin = (state: ReduxState) =>  state.user.userDto.login
export const selectUserRequsetStatus = (state: ReduxState) =>  state.user.requsetStatus
export const selectUserDto = (state: ReduxState) =>  state.user.userDto