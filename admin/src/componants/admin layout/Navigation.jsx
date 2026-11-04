import { NavLink } from 'react-router-dom'
//class was assign wrt mobile and desktop navigation
function Navigation(props) {
    return (
        <nav className={props.class}>

            <NavLink to="/admin" end>
                Dashboard
            </NavLink>

            <NavLink to="/admin/biscuits">
                Add Biscuit
            </NavLink>

            <NavLink to="/admin/products">
                Add Product
            </NavLink>

            <NavLink to="/admin/categories">
                Categories
            </NavLink>

            <NavLink to="/admin/metals">
                Metals
            </NavLink>

        </nav>
    )
}

export default Navigation