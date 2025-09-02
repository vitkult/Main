import React from 'react'
import "./SecretCode.css";

function SecretCode() {
  return (
    <div className='body'>
        <section className="secret-section">
      <p>Glide To Reveal Secret Code</p>
      <ul className="code">
        <li tabIndex="0" className="digit">
          <span>0</span>
        </li>
        <li tabIndex="0" className="digit">
          <span>3</span>
        </li>
        <li tabIndex="0" className="digit">
          <span>4</span>
        </li>
        <li tabIndex="0" className="digit">
          <span>8</span>
        </li>
        <li tabIndex="0" className="digit">
          <span>7</span>
        </li>
        <li tabIndex="0" className="digit">
          <span>2</span>
        </li>
      </ul>
    </section>
    </div>
  )
}

export default SecretCode