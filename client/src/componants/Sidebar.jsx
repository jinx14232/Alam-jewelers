
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
                    <a href="" className="active">Collections</a>
                    <a href="">Biscuits</a>
                    <a href="">Live Rates</a>
                    <a href="">Contacts</a>
            </div>


        </aside>
    )
}
export default Sidebar