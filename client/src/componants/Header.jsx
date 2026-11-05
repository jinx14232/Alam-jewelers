import '../style.css'
import logoImg from '../assets/logo.png'

function Header(props) {

    return (
        <header>
            <nav className="nav-bar">

                <div className="links links-left">
                    <a href="#catelog" className='left'>Collections</a>
                    <a href="#contact" className='left'>Bars</a>

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
                    <a href="#contact" className='right'>Live Rates</a>
                    <button className= "cart-btn right" onClick={props.onCartClick}>Cart</button>
                </div>

            </nav>
        </header>
    )
}

export default Header