import React from 'react'
import gameboklogo from '../../Icons/gamebop-logo.png'
import './Watermark.css'

function Watermark(){
    return (
        <div className="watermark">
            <img className="logoImage" src={gameboklogo} alt="Gamebop Logo"/>
            <span className="logoText">Gamebop</span>
        </div>
    )
}

export default Watermark