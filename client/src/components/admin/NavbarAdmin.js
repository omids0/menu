import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarAdmin() {
    return (
        <div className="component-navbar">
            <div className="component-navbar-selections">
                    <Link className="nav-links" to='/admin/users'>کاربران</Link>
                    <Link className="nav-links" to='/admin/foods'>غذاها</Link>
                    <Link className="nav-links" to='/admin/orders'>سفارشات</Link>
                    <Link className="nav-links" to='/admin/customers'>مشترکین</Link>
            </div>
        </div>
    )
}
