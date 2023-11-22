import React from 'react'
import './Card.scss'
function Card({title,id,feature}) {
  return (
    <div className='card'>
        <div className="cam">{id}</div>
        <div className="title">{title}</div>
        <div className="feature">
            {feature}
        </div>
    </div>
  )
}

export default Card