import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="headerLink">
          HOME
        </Link>
        <Link to="/albums" className="headerLink">
          ALBUMS
        </Link>
        <Link to="/about" className="headerLink">
          ABOUT
        </Link>
      </nav>
    </header>
  )
}

export default Nav
