import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Student() {
    const url = "https://localhost:44320/api/Student"
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(url)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <div className="card m-5">
                <h5 className="card-header">All Student</h5>
                <div className="card-body">
                    <ul style={{ listStyle: 'none' }}>
                        {
                            data.map((student, index) => {
                                return (
                                    <li key={student.StuID}>{`${index + 1}. ${student.FirstName} ${student.LastName}`}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
