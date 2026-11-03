function Header(props) {
    return (
        <header className="admin-header">

            <div className="logo">
                <img src="./logo.png" alt="logo" className='logo-img' />
                <div className="text">
                    <h2>ALAM</h2>
                    <span>JEWELERS</span>
                </div>
            </div>

            <div className="header-title">
                <h3>Admin Panel</h3>
            </div>

            <button className="menu-btn" onClick={()=> props.setMenuOpen(true)}>
                ☰ Menu
            </button>
            
        </header>
    )
}

export default Header