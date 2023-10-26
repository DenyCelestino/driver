import { ContextProvider } from '@/context/Context'
import './globals.css'

import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@/context/ContextUser'

export const metadata = {
  title: 'TrafegoTop',
  description: 'Click to Learn Driver Lessons',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-192x192.png'
  },
  themeColor: '#DC4266'
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <UserProvider>{children}</UserProvider>
        </ContextProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
