/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('push', function (e) {
  const data = e.data.json()

  self.registration.showNotification(data.title, {
    body: data.body,
  })
})
