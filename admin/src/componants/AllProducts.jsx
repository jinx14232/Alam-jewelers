
import { NavLink } from 'react-router-dom'
import Header from './Header'
import react from 'react'
import Loader from './Loader'
import InventoryCard from './InventoryCard'
import { apiFetch } from '../api'


export default function () {

    const [products, setProducts] = react.useState([])
    const [loading, setLoading] = react.useState(true)
    const [tracker, setTracker] = react.useState(0)

    const [deletingItems, setDeletingItems] = react.useState(false)
    const [featuring, setFeaturing] = react.useState(false)


    react.useEffect(() => {
        console.log('refetching products')
        setLoading(true)
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

    }, [tracker])

    async function handleDelete(id, _) {

        setDeletingItems(true)
        try {

            const response = await apiFetch(`/admin/product/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to delete product/bar')
            }

            const res = await response.json()

            if (res.error) {
                setDeletingItems(false)
                alert(res.error)
                return
            }

            setDeletingItems(false)
            alert(res.message)
            setTracker(prev => prev + 1)

        } catch (error) {
            console.log(error)
            alert('Error occoured')
            setDeletingItems(false)
        }
    }

    async function handleFeature(id, isFeatured, _) {

        setFeaturing(true)

        try {

            const response = await apiFetch(`/admin/updateFeatureProduct`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    isFeatured: !isFeatured
                })
            })

            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to feature product')
            }

            const res = await response.json()
            alert(res.message)

            onFeature(id, _, !isFeatured)

        } catch (error) {

            console.log(error)
            alert('Error occoured')

        } finally {
            setFeaturing(false)
        }
    }
    function onFeature(id, _, isFeatured) {

        setProducts(prev =>
            prev.map(product =>
                product.id === id
                    ? { ...product, isFeatured: isFeatured }
                    : product
            )
        )
    }

    return (
        <>
            {(deletingItems||featuring) && <Loader />}

            <div className="admin-page">
                <div className="bread-crumbs">
                    <NavLink to="/" end>
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
                                            products.map((item, id) => (
                                                <InventoryCard
                                                    key={id}
                                                    item={item}
                                                    isProduct={true}
                                                    handleDelete={handleDelete}
                                                    handleFeature={handleFeature}
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