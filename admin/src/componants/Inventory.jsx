
import { useState } from 'react'
import Loader from './Loader';
import {NavLink} from 'react-router-dom'

function Inventory({ products, bars, onViewAll, setTracker }) {

    const [activeTab, setActiveTab] = useState('products');
    const [loading, setLoading] = useState(false)

    const items = activeTab === 'products' ? products : bars;
    async function handleDelete(id) {
        setLoading(true)
        try {

            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to fetch products')
            }

            const res = await response.json()
            alert(res.message)
            if(res)
                setTracker(prev=> prev+1)

        } catch (error) {
            console.log(error)
            alert('Error occoured')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="add-form">

            <div className="form-section">
                <h2>Inventory</h2>

                <div className="metal-select">
                    <button
                        className={activeTab === 'products' ? 'filled btn' : 'simple btn'}
                        onClick={() => setActiveTab('products')}
                    >
                        Jewelry
                    </button>

                    <button
                        className={activeTab === 'bars' ? 'filled btn' : 'simple btn'}
                        onClick={() => setActiveTab('bars')}
                    >
                        Gold Bars
                    </button>
                </div>

                {!loading ?
                    <div className="inventory">
                        <h2>Recent Uploads</h2>
                        {items.length > 0 ?
                            <>
                                <div className="grid">

                                    {
                                        items.slice(0, 5).map(item => (
                                            <div>
                                            <div className="card" key={item.id}>

                                                <img src={item.image_url} className='cover' />

                                                <div className="data">
                                                    <h3
                                                        className={activeTab === 'bars' ? 'bar-name' : ''}
                                                        style={{ marginBottom: activeTab === 'products' ? '10px' : 0 }}
                                                    >{item.name}</h3>

                                                    <div className="meta">Price {item.price} -/Rs</div>

                                                    {activeTab === 'products' &&
                                                        <>
                                                            <p className="meta">
                                                                {item.audience} · {item.category}
                                                            </p>
                                                            <p className="meta">
                                                                {item.metals}
                                                            </p>
                                                        </>

                                                    }

                                                </div>

                                                <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>

                                            </div>
                                            <p className='time'>{item.time}</p>
                                            </div>

                                        ))
                                    }
                                </div>
                                
                                <NavLink className='btn filled view-all' to={`/admin/inventory/${activeTab}`}>
                                    View all {activeTab}
                                </NavLink>

                            </>
                            : (
                                <p className="empty-inventory">
                                    No items found.
                                </p>
                            )}
                    </div>
                    : <Loader />}

            </div>

        </section>
    );
}

export default Inventory
