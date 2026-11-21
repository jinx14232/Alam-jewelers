
import { useState } from 'react'
import Loader from './Loader';
import {NavLink} from 'react-router-dom'
import InventoryCard from './InventoryCard';
import { apiFetch } from '../api';

function Inventory({ products, bars, setTracker }) {

    const [activeTab, setActiveTab] = useState('products');
    const [loading, setLoading] = useState(false)

    const items = activeTab === 'products' ? products : bars;
    
    async function deleteProduct(id) {
        setLoading(true)
        try {

            const response = await apiFetch(`/admin/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to delete product')
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
    async function deleteBar(id) {
        setLoading(true)
        try {

            const response = await apiFetch(`/admin/bar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to delete bar')
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
                        Bars
                    </button>
                </div>

                {!loading ?
                    <div className="inventory">
                        <h2>Recent Uploads</h2>
                        {items.length > 0 ?
                            <>
                                <div className="grid">

                                    {
                                        items.slice(0, 5).map((item, id) => (
                                            <InventoryCard 
                                                key={id}
                                                item = {item}
                                                activeTab = {activeTab}
                                                handleDelete={activeTab == 'products'? deleteProduct : deleteBar}
                                            />
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
    )
}

export default Inventory
