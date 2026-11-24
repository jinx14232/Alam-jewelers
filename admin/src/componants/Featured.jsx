
import InventoryCard from './InventoryCard'

export default function Featured({ products}) {

    return (
        <>
            <section className="add-form">

                <div className="form-section">
                    <h2>Featured Products</h2>

                    <div className="inventory">
                        {products.length > 0 ?
                            <>
                                <div className="featured-grid">

                                    {
                                        products.map((item, id) => (
                                            <InventoryCard
                                                key={id}
                                                item={item}
                                                isFeatured={true}
                                                activeTab={'products'}
                                                handleDelete={() => { }}
                                                handleFeature={() => { }}
                                            />
                                        ))
                                    }
                                </div>
                            </>
                            : (
                                <p className="empty-inventory">
                                    No items found.
                                </p>
                            )}
                    </div>

                </div>

            </section>
        </>
    )
}