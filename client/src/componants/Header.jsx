import '../style.css'
import logoImg from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

function Header(props) {

    return (
        <header>
            <nav className="nav-bar">

                <div className="links links-left">

                     <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/collection" end>
                        Collections
                    </NavLink>

                    <NavLink to="/bars">
                        Bars
                    </NavLink>

                </div>

                <button className="menu-btn" onClick={props.setMenuOpen}>
                    ☰
                </button>

                <div className="logo">
                    <img src={logoImg} className='logo-img' alt="logo" />
                    <div className="text">
                        <h2>ALAM</h2>
                        <span>JEWELLERS</span>
                    </div>
                </div>

                <div className="links links-right">

                     <NavLink to="/liverates">
                        Live Rates
                    </NavLink>

                    <a href="#contact">Contacts</a>
                    <button className="cart-btn right" onClick={props.onCartClick}>Cart</button>

                </div>

            </nav>
        </header>
    )
}

export default Header