// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { ContextUser } from '@/context/ContextUser'

// export default function PrivateRoutes({ children }) {
//   const { user } = ContextUser()

//   const isLoggedIn = !!user

//   const router = useRouter()

//   useEffect(() => {
//     console.log(isLoggedIn)
//     if (!isLoggedIn) {
//       router.push('/login')
//     }
//   }, [])

//   return isLoggedIn ? children : null
// }
