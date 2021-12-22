import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../images/logo1.jpg'
import Dropdown from 'react-bootstrap/Dropdown'

export default function Navbar() {
    const currentBasketItems = useSelector(state => state.addToBasketReducer)
    const { basketItems } = currentBasketItems

    const currentUserState = useSelector(state => state.loginUserReducer)
    const { userLoged } = currentUserState

    function logout() {
        localStorage.removeItem('userlogedin')
        window.location.reload()
        console.log('logout');
    }

    return (
        <div className="navbar-container">
            <div className='navbar-user-details'>
                <Link className="navbar-link basketIcon" to='/basket'><p className='navbar-basket-length'>{basketItems.length}</p><i className="bi bi-cart3"></i></Link>
                {
                    userLoged ?
                        (
                            <Dropdown className='dropdown mt-2'>
                                <Dropdown.Toggle variant="white" bg="white" expand="lg" size="lg" id="dropdown-basic">
                                    {userLoged.username}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='dropdown p-3'>
                                    <p>
                                        <Link className="navbar-dropdown-link" to="/userorder">سفارشات من</Link>
                                    </p>
                                    <p>
                                        <Link className="navbar-dropdown-link" to="/ordersending">سفارشات منتظر</Link>
                                    </p>
                                    <p>
                                        <Link className="navbar-dropdown-link" to="/customerspage">امور مشترکین(ثبت، جستجو)</Link>
                                    </p>
                                    {userLoged.access === 'admin' &&
                                        <p>
                                            <Link className="navbar-dropdown-link" to="/admin">صفحه مدیریت</Link>
                                        </p>}
                                    <button className='navbar-dropdown-btn' onClick={logout}>خروج</button>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) :
                        <Link className="navbar-link navbar-login mt-2" to='/login'>ورود</Link>
                }
            </div>
            <div>
                <Link to='/'>
                    <img src={logo} alt="resturant-logo" className='resturant-logo' />
                </Link>
            </div>
        </div>
    )
}
