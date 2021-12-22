import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCustomerAction, getAllCustomersAction, removeCustomerAction } from '../reduxfiles/actions/customersAction'

export default function EditCustomer({ match }) {
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
                  const customer = allcustomers.find(customer => customer._id === match.params.id)
                  setcustomerId(customer.customerId)
                  setcustomerName(customer.customerName)
                  setcustomerTel(customer.customerTel)
                  setcustomerAddress(customer.customerAddress)
            }
      }, [allcustomers, dispatch])

      function removeCustomer() {
            dispatch(removeCustomerAction(match.params.id))
      }

      function editCustomer() {
            if (
                  customerId &&
                  customerName &&
                  customerTel &&
                  customerAddress) {
                  const customer = {
                        _id: match.params.id,
                        customerId,
                        customerName,
                        customerTel,
                        customerAddress
                  }
                  dispatch(editCustomerAction(customer))
            } else {
                  alert('لطفا تمامی فیلدهای مشترک را پر نمایید.')
            }
      }

      return (
            <div className="page-container">
                  <h4 className="users-header">ویرایش مشترک</h4>
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
                              <button className='edit-btn' onClick={editCustomer}>ذخیره</button>
                              <button className='delete-btn' onClick={removeCustomer}>حذف</button>
                        </div>
                  </div>
            </div>
      )
}

