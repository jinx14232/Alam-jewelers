import { Outlet } from 'react-router-dom'
import Header from './componants/admin layout/Header.jsx'
import Sidebar from './componants/admin layout/Sidebar.jsx'
import MobileNav from './componants/admin layout/MobileNav.jsx'
import { useState } from 'react'
function AdminLayout() {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="admin-layout">

            <Sidebar
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            {menuOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <div className="admin-main">

                <Header
                    setMenuOpen={setMenuOpen}
                />

                <main className="admin-content">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

export default AdminLayout