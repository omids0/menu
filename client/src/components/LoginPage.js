import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { loginUserAction } from './reduxfiles/actions/userAction';

export default function LoginPage() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const dispatch = useDispatch()
    const loginUserState = useSelector(state => state.loginUserReducer)
    const { loading, error } = loginUserState

    function goingToLogin() {
        if (username && password) {
            const user = {
                username,
                password
            }
            dispatch(loginUserAction(user))
        } else {
            alert('لطفا تمامی فیلدها را پر نمایید.')
        }
    }

    return (
        <div className="page-container">
            <h3 className="login_header">صفحه ورود</h3>
            <div className='login-form shadow'>
                <label className="login-label-form">
                    نام کاربری:
                    <input type='text' placeholder='نام کاربری' className='login-inputs' onChange={(e) => setusername(e.target.value)} />
                </label>
                <label className="login-label-form">
                    رمز ورود:
                    <input type='password' placeholder='رمز ورود' className='login-inputs' onChange={(e) => setpassword(e.target.value)} />
                </label>
                <button onClick={goingToLogin} className='login-btn mb-3'>ورود</button>
                {loading && <Loading />}
                {error && <p className="empty-basket">اطلاعات وارد شده صحیح نمی باشد.</p>}
            </div>
        </div>
    )
}
