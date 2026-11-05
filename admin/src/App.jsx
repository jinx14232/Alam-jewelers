import AddProduct from "./componants/add product/AddProduct.jsx"
import AdminLayout from "./AdminLayout.jsx"
import Dashboard from './componants/Dashboard.jsx'
import Bars from './componants/Bars.jsx'
import Categories from './componants/Categories.jsx'
import Metals from './componants/Metals.jsx'

import './style.css'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    <Route
                      index
                      element={<Dashboard />}
                    />
                    <Route
                        path="/admin/products"
                        element={<AddProduct />}
                    />
                    <Route
                        path="/admin/bars"
                        element={<Bars />}
                    />
                    <Route
                        path="/admin/categories"
                        element={<Categories />}
                    />
                    <Route
                        path="/admin/metals"
                        element={<Metals />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
