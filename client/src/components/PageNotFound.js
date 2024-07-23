import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='App'>
        <h2>PAGE NOT FOUND</h2>
        <Link to="/">Go to Sign In</Link>
    </div>
  )
}

export default PageNotFound