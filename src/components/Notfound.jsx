import React from 'react'
import "../css/Notfound.css"
import Footer from './Footer'

const Notfound = () => {
  return (
    <div className='Notfound'>
      <span style={{ fontSize: '3rem', color: '#C9A84C', display: 'block', marginBottom: '12px' }}>☽</span>
      <h1>Sorry, page not found…</h1>
      <h1>404</h1>
      <a href="/">← Return Home</a>
    </div>
  )
}

export default Notfound
