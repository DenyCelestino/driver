import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <h4>Logo</h4>

      <div className="header-buttons">
        <div className="login-button">
          <FaUserCircle className="login-icon" />

          <Link href={'/login'}>Login</Link>
        </div>

        <Link className="btn btn-orange" href={'/free'}>
          COMEÇAR
        </Link>
      </div>
    </header>
  )
}
