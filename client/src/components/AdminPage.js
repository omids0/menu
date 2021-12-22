import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import NavbarAdmin from './admin/NavbarAdmin'

export default function AdminPage() {

    useEffect(() => {
        window.location.href = '/admin/users'
    },[])

    return (
        <div className="page-container">
            <NavbarAdmin />
            <h4 className="users-header">صفحه مدیریت:</h4>
        </div>
    )
}
