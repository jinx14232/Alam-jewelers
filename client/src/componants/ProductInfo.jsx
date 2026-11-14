import { useOutletContext } from 'react-router-dom'

export default function ProductInfo({ product }) {

    const {
        addItemInCart,
        removeItemInCart,
        cartItems
    } = useOutletContext()

    const isInCart = cartItems.some(
        item => item.id === product.id
    )

    const whatsappNumber = "923135452115"
    const handleWhatsAppCheckout = () => {
        console.log('sending')
        const productUrl = `${window.location.origin}/product/${product.id}`;
        const message = `
                Assalam-o-Alaikum!      
                I would like to inquire about the following products:
                ${product.name}
                ${productUrl}
                Please share the details. Thank you!
            `

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')

    };

    return (
        <div className="product-info">

            <div className="product-meta">
                <span>{product.category} .</span>
                <span>{product.gender}</span>
            </div>

            <div className="product-heading">
                <h1>{product.name}</h1>

                <h2>
                    Rs. {Number(product.price).toLocaleString('en-PK')}
                </h2>
            </div>

            <div className="product-description">
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>

            {product.metals?.length > 0 && (
                <div className="metal-details">
                    <h2>Metal Details</h2>
                    <div className="spec-container">
                        {product.metals.map((detail, idx) => (
                            <table className="info" key={idx}>
                                <thead>
                                    <tr>
                                        <th colSpan="1" rowSpan="1">{detail.name}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {detail.details.map((detail, id) => (
                                        <tr key={id}>
                                            <td>{detail.field == '' ? 'NAN' : detail.field}</td>
                                            <td>{detail.value == '' ? 'NAN' : detail.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))
                        }
                    </div>

                </div>
            )}

            <div className="product-actions">

                <div className="buttons">
                    <button
                        className="action-btn add-cart"
                        onClick={
                            () => {
                                isInCart ?
                                    removeItemInCart(product.id) :
                                    addItemInCart(product)
                            }
                        }
                    >
                        {
                            isInCart ?
                                'Remove from cart' :
                                'Add to cart'
                        }
                    </button>

                    <button
                        className="action-btn whatsapp"
                        onClick={handleWhatsAppCheckout}
                    >
                        Ask On Whatsapp
                    </button>
                </div>

                <p>
                    Interested in this piece? Contact us on WhatsApp
                    for further details.
                </p>

            </div>

        </div>
    );
}
