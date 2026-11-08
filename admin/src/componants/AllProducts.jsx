
import { NavLink } from 'react-router-dom'
import Header from './Header'
import react from 'react'
import Loader from './Loader'


export default function () {

    const [products, setProducts] = react.useState([])
    const [loading, setLoading] = react.useState(true)

    react.useEffect(() => {

        async function getProducts() {
            try {
                const response = await fetch(`http://localhost:5000/allProducts`)

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
                                                <div>
                                                    <div className="card" key={item.id}>

                                                        <img src={item.image_url} className='cover' />

                                                        <div className="data">
                                                            <h3
                                                                style={{ marginBottom: '10px' }}
                                                            >{item.name}</h3>

                                                            <div className="meta">Price {item.price} -/Rs</div>


                                                            <p className="meta">
                                                                {item.audience} · {item.category}
                                                            </p>
                                                            <p className="meta">
                                                                {item.metals}
                                                            </p>

                                                        </div>

                                                        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>

                                                    </div>
                                                    <p className='time'>{item.time}</p>
                                                </div>

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