import React from 'react';
import style from './Navbar.module.css';
import Logo from './../../assets/logo.png'
function Navbar() {
    return (
        <div className={ style.header }>
            <div className={ style.nav }>
                <img src={ Logo } alt="logo" className={ style.nav__logo } />
                <span className={ style.nav__name }>Gallery</span>
            </div>
        </div>
    )
}

export default Navbar
