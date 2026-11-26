
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import InventoryCard from './InventoryCard';
import Loader from './Loader';

function Inventory({ products, bars, loadingItems, setInvTracker, onFeature }) {

    const [activeTab, setActiveTab] = useState('products');
    const items = activeTab === 'products' ? products : bars;

    const [deletingItems, setDeletingItems] = useState(false)

    async function handleDelete(id, isProduct) {

        setDeletingItems(true)
        try {

            const response = isProduct ? await apiFetch(`/admin/product/${id}`, {
                method: 'DELETE'
            }) :
                await apiFetch(`/admin/bar/${id}`, {
                    method: 'DELETE'
                })

            if (!response.ok) {
                alert('Error occoured')
                throw new Error('Failed to delete product/bar')
            }

            const res = await response.json()

            if(res.error){
                setDeletingItems(false)
                alert(res.error)
                return
            }
            
            alert(res.message)

            setDeletingItems(false)

            //refetch the items
            setInvTracker(prev => prev + 1)

        } catch (error) {
            console.log(error)
            alert('Error occoured')
            setDeletingItems(false)
        } 
    }



    return (
        <>

        {deletingItems && <Loader/>} 

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

                <div className="inventory">
                    <h2>Recent Uploads</h2>

                    {loadingItems ? <Loader /> :

                        items.length > 0 ?
                            <>
                                <div className="grid">

                                    {
                                        items.slice(0, 5).map((item, id) => (
                                            <InventoryCard
                                                key={id}
                                                item={item}
                                                isProduct={activeTab == 'products'}
                                                handleDelete={handleDelete}
                                                handleFeature={onFeature}
                                            />
                                        ))
                                    }
                                </div>

                                <NavLink className='btn filled view-all' to={`/admin/inventory/${activeTab}`}>
                                    View all {activeTab}
                                </NavLink>

                            </>
                            :
                            (
                                <p className="empty-inventory">
                                    No items found.
                                </p>
                            )

                    }

                </div>

            </div>

        </section>
        </>
    )
}

export default Inventory
