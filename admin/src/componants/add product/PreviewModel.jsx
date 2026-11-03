
export default function ({ basicInfo, metalInfo, previewImages, selectedMetal }) {
    return (
        <>
            <div className="modal">

                <button className="x">×</button>

                <div className="tag">{basicInfo.gender}</div>

                <div className="model-img">

                    <img src={previewImages[0]} alt={basicInfo.name} className='open-img cover preview' />

                    {previewImages.length > 1 &&

                        <div className="more-img">

                            <p>Take a deeper look!</p>
                            <div className="images">

                                {previewImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        className={"cover more " +
                                            (index === 0 ? 'dark' : ' ')
                                        }

                                    />
                                ))}

                            </div>
                        </div>
                    }

                </div>

                <div className="model-body">

                    <h2>{basicInfo.name}</h2>
                    <p className="desc">{basicInfo.description}</p>
                    <h3 className="price" >Price: {basicInfo.price} -/Rs</h3>
                    <h2>Metal Details</h2>
                    {selectedMetal.map(metal => {
                        const info = metalInfo.find(
                            item => item.metal_id === metal.id
                        );

                        return (
                            <table className="info" key={metal.id}>
                                <thead>
                                    <tr>
                                        <th colSpan="1" rowSpan="1">{metal.name}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {info?.details.map((detail, id) => (
                                        <tr key={id}>
                                            <td>{detail.field == ''? 'NAN': detail.field}</td>
                                            <td>{detail.value == ''? 'NAN': detail.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    })}

                    <div className="row">
                        <button className="btn">
                            Add to cart
                        </button>
                        <a className="btn whatsapp">Ask on WhatsApp</a>
                    </div>

                </div>
            </div>
        </>
    )
}