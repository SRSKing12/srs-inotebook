import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'


const Navbar = (props) => {
  let location = useLocation()
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location])

  let navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
    props.showAlert("Logged out successfully", "success")
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? <div>
            <Link className="btn btn-outline-success mx-2" to="/signup" role="button">Sign Up</Link>
            <Link className="btn btn-outline-warning mx-2" to="/login" role="button">Login</Link>
            </div> : <button onClick={handleLogout} className="btn btn-outline-danger mx-2">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar