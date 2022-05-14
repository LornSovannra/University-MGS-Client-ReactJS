import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=>{
    (
      async () => {
        try {
          
          const { data } = await axios.get("Auth/User")
  
          setAuth(data)
        } catch (error) {
          navigate("/login")
        }
      }
    )()
  }, [])

  const logoutHandler = async () => {

    await axios.post("Auth/Logout", {}, { withCredentials: true })

    setAuth("")
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">U-MGS</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                      <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                      <Link className="nav-link" to="/student">Student</Link>
                      <Link className="nav-link" to="/explorer">Explorer</Link>
                  </div>
                </div>
            </div>
            <div className="navbar-nav">
              {
                auth?
                  <Link onClick={()=>logoutHandler()} className="nav-link" to="/login">Logout</Link> 
                  : 
                (
                  <>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                  </>
                )
              }

              {/*   <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link> */}
            </div>
        </nav>
    </div>
  )
}