/* Instruments */
import {counterSlice } from './slices'
import {userSlice} from '../User/User.store'
import {adminSlice} from '../Admin/AdminReducer'

export const reducer = {
  counter: counterSlice.reducer,
  user: userSlice.reducer,
  admin: adminSlice.reducer,
}
