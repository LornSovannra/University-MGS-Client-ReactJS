import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineFileWord, AiOutlineFilePpt, AiOutlinePicture } from 'react-icons/ai'
import { VscFilePdf } from 'react-icons/vsc'
import { ImFileVideo } from 'react-icons/im'

export default function Folder() {
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [folderName, setFolderName] = useState("")

    const submitHandler = () => {

        axios.get(`https://localhost:44320/api/Explorer/ViewAllFile?folderName=${folderName}`)
            .then(res => {
                setData(res.data)
                setError("")
            })
            .catch(error => {
                if(error.response?.status === 400)
                    setError("Please enter folder name!")
                else if(error.response?.status === 401)
                    setError("Unauthorized")
                else if(error.response?.status === 500)
                    setError("Folder doesn't exist!")
            })
    }

    return (
        <div>
            <div className="m-5">
                <p style={{ color: 'red' }}>{error}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: 10 }}>Search</label>
                    <input type="text" className="form-control" onChange={(e) => setFolderName(e.target.value)} onKeyDown={(e) =>  e.key === "Enter" && submitHandler()} />
                </div>
            </div>
            <div className="card m-5">
                <h5 className="card-header">All File</h5>
                <div className='m-2'>
                </div>
                <div className="card-body">
                    <ul style={{ listStyle: 'none' }}>
                        {
                            data.map((file, index) => {
                                return (
                                    <li key={index} style={{ padding: '5px 0', alignItems: 'center', display: 'flex', marginLeft: -30 }}>
                                        { file.FileName.split(".").pop() === "pdf" && <VscFilePdf color='#d62828' size={25} /> }
                                        { file.FileName.split(".").pop() === "docx" && <AiOutlineFileWord color="#023e8a" size={25} /> }
                                        { file.FileName.split(".").pop() === "doc" && <AiOutlineFileWord color="black" size={25} /> }
                                        { file.FileName.split(".").pop() === "pptx" && <AiOutlineFilePpt color="#f72585" size={25} /> }
                                        { file.FileName.split(".").pop() === "png" && <AiOutlinePicture color="green" size={25} /> }
                                        { file.FileName.split(".").pop() === "jpg" && <AiOutlinePicture color="black" size={25} /> }
                                        { file.FileName.split(".").pop() === "jpeg" && <AiOutlinePicture color="black" size={25} /> }
                                        { file.FileName.split(".").pop() === "mp4" && <ImFileVideo color="#9a031e" size={25} /> }
                                        <a style={{ textDecoration: 'none', color: 'black', margin: '0 0 0 10px' }} href={`https://localhost:44320/api/Explorer/OpenFile?folderName=${folderName}&fileName=${file.FileName}`} target="_blank">{`${file.FileName}`}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
