import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alerts',
  initialState: { alert: {} },
  reducers: {
    createAlert: (state, action) => {
      state.alert = {
        message: action.payload.message,
        type: action.payload.type,
        title: action.payload?.title,
      }
    },
    clearAlert: (state, _) => {
      state.alert = {}
    },
  },
})

export const { createAlert, clearAlert } = alertSlice.actions
export default alertSlice.reducer
