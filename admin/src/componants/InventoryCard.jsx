

export default function InventoryCard({ item, isProduct, handleDelete, handleFeature, inFeature= false}) {


    return (
        <>
            <div>
                <div className="card">

                    <img src={item.image_url} className='cover' />

                    <div className="data">
                        <h3
                            className={isProduct ? '' : 'bar-name'}
                        >{item.name}</h3>

                        <div className="meta">Code: {item.code}</div>

                        {isProduct ?
                            <>
                                <p className="meta">
                                    {item.audience} · {item.category}
                                </p>
                                <p className="meta">
                                    {item.metals}
                                </p>
                            </>
                            :
                            <>
                                <p className="meta">
                                    {item.metal} . {item.weight} {item.unit}
                                </p>
                                <p className="meta">
                                    {item.brand}
                                </p>
                            </>
                        }

                    </div>

                    <button className="product-action featured"
                        onClick={() => handleFeature(item.id, item.isFeatured, isProduct)}
                    >
                        {item.isFeatured ? 'Unmark Featured' : 'Mark Featured'}
                    </button>
                    {!inFeature && <button className="product-action delete" onClick={() => handleDelete(item.id, isProduct)}>Delete</button>}


                </div>
                <p className='time'>{item.time}</p>
            </div>
        </>
    )
}