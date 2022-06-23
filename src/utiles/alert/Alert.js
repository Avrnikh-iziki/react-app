import React, { useEffect } from 'react'
import { logout, reset } from '../../redux/slice'
import { useDispatch } from 'react-redux'
import './alert.css'

const Alert = ({ setresponse, response }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            setresponse({ ...response, isExist: false })
         
            if (response.action === 'login') {
                window.location = '/signin'
                dispatch(logout())
            }
            if (response?.action === 'reset') {
                dispatch(reset())
                window.location = '/'
            }
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