'use client'

import { useMyContext } from '@/context/Context'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function WebLayout({ children }) {
  const { GOOGLE_CLIENT_ID } = useMyContext()
  return (
    <div>
      <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>
        {children}
      </GoogleOAuthProvider>
    </div>
  )
}
