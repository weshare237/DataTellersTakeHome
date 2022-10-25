import { configureStore } from '@reduxjs/toolkit'

import appointmentsReducer from './features/appointments/appointmentsSlice'

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
