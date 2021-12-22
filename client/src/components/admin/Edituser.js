import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { deleteUserAction, editUserAction, updateUserAction } from '../reduxfiles/actions/userAction'
import SomeThingWentWrong from '../SomeThingWentWrong'
import NavbarAdmin from './NavbarAdmin'

export default function Edituser({ match }) {
      const id = match.params.id
      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(editUserAction(id))
      }, [])

      const editUserState = useSelector(state => state.editUserReducer)
      const { loading, error, currentuser } = editUserState

      const [username, setusername] = useState('')
      const [password, setpassword] = useState('')
      const [cpassword, setcpassword] = useState('')
      const [access, setaccess] = useState('simple')
      const [phoneNum, setphoneNum] = useState('')
      const [isActive, setisActive] = useState('')

      function saveUser() {
            if (password === cpassword && username && password !== '' && phoneNum) {
                  const user = {
                        _id: currentuser._id,
                        username,
                        password,
                        access,
                        phoneNum,
                        isActive,
                  }
                  dispatch(updateUserAction(user))
            } else {
                  alert('لطفا تمامی فیلدها را با دقت تکمیل کنید.')
            }
      }

      function removeUser() {
            dispatch(deleteUserAction(currentuser._id))
      }

      useEffect(() => {
            if (currentuser) {
                  console.log(currentuser.isActive);

                  setusername(currentuser.username)
                  setusername(currentuser.username)
                  setpassword(currentuser.password)
                  setaccess(currentuser.access)
                  setphoneNum(currentuser.phoneNum)
                  setisActive(currentuser.isActive)
            }
      }, [currentuser, loading, dispatch])

      return (
            <div className="page-container">
                  <NavbarAdmin />
                  <h4 className="users-header">صفحه مدیریت/کاربران/ویرایش کاربر :</h4>
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
                                    <label className="form-label">
                                          وضعیت استخدام:
                                          <input type='checkbox' checked={isActive} onChange={(e) => setisActive(!isActive)} />
                                    </label>
                                    <div className='edit_user_btns'>
                                          <button className='edit-btn' onClick={saveUser}>ذخیره</button>
                                          <button className='delete-btn' onClick={removeUser}>حذف کاربر</button>
                                    </div>
                              </div>
                        )
                  }
            </div>
      )
}
