
import InventoryCard from './InventoryCard'
import Loader from './Loader'

export default function Featured({ products, bars, onFeature }) {

    return (
        <section className="add-form">

            <div className="form-section">
                <h2>Featured Products</h2>

                <div className="inventory">

                    {products.length > 0 ?
                        <div className="featured-grid">


                            <>
                                {
                                    products.map((item, id) => (
                                        <InventoryCard
                                            key={id}
                                            item={item}
                                            isProduct={true}
                                            handleDelete={null}
                                            handleFeature={onFeature}
                                            inFeature={true}
                                        />
                                    ))
                                }{
                                    bars.map((item, id) => (
                                        <InventoryCard
                                            key={id}
                                            item={item}
                                            isProduct={false}
                                            handleDelete={null}
                                            handleFeature={onFeature}
                                            inFeature={true}
                                        />
                                    ))
                                }
                            </>


                        </div>
                        : (
                            <p className="empty-inventory">
                                No items found.
                            </p>
                        )
                    }



                </div>

            </div>

        </section>
    )
}