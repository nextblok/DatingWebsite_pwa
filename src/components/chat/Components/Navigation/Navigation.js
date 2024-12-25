import React from 'react'
import logo from '../../Icons/gamebop-logo.png'
import '../Navigation/Navigation.css'

const Navigation = () => {
    return (
        <header className="dropShadow">
            <div className="headerWrapper">
                <div className="headerContainer flex">
                    <div className="headerLogoLinkWrapper">
                        <div className="headerLogoLink">
                        <a href='/'>
                            <div className="headerLogo flex flex-row">
                                <div className="logoImg">
                                    <img src={logo} alt="Gamebop Logo"/>
                                </div>
                                <div className="logoText">
                                    Gamebop
                                </div>
                            </div>
                        </a>
                        </div>
                    </div>                  
                </div>
            </div>
        </header>
    )
}
export default Navigation