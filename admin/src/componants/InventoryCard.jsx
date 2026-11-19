export default function InventoryCard({item, activeTab, handleDelete}) {
    return (
        <>
            <div>
                <div className="card">

                    <img src={item.image_url} className='cover' />

                    <div className="data">
                        <h3
                            className={activeTab === 'bars' ? 'bar-name' : ''}
                        >{item.name}</h3>

                        <div className="meta">Code: {item.code}</div>

                        {activeTab === 'products' ?
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

                    <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>

                </div>
                <p className='time'>{item.time}</p>
            </div>
        </>
    )
}