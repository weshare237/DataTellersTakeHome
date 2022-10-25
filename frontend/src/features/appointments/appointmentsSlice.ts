import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'

export const createAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (aptData: Appointment, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/v1/appointments', aptData)
      return data
    } catch (error) {
      // console.log('error========', error)
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  }
)

export const updateAppointment = createAsyncThunk(
  'appointment/updateAppointment',
  async (aptData: any, thunkAPI) => {
    const [values, key] = aptData
    try {
      const { data } = await axios.patch(`/api/v1/appointments/${key}`, values)
      return data
    } catch (error) {
      // console.log('error========', error)
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  }
)

export const deleteAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (appointmentId: React.Key, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/appointments/${appointmentId}`
      )
      return data
    } catch (error) {
      // console.log('error========', error)
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  }
)

export const getAllAppointments = createAsyncThunk(
  'appointment/getAllAppointments',
  async (pageNumber: number, thunkAPI) => {
    try {
      // console.log(thunkAPI)
      const { data } = await axios.get(
        `/api/v1/appointments?page=${pageNumber}`
      )
      return data
    } catch (error) {
      // console.log('error========', error)
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  }
)

export const getSingleAppointment = createAsyncThunk(
  'appointment/getSingleAppointment',
  async (aptData: any, thunkAPI) => {
    try {
      // console.log(thunkAPI)
      const { data } = await axios.get(`/api/v1/appointments/${aptData}`)
      return data
    } catch (error) {
      // console.log('error========', error)
      return thunkAPI.rejectWithValue('Something went wrong...')
    }
  }
)

const initialState: AppointmentsState = {
  appointmentsList: [],
  isLoading: false,
  total: 0,
  totalMissed: 0,
  totalPassed: 0,
  totalRescheduled: 0,
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    searchAppointment: (state: AppointmentsState, { payload }) => {
      state.appointmentsList = state.appointmentsList.filter(
        (appointment: any) =>
          appointment.name.toLowerCase().includes(payload.toLowerCase())
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointments.pending, (state: AppointmentsState) => {
        state.isLoading = true
      })
      .addCase(
        getAllAppointments.fulfilled,
        (state: AppointmentsState, { payload }) => {
          state.isLoading = false
          const newAppointments = payload.appointments.map(
            (appointment: any) => {
              let {
                _id: key,
                name,
                uniqueCode,
                age,
                address,
                status,
                phone,
                aptDate,
                email,
                sex,
                beforeApt,
                city,
                isFirstTime,
                requestDate,
                aptTime,
                afterApt,
              } = appointment
              aptDate = new Date(aptDate).toDateString()
              return {
                key,
                name,
                uniqueCode,
                age,
                address,
                status,
                phone,
                aptDate,
                email,
                sex,
                beforeApt,
                city,
                isFirstTime,
                requestDate,
                aptTime,
                afterApt,
              }
            }
          )
          state.appointmentsList = newAppointments
          state.total = payload.total
          state.totalMissed = payload.totalMissed
          state.totalPassed = payload.totalPassed
          state.totalRescheduled = payload.totalRescheduled
        }
      )
      .addCase(getAllAppointments.rejected, (state: AppointmentsState) => {
        state.isLoading = false
      })
      .addCase(deleteAppointment.pending, (state: AppointmentsState) => {
        state.isLoading = true
      })
      .addCase(
        deleteAppointment.fulfilled,
        (state: AppointmentsState, { payload }) => {
          state.isLoading = false
          state.appointmentsList = state.appointmentsList.filter(
            (appointment: Appointment) => appointment.key !== payload.id
          )
        }
      )
      .addCase(deleteAppointment.rejected, (state: AppointmentsState) => {
        state.isLoading = false
      })
  },
})

export const { searchAppointment } = appointmentsSlice.actions

export default appointmentsSlice.reducer
