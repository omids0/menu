import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
      return (
            <div className="page-container">
                  <div className='container-404'>
                        <h1 className='title-404'>404!</h1>
                        <img className='gif-404' src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt='page-not-found' />
                        <p className='p-404'>Page not found</p>
                        <Link className='link go-home-404' to='/'>Go Home</Link>
                  </div>
            </div>
      )
}
