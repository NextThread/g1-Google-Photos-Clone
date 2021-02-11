import React from 'react'
import "../css/Photo.css"

import { Tooltip } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'

import { db, storage } from "../firebase"

function Photo({ id, data }) {
    const handleDeletePhoto = () => {
        storage.ref('photos').child(`${id}_${data.name}`).delete()
            .then(() => db.collection('photos').doc(id).delete())
    }


    const downloadPhoto = () => {
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = (event) => {
            let blob = xhr.response
            console.log(blob)
            let a = document.createElement("a")
            a.style = "display: none"
            document.body.appendChild(a)

            let url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = data.name
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        }
        xhr.open('GET', data.photoURL)
        xhr.send()
    }

    const openImage = () => window.open(data.photoURL)

    return (
        <div className="photo">
            <img src={data.photoURL} alt="" className="photo__img" draggable="false" onClick={openImage} />
            <div className="photo__options">
                <Tooltip title="Delete">
                    <DeleteIcon onClick={handleDeletePhoto} />
                </Tooltip>

                <small className="photo__optionsName">{data.name}</small>

                <Tooltip title="Download" onClick={downloadPhoto} >
                    <GetAppIcon />
                </Tooltip>
            </div>
        </div>
    )
}

export default Photo
