import Navigation from "./Navigation"
function Sidebar(props) {
    return (
        <aside className={`sidebar ${props.menuOpen ? 'open' : ''}`}>

            <button
                className="x"
                onClick={() => props.setMenuOpen(false)}
            >
                ✕
            </button>

            <div className="sidebar-logo">
                <img src="/logo.png" alt="logo" className='logo-img'/>
                <h2>ALAM</h2>
                <span>JEWELERS</span>
            </div>
             
            <Navigation
                class="sidebar-nav"
            />

            <div className="header-right">
                <div className="admin-avatar">
                    A
                </div>
                <span>Welcome, Admin</span>
            </div>

        </aside>
    )
}

export default Sidebar