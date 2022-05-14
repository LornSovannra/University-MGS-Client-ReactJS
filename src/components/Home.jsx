import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

export default function Home() {
  const { auth } = useContext(AuthContext)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='m-5'>
            <h1>{auth? `Hello, ${auth.Username} !` : 'Hello, Guest!'}</h1>
        </div>
    </div>
  )
}
