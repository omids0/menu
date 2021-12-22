import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { addUserAction, getAllUsersAction } from '../reduxfiles/actions/userAction'
import SomeThingWentWrong from '../SomeThingWentWrong'
import NavbarAdmin from './NavbarAdmin'

export default function Adduser() {
      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(getAllUsersAction())
      }, [])

      const getUsersState = useSelector(state => state.getAllUsersReducer)
      const { loading, error, users } = getUsersState

      const [username, setusername] = useState('')
      const [password, setpassword] = useState('')
      const [cpassword, setcpassword] = useState('')
      const [access, setaccess] = useState('simple')
      const [phoneNum, setphoneNum] = useState('')

      useEffect(() => {
            if (users.length > 0) {
                  setusername(users.length + 10001)
            }
      }, [users, loading, dispatch])

      function saveUser() {
            if (password === cpassword && username && password !== '' && phoneNum) {
                  const user = {
                        username,
                        password,
                        access,
                        phoneNum,
                        isActive: true,
                  }
                  dispatch(addUserAction(user))
            } else {
                  alert('لطفا تمامی فیلدها را با دقت تکمیل کنید.')
            }
      }

      return (
            <div className="page-container">
                  <NavbarAdmin />
                  <h4 className="users-header">صفحه مدیریت/کاربران/کاربر جدید:</h4>
                  {
                        loading ? <Loading /> : error ? <SomeThingWentWrong /> : (
                              <div className="add-user-form">
                                    <label className="form-label">
                                          نام کاربری:
                                          <input type='text' className='add-food-form-input' placeholder='نام کاربری' value={username} />
                                    </label>
                                    <label className="form-label">
                                          رمز ورود:
                                          <input type='password' className='add-food-form-input' placeholder='رمز ورود' value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </label>
                                    <label className="form-label">
                                          تایید رمز ورود:
                                          <input type='password' className='add-food-form-input' placeholder='تایید رمز ورود' value={cpassword} onChange={(e) => setcpassword(e.target.value)} />
                                    </label>
                                    <label className="form-label">
                                          سطح دسترسی:
                                          <select placeholder='دسترسی' className='add-food-form-input' value={access} onChange={(e) => setaccess(e.target.value)} >
                                                <option value='admin'>مدیریت(ادمین)</option>
                                                <option value='cashier'>صندوقدار</option>
                                                <option value='simple'>ساده</option>
                                          </select>
                                    </label>
                                    <label className="form-label">
                                          شماره تماس کاربر:
                                          <input type='tel' placeholder='شماره تماس کاربر' className='add-food-form-input' value={phoneNum} onChange={(e) => setphoneNum(e.target.value)} />
                                    </label>
                                    <button className='add-food-btn' onClick={saveUser}>ذخیره</button>
                              </div>
                        )
                  }
            </div>
      )
}
