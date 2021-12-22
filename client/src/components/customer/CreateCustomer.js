import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCustomerAction, getAllCustomersAction } from '../reduxfiles/actions/customersAction'

export default function CreateCustomer() {
      const getAllCustomerState = useSelector(state => state.getAllCustomersReducer)
      const { loadingcustomers, errorLoadingCustomers, allcustomers } = getAllCustomerState

      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(getAllCustomersAction())
      }, [])

      const [customerId, setcustomerId] = useState('')
      const [customerName, setcustomerName] = useState('')
      const [customerTel, setcustomerTel] = useState('')
      const [customerAddress, setcustomerAddress] = useState('')

      useEffect(() => {
            if (allcustomers) {
                  setcustomerId(allcustomers.length + 3000)
            }
      }, [allcustomers, dispatch])

      function addCustomer() {
            if (
                  customerId &&
                  customerName &&
                  customerTel &&
                  customerAddress) {
                  const customer = {
                        customerId,
                        customerName,
                        customerTel,
                        customerAddress
                  }
                  dispatch(addNewCustomerAction(customer))
                  if (customerId.length > 0) {
                        setcustomerName('')
                        setcustomerTel('')
                        setcustomerAddress('')
                  }
                  alert('مشترک جدید ثبت شد.')
                  window.location.href = '/customerspage/'
            } else {
                  alert('لطفا تمامی فیلدهای مشترک را پر نمایید.')
            }
      }

      return (
            <div className="page-container">
                  <h4 className="users-header">ثبت مشترک جدید</h4>
                  <div className="add-user-form mt-3">
                        <label className="form-label">
                              شماره اشتراک:
                              <input className='add-food-form-input' type='text' placeholder='شماره اشتراک' value={customerId} />
                        </label>
                        <label className="form-label">
                              نام مشترک:
                              <input className='add-food-form-input' type='text' placeholder='شماره اشتراک' value={customerName} onChange={(e) => setcustomerName(e.target.value)} />
                        </label>
                        <label className="form-label">
                              شماره تماس:
                              <input className='add-food-form-input' type='text' placeholder='شماره اشتراک' value={customerTel} onChange={(e) => setcustomerTel(e.target.value)} />
                        </label>
                        <label className="form-label">
                              آدرس مشترک:
                              <textarea className='add-food-form-input' type='text' placeholder='آدرس مشترک' value={customerAddress} onChange={(e) => setcustomerAddress(e.target.value)}></textarea>
                        </label>
                        <div>
                              <button className='edit-btn' onClick={addCustomer}>ذخیره</button>
                        </div>
                  </div>
            </div>
      )
}
