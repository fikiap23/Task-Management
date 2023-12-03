import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAlert } from '../redux/alertSlice'

export function useDisplayAlert() {
  const dispatch = useDispatch()
  const [enableAlert, setEnableAlert] = useState(false)
  const alertState = useSelector((state) => state.alerts.alert)

  const displayAlert = (type, message, status, title) => {
    if (type?.includes('AxiosError')) type = 'error'
    if (status === 400) message = 'Invalid user credentials, please try again'
    dispatch(createAlert({ type, message, title }))
    setEnableAlert(true)
  }

  return { alertState, enableAlert, setEnableAlert, displayAlert }
}
