import { ContextProvider } from '@/context/Context'
import './globals.css'
import './fonts.css'

import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@/context/ContextUser'

export const metadata = {
  title: 'TráfegoTop',
  description: 'Click to Learn Driver Lessons',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-192x192.png'
  },
  themeColor: '#84bc9c'
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <UserProvider>
            {children}
            <Toaster position="top-right" />
          </UserProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
