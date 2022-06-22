import React, { useEffect } from 'react'

import './alert.css'

const Alert = ({ setresponse, response , admin =  false }) => {

    useEffect(() => {
        setTimeout(() => {
            setresponse({...response ,isExist: false})
            if(admin) window.location = '/'
        }, 3000)
    })
    return (
        <div className='alert'>
            <div className={response.type === "success" ? " message success" : 'message error'}>
                {response.message}
            </div>
        </div>
    )
}

export default Alert