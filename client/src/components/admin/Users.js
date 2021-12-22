import React, { useEffect } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../reduxfiles/actions/userAction'
import Loading from '../Loading'
import SomeThingWentWrong from '../SomeThingWentWrong'
import { Table } from 'react-bootstrap'

export default function Users() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [])

    const getUsersState = useSelector(state => state.getAllUsersReducer)
    const { loading, error, users } = getUsersState

    return (
        <div className="page-container">
            <NavbarAdmin />
            <h4 className="users-header">صفحه مدیریت/کاربران:</h4>
            <Link className="add-new-food-link" to='/admin/users/adduser'>
                <button className="mb-4 add-new-food"><i class="bi h1 bi-plus plus-icon"></i> کاربر جدید</button>
            </Link>
            <div className="table-with">
                {loading ? <Loading /> : error ? <SomeThingWentWrong /> : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>نام کاربری</th>
                                    <th>رمز ورود</th>
                                    <th>سطح دسترسی(سمت)</th>
                                    <th>شماره تماس کاربر</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, i) => (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.password}</td>
                                            <td>{user.access}</td>
                                            <td>{user.phoneNum}</td>
                                            <td>{user.isActive ?
                                                <p>فعال</p> :
                                                <p>غیر فعال</p>
                                            }
                                                <Link to={`/admin/users/edit/${user._id}`}>
                                                    <i class="bi bi-pencil-fill"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>)
                }
            </div>
        </div>
    )
}
