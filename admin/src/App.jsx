import AddProduct from "./componants/add product/AddProduct.jsx"
import AdminLayout from "./AdminLayout.jsx"
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
                      element={<AddProduct />}
                    />
                    <Route
                        path="/admin/biscuits"
                        element={<AddProduct />}
                    />
                    <Route
                        path="/admin/products"
                        element={<AddProduct />}
                    />
                    <Route
                        path="/admin/categories"
                        element={<AddProduct />}
                    />
                    <Route
                        path="/admin/metals"
                        element={<AddProduct />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
