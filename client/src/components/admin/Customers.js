import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../Loading'
import { getAllCustomersAction } from '../reduxfiles/actions/customersAction'
import SomeThingWentWrong from '../SomeThingWentWrong'
import NavbarAdmin from './NavbarAdmin'

export default function Customers() {
    const dispatch = useDispatch()
    const [search, setsearch] = useState('')

    useEffect(() => {
          dispatch(getAllCustomersAction())
    }, [])

    const getAllCustomerState = useSelector(state => state.getAllCustomersReducer)
    const { loadingcustomers, errorLoadingCustomers, allcustomers } = getAllCustomerState

    return (
        <div className="page-container">
            <NavbarAdmin />
            <h4 className="users-header">صفحه مدیریت/مشترکین:</h4>
            
            <div className='customerpage-seletors'>
            <label className="customerpage-label">
                  جستجو مشترک:
                  <input className='search-customer' type='text' placeholder='جستجو' onChange={(e) => setsearch(e.target.value)} />
            </label>
            <button className="btn btn-success" onClick={() => window.location.href = '/customerspage/create'}><i class="bi bi-person-plus-fill h2 mx-2"></i> ثبت مشترک جدید</button>
      </div>
      <div className="table-with">
            {loadingcustomers && <Loading />}
            {errorLoadingCustomers && <SomeThingWentWrong />}
            {allcustomers && allcustomers.length > 0 && (
                  <Table striped bordered hover responsive>
                        <thead>
                              <tr>
                                    <th>#</th>
                                    <th>کد اشتراک</th>
                                    <th>نام مشترک</th>
                                    <th>آدرس مشترک</th>
                                    <th>ویرایش مشترک</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    allcustomers.map((customer, i) => (
                                          <tr>
                                                <td>{i + 1}</td>
                                                <td>{customer.customerId}</td>
                                                <td>{customer.customerName}</td>
                                                <td>{customer.customerAddress}</td>
                                                <td>
                                                      <Link to={`/customerspage/edit/${customer._id}`}>
                                                            <i class="bi bi-pencil-fill"></i>
                                                      </Link>
                                                </td>
                                          </tr>
                                    ))
                              }
                        </tbody>
                  </Table>
            )
            }

      </div>
        </div>
    )
}
