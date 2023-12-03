/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDisplayAlert } from '../../hooks/useDisplayAlert'
import Alert from '../Alert/Alert'
import axios from 'axios'

export default function NotificationsModal({ setShowModal, task, setDate }) {
  const refCloseModal = useRef()
  const [time, setTime] = useState('')
  const [day, setDay] = useState()
  const [timeBefore, setTimeBefore] = useState(0)
  const { alertState, enableAlert, setEnableAlert, displayAlert } =
    useDisplayAlert()

  async function calculateReminderTime() {
    if (time === '' || !time) {
      displayAlert('error', 'Please select a time for the notification')
      return
    }
    if (day === '' || !day) {
      displayAlert('error', 'Please select a day for the notification')
      return
    }
    const date = `${day}T${time}`

    const notifPermission = await Notification.requestPermission()
    if (notifPermission === 'default' || notifPermission === 'denied') {
      displayAlert(
        'error',
        'Please allow notifications for the app in order to receive reminders.'
      )
      return
    }

    const now = new Date()
    const reminderDate = new Date(date)
    setDate(reminderDate)
    const diff = reminderDate - now

    if (diff > 0) {
      displayAlert(
        'success',
        `Reminder created for ${day}, ${timeBefore} before ${time}`
      )
    }

    return diff
  }

  async function registerSW() {
    // Asking for permission to display notifications
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    try {
      const sw = await navigator.serviceWorker.register('/service-worker.js')
      console.log('sw:', sw)
      console.log('Service worker registered')
    } catch (err) {
      console.error(err)
    }
  }

  async function subscribeToSW() {
    const publicVapidKey =
      'BMch0p1Kqgj_LyOqyK-EFXx_QWfBzxoGbYvxX-6FlxUmWxBQG7YTjSJ4_XGbiwDEY-D3SmqneHG4F3_vKRsqeQg'

    const registeredWorker = await navigator.serviceWorker.ready

    let subscription = null
    try {
      subscription = await registeredWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
      })
    } catch (err) {
      console.error(err)
    }

    if (!subscription)
      return alert('Error occured while creating a notification')
    console.log('subscription:', subscription)

    return subscription
  }

  async function pushSubscriptionToServer(sub, reminderTime) {
    await axios.post(
      '/v1/api/tasks/subscribe',
      {
        subscription: JSON.stringify(sub),
        reminderTime,
        task,
        timeBefore,
        dateDetail: ` Tanggal: ${day}, Pukul ${time} WIB`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const webPushAPINotificationCall = async () => {
    // Calculate reminder time and do checks
    const reminderTime = await calculateReminderTime()
    if (!reminderTime) return

    // Register a service worker
    await registerSW()

    // Subscribe to the registered service worker
    const subscription = await subscribeToSW()

    // Send Push Subscription to the server-side
    await pushSubscriptionToServer(subscription, reminderTime)
  }

  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) setShowModal(false)
      if (!refCloseModal?.current?.contains(e.target)) setShowModal(false)
    }
    window.addEventListener('keydown', closeModal)
    window.addEventListener('mousedown', closeModal)

    return () => {
      window.removeEventListener('keydown', closeModal)
      window.removeEventListener('mousedown', closeModal)
    }
  }, [setShowModal])

  return (
    <Fragment>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
      >
        <div ref={refCloseModal} className="relative w-auto max-w-xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white px-3 shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Create a Reminder</h3>

              <button
                className="float-right ml-auto bg-transparent p-1 text-xl font-semibold text-black opacity-5"
                onClick={() => setShowModal(false)}
              />
            </div>

            <AnimatePresence>
              {enableAlert && (
                <Alert
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type={alertState.type}
                  message={alertState.message}
                  setEnableAlert={setEnableAlert}
                />
              )}
            </AnimatePresence>

            <form className="p-5">
              <label
                className="text-md mb-2 mr-3 block font-bold text-gray-700"
                htmlFor="reminderDay"
              >
                Task: {task}
              </label>

              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="reminderDay"
                >
                  Which day:
                </label>

                <input type="date" onChange={(e) => setDay(e.target.value)} />
              </div>

              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="reminderTime"
                >
                  What time:
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between border p-6">
                <label
                  className="text-md mb-2 mr-3 block font-bold text-gray-700"
                  htmlFor="timeBefore"
                >
                  Remind me every:
                </label>

                <select
                  id="timeBefore"
                  className="ml-2 flex items-center"
                  defaultValue={86400000}
                  onChange={(e) => setTimeBefore(e.target.value)}
                >
                  <option value={60000}>1 mins </option>
                  <option value={900000}>15 mins </option>
                  <option value={3600000}>1 hour </option>
                  <option value={7200000}>2 hours </option>
                  <option value={10800000}>3 hours </option>
                  <option value={21600000}>6 hours </option>
                  <option value={86400000}>1 day </option>
                  <option value={172800000}>2 days </option>
                </select>
              </div>
            </form>
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mr-3 mb-1 rounded bg-teal-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                type="button"
                onClick={webPushAPINotificationCall}
              >
                Add Notification
              </button>

              <button
                className="bg-white-500 active:bg-white-600 mr-1 mb-1 
            rounded px-6 py-3 text-sm font-bold uppercase text-black shadow 
            outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
    </Fragment>
  )
}
