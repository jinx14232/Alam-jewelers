import { useState } from "react"

function Model(props) {

    const isInCart = props.cartItems.some(
        id => id === props.product.id
    )

    const [selectedImgIdx, setSelectedImgIdx] = useState(0)

    const whatsappNumber = "923333867934";
    const handleWhatsAppCheckout = () => {
        console.log('sending')
        const productUrl = `${window.location.origin}/collection`;
        const message = `
Assalam-o-Alaikum!

I would like to inquire about the following products:

${props.product.name}
${productUrl}

Please share the details. Thank you!
    `;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
    };

    return (

        <div className="modal" onClick={(e) => e.stopPropagation()}>

            <button className="x" onClick={props.onClose}>×</button>

            <div className="tag">{props.product.gender ? props.product.gender + ' · ' + props.product.category : props.product.metal} </div>

            <div className="model-img">

                <img src={props.product.images ? props.product.images[selectedImgIdx].image_url : props.product.image_url} alt={props.product.name} className='open-img cover preview' />

                {props.product.images?.length > 1 &&

                    <div className="more-img">

                        <p>Take a deeper look!</p>
                        <div className="images">

                            {props.product.images.map((image, index) => (
                                <img
                                    key={image.id}
                                    src={image.image_url}
                                    onClick={() => setSelectedImgIdx(index)}
                                    className={"cover more " +
                                        (selectedImgIdx === index ? 'dark' : ' ')
                                    }

                                />
                            ))}


                        </div>
                    </div>
                }

            </div>

            <div className="model-body">

                <h2 className={props.product.metal ? 'bar-name' : ''}>{props.product.name}</h2>
                {props.product.description &&
                    <p className="desc">{props.product.description}</p>
                }
                <h3 className="price" >Price: {props.product.price} -/Rs</h3>
                <h2>{props.product.gender ? "Metal" : "Bar"} Details</h2>

                {props.product.metals ? props.product.metals.map(metal => {

                    return (
                        <table className="info" key={metal.id}>
                            <thead>
                                <tr>
                                    <th colSpan="1" rowSpan="1">{metal.name}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {metal.details?.map((detail, id) => (
                                    <tr key={id}>
                                        <td>{detail.field == '' ? 'NAN' : detail.field}</td>
                                        <td>{detail.value == '' ? 'NAN' : detail.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }) :

                    <table className="info">

                        <tbody>

                            {props.product.metal == 'gold' &&
                                <tr>
                                    <td>Purity: </td>
                                    <td>{props.product.karat}K</td>
                                </tr>
                            }
                            <tr>
                                <td>Weight: </td>
                                <td>{props.product.weight} {props.product.weight_unit}</td>
                            </tr>
                            <tr>
                                <td>Fineness: </td>
                                <td>{props.product.fineness}</td>
                            </tr>
                            <tr>
                                <td>Brand: </td>
                                <td>{props.product.brand}</td>
                            </tr>

                        </tbody>

                    </table>

                }


                <div className="row">
                    <button className="btn" onClick={
                        () => {
                            isInCart ?
                                props.removeItem(props.product.id) :
                                props.onAddItem(props.product)
                        }
                    }>
                        {
                            isInCart ?
                                'Remove from cart' :
                                'Add to cart'
                        }
                    </button>
                    <button className="btn whatsapp" onClick={handleWhatsAppCheckout}>
                        Ask on WhatsApp
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Model