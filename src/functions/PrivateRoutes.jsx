// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { MyUserContext } from '@/context/UserContext'

// export default function PrivateRoutes({ children }) {
//   const { user } = MyUserContext()

//   const isLoggedIn = !!user

//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push('/find')
//     }
//   }, [isLoggedIn, router])

//   return isLoggedIn ? children : null
// }
