import { configureStore } from '@reduxjs/toolkit'

import alertSlice from './alertSlice'

export default configureStore({
  reducer: {
    alerts: alertSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
