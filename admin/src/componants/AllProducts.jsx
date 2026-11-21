
import { NavLink } from 'react-router-dom'
import Header from './Header'
import react from 'react'
import Loader from './Loader'
import InventoryCard from './InventoryCard'
import { apiFetch } from '../api'


export default function () {

    const [products, setProducts] = react.useState([])
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {

        async function getProducts() {
            try {
                const response = await apiFetch(`/admin/allProducts`)

                if (!response.ok) {
                    alert('Error occoured')
                    throw new Error('Failed to fetch products')
                }

                const res = await response.json()
                setProducts(res.products)

            } catch (e) {
                console.log(error)
                alert('Error occoured')
            } finally {
                setLoading(false)
            }
        }
        getProducts()

    }, [])

    return (
        <>
            <div className="admin-page">
                <div className="bread-crumbs">
                    <NavLink to="/admin" end>
                        Dashboard
                    </NavLink>
                    <span> / </span>
                    <NavLink to="/admin/inventory/products" end>
                        All Products
                    </NavLink>
                </div>
                <Header
                    heading='All Products'
                    subHeading='Show Case of all uploaded products'
                />
                <section className="add-form">
                    <section className="form-section">
                        <h2>Jewellery</h2>

                        {loading ? <Loader /> :
                            <>
                                {products.length > 0 ?
                                    <div className="grid">

                                        {
                                            products.map(item => (
                                                <InventoryCard
                                                    item={item}
                                                    activeTab="products"
                                                />
                                            ))
                                        }

                                    </div>
                                    :
                                    <p className="empty-inventory">
                                        No items found.
                                    </p>
                                }
                            </>
                        }

                    </section>
                </section>

            </div>

        </>
    )
}