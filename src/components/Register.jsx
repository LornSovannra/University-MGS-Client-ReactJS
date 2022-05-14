import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

export default function Login() {
    const navigate = useNavigate()
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const loginHandler = async () => {

        if(username === "")
            setErrMsg("Input username!")
        else if(password === "")
            setErrMsg("Input password")
        else if(password !== confirmPassword)
            setErrMsg("Password not match")
        else{
            
            try {
    
                await axios.post("Auth/Register", { username, password })
    
                navigate("/login")
            } catch (error) {
    
                if(!error?.response)
                    setErrMsg("No Server response")
                else if(error.response?.status === 400)
                    setErrMsg("Missing Username and Password")
                else if(error.response?.status === 401)
                    setErrMsg("Unauthorized")
                else
                    setErrMsg("Register failed")
            }
        }
    } 

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <div style={{ width: 500 }}>
                <h2 style={{ textAlign: 'center' }} className="mt-5">REGISTER</h2>
                {
                    errMsg && 
                    <div className="alert alert-danger" role="alert">
                        <span style={{ color: 'red' }}>{errMsg}</span>
                    </div>
                }
                <div className="mt-3">
                    <label style={{ marginRight: 10, width: 100 }}>Username</label>
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className="mt-3">
                    <label style={{ marginRight: 10, width: 100 }}>Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="mt-3 text-nowrap">
                    <label style={{ marginRight: 10, width: 100 }}>Confirm Password</label>
                    <input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>
                <button className='form-control mt-3 btn btn-primary' onClick={() => loginHandler()}>Login</button>
            </div>
        </div>
    )
}