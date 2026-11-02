import '../style.css'
import logoImg from '../assets/logo.png'

function Header(props){
    
    return(
        <header>
            <nav className="nav-bar">
                <div className="logo">
                    <img src={logoImg} className='logo-img' alt="logo"/>
                    <h2>Alam Jewellers</h2>
                </div>
                <div className="links">
                    <a href="#catelog">Collection</a>
                    <a href="#contact">Contacts</a>
                    <button className= "cart-btn" onClick={props.onCartClick}>Cart</button>
                </div>
            </nav>
        </header>
    )
}

export default Header