interface AppointmentsState {
  appointmentsList: Appointment[]
  isLoading: boolean
  total: number
  totalMissed: number
  totalPassed: number
  totalRescheduled: number
}

interface DataType {
  key: React.Key
  name: string
  uniqueCode: string
  address: string
  phone: string
  status: string
  aptDate: Date
}

interface Appointment {
  key: React.Key
  name: string
  address: string
  afterApt: string
  beforeApt: string
  email: string
  isFristTime: string
  phone: string
  sex: string
  city: string
  aptDate: Date
  requestDate: Date
  aptTime: Date
  status: string
  uniqueCode: string
  isFirstTime: string
}
