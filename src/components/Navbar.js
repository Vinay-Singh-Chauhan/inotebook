import React from 'react'
import {Link,useLocation, useNavigate} from "react-router-dom";
const Navbar = () => {
  let location=useLocation();
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
          <Link className={`nav-link  ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
      </ul>
      {!localStorage.getItem('token')?
      <form className="d-flex" >
        
      <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
      <Link className="btn btn-primary mx-2" to="/signin" role="button">SignIn</Link>
      </form>:<Link className="btn btn-primary mx-2" onClick={handleLogout} to="/signin" role="button">SignOut</Link>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar