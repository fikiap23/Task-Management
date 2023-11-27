/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { motion } from 'framer-motion'

function Alert({ type, message, duration = 3000, setEnableAlert }) {
  useEffect(() => {
    setTimeout(() => {
      setEnableAlert(false)
    }, duration)
  }, [duration, setEnableAlert])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={
        type === 'error'
          ? 'rounded-b border-t-4 border-red-500 bg-red-200 px-4 py-3 text-red-900 shadow-md'
          : type === 'success'
          ? 'rounded-b border-t-4 border-green-500 bg-green-300 px-4 py-3 text-green-900 shadow-md'
          : type === 'neutral' &&
            'rounded-b border-t-4 border-teal-500 bg-teal-200 px-4 py-3 text-teal-900 shadow-md'
      }
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className={
              type === 'error'
                ? 'mr-4 h-6 w-6 fill-current text-red-500'
                : type === 'success'
                ? 'mr-4 h-6 w-6 fill-current text-green-500'
                : type === 'neutral' &&
                  'mr-4 h-6 w-6 fill-current text-teal-500'
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          {type === 'error' && <p className="font-bold">Error occured</p>}
          {type === 'success' && <p className="font-bold">Success</p>}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Alert
