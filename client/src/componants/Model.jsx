import { tabsText, titleCase } from "../Utility.js"
import { useState } from "react"

function Model(props) {

    const isInCart = props.cartItems.some(
        id => id === props.product.id
    )

    const [selectedImgIdx, setSelectedImgIdx] = useState(0)

    return (

        <div className="modal" onClick={(e) => e.stopPropagation()}>

            <button className="x" onClick={props.onClose}>×</button>

            <div className="tag">{props.product.gender} · {props.product.category}</div>

            <div className="model-img">

                <img src={props.product.images[selectedImgIdx].image_url} alt={props.product.name} className='open-img cover preview' />

                {props.product.images.length > 1 &&

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

                {/* <h2>{titleCase(props.product.name)}</h2>
                <p style={{ marginTop: 8, fontSize: ".92rem" }}>{props.product.description}</p> */}

                {/* <table className="info"><tbody>
                    <tr><td>Gold purity</td><td>{props.product.gold_purity} ({props.product.gold_purity === "22K" ? "916" : "875"})</td></tr>
                    <tr><td>Approx. weight</td><td>{props.product.weight_grams} g</td></tr>
                    <tr><td>Price</td><td>On request (by live rate) {props.product.price}</td></tr>
                </tbody></table> */}

                <h2>{props.product.name}</h2>
                <p className="desc">{props.product.description}</p>
                <h3 className="price" >Price: {props.product.price}</h3>
                <h2>Metal Details</h2>

                {props.product.metals.map(metal => {

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
                })}


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
                    <a className="btn whatsapp">Ask on WhatsApp</a>
                </div>

            </div>
        </div>
    )
}

export default Model