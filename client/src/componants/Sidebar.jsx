import { NavLink } from 'react-router-dom'

function Sidebar(props) {

    return (
        <aside className='sidebar'>

            <button
                className="x"
                onClick={() => props.setMenuOpen(false)}
            >
                ✕
            </button>

            <div className="sidebar-logo logo">
                <img src="./logo.png" alt="logo" className='logo-img' />
                <div className="text">
                    <h2>ALAM</h2>
                    <span>JEWELLERS</span>
                </div>
            </div>

            <div className="links">

                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/collection" end>
                    Collections
                </NavLink>

                <NavLink to="/bars">
                    Bars
                </NavLink>

                <NavLink to="/liverates">
                    Live Rates
                </NavLink>

                <a href="#contact">Contacts</a>

            </div>


        </aside>
    )
}
export default Sidebar