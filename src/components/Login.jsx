import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import AuthContext from "../context/AuthProvider"

export default function Login() {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const loginHandler = async (e) => {

        e.preventDefault()

        try {

            const { data } = await axios.post("Auth/Login", { username, password }, { withCredentials: true })

            axios.defaults.headers.common["Authorization"] = `Bearer ${data.AccessToken}`

            setAuth(data)
            navigate("/")
        } catch (error) {

            if(!error?.response)
                setErrMsg("No Server response")
            else if(error.response?.status === 400)
                setErrMsg("Missing Username and Password")
            else if(error.response?.status === 401)
                setErrMsg("Unauthorized")
            else
                setErrMsg("Login failed")
        }
    } 

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <div style={{ width: 500 }}>
                <h2 style={{ textAlign: 'center' }} className="mt-5">LOG IN</h2>
                {
                    errMsg && 
                    <div className="alert alert-danger" role="alert">
                        <span style={{ color: 'red' }}>{errMsg}</span>
                    </div>
                }
                <form onSubmit={loginHandler}>
                    <div className="mt-3">
                        <label style={{ marginRight: 10, width: 100 }}>Username</label>
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className="mt-3">
                        <label style={{ marginRight: 10, width: 100 }}>Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <button className='form-control mt-3 btn btn-primary' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}