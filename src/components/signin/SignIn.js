import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/slice';


import Alert from '../../utiles/alert/Alert';
import './signin.css'


const SignIn = () => {
    window.scrollTo(0, 0)
    const [response, setresponse] = useState({ type: "", message: "", isExist: false })
    const dispatch = useDispatch()
    
    const handlSubmit = async (e) => { 
        e.preventDefault();
        const response = await fetch('https://imade-store.herokuapp.com/auth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
        })

        const { access, refresh } = await response.json()
        if (response.status === 200) {
            dispatch(login({ access, refresh }))

            window.location = "/"
        } else setresponse({ type: "error", message: "incorrect  username or password", isExist: true })
    };

    return (
        <div className='signin'>
            <form onSubmit={handlSubmit} >
                <input
                    type="text"
                    placeholder='email' 
                    name='email'
                    required
                />
                <input
                    type="password"
                    placeholder='password'
                    name='password'
                    required
                />
                <div className='registration'>
                    <button type="submit" className='registrationbutton'>Sign In</button>
                    <div>
                        <Link to ="/signup" >
                           <span>Sign Up  </span> 
                            <span> <FontAwesomeIcon icon={ faUser} /></span>
                        </Link></div>
                </div>
            </form >
            {response.isExist && <Alert setresponse={setresponse} response={response} />}
        </div>
    )
}

export default SignIn