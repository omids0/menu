import React from 'react'

export default function SignupPage() {
    return (
        <div>
            <input type='text' placeholder='نام کاربری' />
            <input type='tel' placeholder='شماره تماس' />
            <input type='password' placeholder='رمز ورود'/>
            <input type='password' placeholder='تایید رمز ورود' />
            <button>ذخیره</button>
        </div>
    )
}
